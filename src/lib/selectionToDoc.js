// selectionToDocx.js
// import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun } from "docx";

class SelectionToDocxConverter {
  constructor() {
    this.documentChildren = [];
  }

  getSelectedHtml() {
    const sel = window.getSelection();
    if (sel.rangeCount === 0) return null;

    const container = document.createElement("div");
    for (let i = 0; i < sel.rangeCount; i++) {
      container.appendChild(sel.getRangeAt(i).cloneContents());
    }
    return container;
  }

  parseFontSize(fontSizeStr) {
    const match = fontSizeStr.match(/(\d+\.?\d*)/);
    if (match) {
      const pixels = parseFloat(match[1]);
      return Math.round(pixels * 2);
    }
    return 24;
  }

  /**
   * Convert base64 string to Uint8Array (binary)
   */
  base64ToUint8Array(base64String) {
    try {
      const binaryString = atob(base64String);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    } catch (error) {
      console.error("Error converting base64 to Uint8Array:", error);
      return null;
    }
  }

  /**
   * Convert image src to base64 data URL
   */
  async imageToBase64(imageSrc) {
    try {
      if (imageSrc.startsWith("data:")) {
        return imageSrc;
      }

      const response = await fetch(imageSrc, { mode: "cors" });
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.warn(`Failed to convert image ${imageSrc}:`, error);
      return null;
    }
  }

  /**
   * Process inline elements and extract styled text runs
   */
  async processInlineNode(node) {
    const runs = [];

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (text.trim().length > 0) {
        runs.push(
          new TextRun({
            text: text,
          })
        );
      }
      return runs;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return runs;

    const tagName = node.tagName.toLowerCase();

    switch (tagName) {
      case "strong":
      case "b":
        for (const child of node.childNodes) {
          const childRuns = await this.processInlineNode(child);
          childRuns.forEach(run => {
            if (run instanceof TextRun) {
              run.bold = true;
            }
          });
          runs.push(...childRuns);
        }
        break;

      case "em":
      case "i":
        for (const child of node.childNodes) {
          const childRuns = await this.processInlineNode(child);
          childRuns.forEach(run => {
            if (run instanceof TextRun) {
              run.italics = true;
            }
          });
          runs.push(...childRuns);
        }
        break;

      case "u":
        for (const child of node.childNodes) {
          const childRuns = await this.processInlineNode(child);
          childRuns.forEach(run => {
            if (run instanceof TextRun) {
              run.underline = {};
            }
          });
          runs.push(...childRuns);
        }
        break;

      default:
        for (const child of node.childNodes) {
          runs.push(...(await this.processInlineNode(child)));
        }
    }

    return runs;
  }

  /**
   * Process block-level elements
   */
  async processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text.length > 0) {
        this.documentChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: text,
              }),
            ],
            spacing: { after: 100 },
          })
        );
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const tagName = node.tagName.toLowerCase();
    const computedStyle = window.getComputedStyle(node);
    const fontSize = this.parseFontSize(computedStyle.fontSize);

    switch (tagName) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        const level = parseInt(tagName[1]);
        const headingSize = (24 - (level - 1) * 2) * 2;

        const headingRuns = await this.processInlineNode(node);
        this.documentChildren.push(
          new Paragraph({
            children: headingRuns.length > 0 ? headingRuns : [new TextRun(node.textContent)],
            bold: true,
            size: headingSize,
            spacing: { after: 200, before: 100 },
          })
        );
        break;

      case "p":
      case "div":
        const runs = await this.processInlineNode(node);
        if (runs.length > 0 || node.textContent.trim().length > 0) {
          this.documentChildren.push(
            new Paragraph({
              children: runs.length > 0 ? runs : [new TextRun(node.textContent)],
              size: fontSize,
              spacing: { after: 100 },
            })
          );
        }
        break;

      case "img":
        try {
          const base64DataUrl = await this.imageToBase64(node.src);
          if (base64DataUrl) {
            // Parse the data URL: data:image/png;base64,ACTUALBASE64DATA
            const matches = base64DataUrl.match(/^data:image\/([a-z]+);base64,(.+)$/i);
            if (matches) {
              const imageType = matches[1].toLowerCase(); // png, jpeg, gif, etc.
              const base64String = matches[2]; // Just the base64 data

              // Convert base64 string to Uint8Array (binary)
              const binaryData = this.base64ToUint8Array(base64String);

              if (binaryData) {
                const imageRun = new ImageRun({
                  data: binaryData, // Pass Uint8Array, not base64 string
                  transformation: {
                    width: 200,
                    height: 150,
                  },
                  type: imageType,
                });

                this.documentChildren.push(
                  new Paragraph({
                    children: [imageRun],
                    spacing: { after: 100 },
                  })
                );

                console.log(`Image added successfully (${imageType})`);
              }
            }
          }
        } catch (error) {
          console.warn("Failed to embed image:", error);
          // Fallback: add text placeholder
          this.documentChildren.push(
            new Paragraph({
              text: `[Image: ${node.alt || "Image"}]`,
              italics: true,
              spacing: { after: 100 },
            })
          );
        }
        break;

      case "ul":
        const listItems = node.querySelectorAll(":scope > li");
        listItems.forEach((li) => {
          this.documentChildren.push(
            new Paragraph({
              text: li.textContent,
              bullet: { level: 0 },
              spacing: { after: 50 },
            })
          );
        });
        break;

      case "ol":
        const orderedItems = node.querySelectorAll(":scope > li");
        orderedItems.forEach((li, index) => {
          this.documentChildren.push(
            new Paragraph({
              text: li.textContent,
              numbering: { num: 0, level: 0 },
              spacing: { after: 50 },
            })
          );
        });
        break;

      case "table":
        const tableRows = [];
        const rows = node.querySelectorAll("tr");
        rows.forEach((row, rowIndex) => {
          const cells = [];
          row.querySelectorAll("td, th").forEach((td) => {
            cells.push(
              new TableCell({
                children: [
                  new Paragraph({
                    text: td.textContent.trim(),
                    bold: rowIndex === 0,
                  }),
                ],
                shading: rowIndex === 0 ? { fill: "D3D3D3" } : undefined,
              })
            );
          });
          tableRows.push(new TableRow({ children: cells }));
        });
        this.documentChildren.push(
          new Table({
            rows: tableRows,
            width: { size: 100, type: "percentage" },
          })
        );
        break;

      case "br":
        this.documentChildren.push(new Paragraph({}));
        break;

      default:
        for (const child of node.childNodes) {
          await this.processNode(child);
        }
    }
  }

  /**
   * Convert selection to DOCX document and return blob
   */
  async convertSelectionToDocx() {
    this.documentChildren = [];

    const selectionContainer = this.getSelectedHtml();
    if (!selectionContainer) {
      throw new Error("No text selected");
    }

    for (const child of selectionContainer.childNodes) {
      await this.processNode(child);
    }

    if (this.documentChildren.length === 0) {
      this.documentChildren.push(new Paragraph("No content selected"));
    }

    const doc = new Document({
      sections: [
        {
          children: this.documentChildren,
        },
      ],
    });

    return await Packer.toBlob(doc);
  }

  /**
   * Download DOCX file
   */
  async downloadSelection(filename = "selection.docx") {
    const blob = await this.convertSelectionToDocx();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export default SelectionToDocxConverter;
