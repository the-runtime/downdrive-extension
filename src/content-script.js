import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
// import SelectionToDocxConverter from "./lib/selectionToDoc.js";
// import docx from 'docx'
// import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from 'docx';
// import  { Paragraph, Table, TableCell, TableRow, TextRun, AlignmentType, HeadingLevel, UnorderedList, ListItem } from 'docx';
import HTMLtoDOCX from "html-to-docx";



// //Fix color render proccess of html2canvas
// function injectGlobalCss() {
//   const style = document.createElement('style');
//   style.textContent = `
//     * {
//       color: black !important;
//       background-color: white !important;
//     }
//   `;
//   document.head.appendChild(style);
// }

// // Call this function in your content script
// injectGlobalCss();


// might not need this after this being moved to backgroung page
async function convertImagesToDataUrls(element) {
  console.log("Image conversion started");
  const images = element.querySelectorAll('img');
  for (const img of images) {
    if (!img.src.startsWith('data:')) {
      try {
        const response = await fetch(img.src);
        const blob = await response.blob();

        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
        img.src = base64;
        // console.log(base64);
      } catch (e) {
        img.src = ""
        console.warn('Failed to convert image:', img.src, e);
      }
    }
  }
}

function sanitizeStyleSheets() {
  for (const sheet of document.styleSheets) {
    try {
      const rules = sheet.cssRules || sheet.rules;
      for (const rule of rules) {
        if (rule.style) {
          for (const prop of rule.style) {
            const value = rule.style.getPropertyValue(prop);
            if (
              value.includes('color(') ||
              value.includes('oklch(') ||
              value.includes('oklab(') ||
              value.includes('lab(') ||
              value.includes('lch(')
            ) {
              rule.style.setProperty(prop, 'initial', 'important');
            }
          }
        }
      }
    } catch (e) {
      // Ignore CORS protected stylesheets
      continue;
    }
  }
}

function sanitizeInlineStyle(element) {
  if (!element.style) return;

  for (const prop of element.style) {
    const value = element.style.getPropertyValue(prop);

    if (
      value.includes('color(') ||
      value.includes('oklch(') ||
      value.includes('oklab(') ||
      value.includes('lab(') ||
      value.includes('lch(')
    ) {
      element.style.setProperty(prop, 'initial', 'important');
    }
  }
}

async function sanitizeStyles(element) {
  const computed = window.getComputedStyle(element);

  for (const prop of computed) {
    const value = computed.getPropertyValue(prop);

    if (
      value.includes('color(') ||
      value.includes('oklch(') ||
      value.includes('oklab(') ||
      value.includes('lab(') ||
      value.includes('lch(')
    ) {
      element.style.setProperty(prop, 'initial', 'important');
    }
  }

  for (const child of element.children) {
    sanitizeInlineStyle(child);
    await sanitizeStyles(child);  // await recursive call
  }
}

//  Save as pdf option
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'savePageAsPdf') {
    console.log("Printing process started");

    const content = document.body;
    sanitizeStyleSheets()
    await convertImagesToDataUrls(content);
    await sanitizeStyles(content);
    const canvas = await html2canvas(content, {
      scale: 3,
      imageTimeout: 15000, // Increase timeout for images
      ignoreElements: (element) => {
        if (element.tagName === 'IMG') {
          // Optionally ignore images with invalid or no src
          if (!element.complete || element.naturalWidth === 0) {
            return true; // Ignore this image element
          }
        }
        return false;
       },
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      letterRendering: true,
      imageTimeout: 0,
      scrollY: -window.scrollY,
      scrollX: -window.scrollX
      
    });
    console.log("got the cnavs ")
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = 297;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const pdfBlob = pdf.output('blob');
    const buffer = await pdfBlob.arrayBuffer();
    const array = Array.from(new Uint8Array(buffer));

    chrome.runtime.sendMessage({ action: 'PDF_DATA', data: array, name: "pdf.pdf" });

    sendResponse({ success: true });
    return true; // Keep message channel open for async sendResponse
  }
});


//SelectionToDocx

// content-script.js

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "saveSelectionToCloud") {
    try {
      const converter = new SelectionToDocxConverter();
      await converter.downloadSelection(message.filename || "selection.docx");
      sendResponse({ success: true, message: "Document saved successfully" });
    } catch (error) {
      console.error("Error:", error);
      sendResponse({ success: false, message: error.message });
    }
    return true;
  }
});


// Save page as docx
// content.js - Revised to communicate with background.js for image fetching

// Listen for a request from popup.js
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'savePageAsDocx') {
        // const htmlSelector = 'body';
        // const contentElement = document.querySelector(htmlSelector);
        // if (!contentElement) {
        //     sendResponse({ html: null, title: 'Error' });
        //     return;
        // }


        // // Convert images url to data url
        // await convertImagesToDataUrls(contentElement);
        // // 1. CLONE THE ELEMENT and collect image URLs
        // const tempElement = contentElement.cloneNode(true);
        // const images = tempElement.querySelectorAll('img');
        // const remoteImageUrls = [];
        // const imageElements = [];

        // // // Collect all remote URLs that need conversion
        // // for (const img of images) {
        // //     // Only process if a source exists and is not already a Data URL
        // //     if (img.src && !img.src.startsWith('data:')) {
        // //         remoteImageUrls.push(img.src);
        // //         imageElements.push(img);
        // //     }
        // // }
        
        // // // 2. Send URLs to Background Script for Base64 conversion
        // // let base64Map = {};
        // // if (remoteImageUrls.length > 0) {
        // //     base64Map = await new Promise(resolve => {
        // //         chrome.runtime.sendMessage({ action: 'process_images', imageUrls: remoteImageUrls }, resolve);
        // //     });
        // // }
        

        // // // 3. APPLY Base64 URLs to the cloned HTML structure
        // // for (const img of imageElements) {
        // //     const base64 = base64Map[img.src];
        // //     // console.log('base64', base64);
        // //     if (base64) {
        // //         img.src = base64;
        // //     } else {
        // //         img.remove(); // Remove images that failed to convert
        // //     }
        // // }

        // // 4. PERFORM DOCX CONVERSION (assuming HTMLtoDOCX is loaded)
        
        // const htmlString = tempElement.innerHTML;
        // const pageTitle = document.title || 'Webpage_Export';
        // const sanitizedTitle = pageTitle.replace(/[^a-z0-9\s-]/gi, '_').substring(0, 100);

        // const documentOptions = {
        //     orientation: 'portrait',
        //     margins: { top: 1440, right: 1800, bottom: 1440, left: 1800 },
        //     font: 'Times New Roman',
        //     fontSize: 22 
        // };

        // Test code 


        const contentElement = document.querySelector('.md-content') || document.body;
        const tempElement = contentElement.cloneNode(true);

        await sanitizeForDocx(tempElement);

        const htmlString = tempElement.innerHTML;
        const pageTitle = document.title || 'Webpage_Export';
        const sanitizedTitle = pageTitle.replace(/[^a-z0-9\s-]/gi, '_').substring(0, 100);

        const documentOptions = {
          orientation: 'portrait',
          margins: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          font: 'Times New Roman',
          fontSize: 24,
        };
        
        await convertImagesToDataUrls(tempElement);


        const docxArrayBuffer = await HTMLtoDOCX(htmlString, null, documentOptions);

        const docxBlob = new Blob([docxArrayBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });



        // test code end here


        // Donwload the file
        const url = URL.createObjectURL(docxBlob);

  // Create a temporary <a> element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'download.docx';

        // Append the link to the body (required for Firefox)
        document.body.appendChild(a);

        // Trigger a click on the link to start download
        a.click();

        // Clean up - remove the element and revoke object URL
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Send the resulting Blob and title back to the original caller (popup.js)
        // NOTE: Blobs cannot be sent directly; you might need to convert it back to ArrayBuffer 
        // or handle the upload directly from the background script.
        // For simplicity, we send the required data for the caller to handle the Blob conversion/upload.

        // Send ArrayBuffer (which can be messaged) back for the final upload steps
        // sendResponse({ 
        //     docxBuffer: docxArrayBuffer, 
        //     title: sanitizedTitle 
        // });
        // chrome.runtime.sendMessage({ action: 'DOCX_DATA', data: docxArrayBuffer, name: sanitizedTitle });
        
    return true; // Keep the message channel open for the async response
  }
});



// Santize the html 
async function sanitizeForDocx(element) {
  const invalidXmlCharPattern = /[@]/; // Regex to match invalid XML chars (adjust if needed)

  // 1. Remove unwanted tags
  element.querySelectorAll('nav, footer, script, style, .sponsor, .sidebar, .ads').forEach(el => el.remove());

  // 2. Strip all inline event handlers (on*, e.g., onclick)
  element.querySelectorAll('*').forEach(el => {
    Array.from(el.attributes).forEach(attr => {
      if (attr.name.startsWith('on')) el.removeAttribute(attr.name);
    });
  });

  // 3. Remove attributes with invalid XML characters from all elements (especially tables)
  element.querySelectorAll('*').forEach(el => {
    Array.from(el.attributes).forEach(attr => {
      if (invalidXmlCharPattern.test(attr.name) || invalidXmlCharPattern.test(attr.value)) {
        el.removeAttribute(attr.name);
      }
    });
  });

  // 4. Remove style attributes containing CSS variables or @media which are invalid inside XML attributes
  element.querySelectorAll('[style]').forEach(el => {
    const styleValue = el.getAttribute('style');
    if (styleValue && (styleValue.includes('@') || styleValue.includes('--'))) {
      el.removeAttribute('style');
    }
  });

  // 5. Sanitize table related attributes and inline styles (width, min-width, max-width) removing invalid chars
  element.querySelectorAll('table, tr, td, th').forEach(el => {
    ['width', 'min-width', 'max-width'].forEach(attrName => {
      const val = el.style.getPropertyValue(attrName);
      if (val && invalidXmlCharPattern.test(val)) {
        el.style.removeProperty(attrName);
      }
    });

    // Also check these attributes on the element itself
    ['width', 'minWidth', 'maxWidth'].forEach(attrName => {
      const attrVal = el.getAttribute(attrName);
      if (attrVal && invalidXmlCharPattern.test(attrVal)) {
        el.removeAttribute(attrName);
      }
    });
  });

  // 6. Optional: Remove empty nodes that could cause problems
  element.querySelectorAll('*').forEach(el => {
    if (!el.textContent.trim() && el.children.length === 0 && !['img', 'br', 'hr'].includes(el.tagName.toLowerCase())) {
      el.remove();
    }
  });

  // 7. Embed images as data URLs (your existing async function)
  await convertImagesToDataUrls(element);

  // 8. Format code blocks and headings for readability
  element.querySelectorAll('pre').forEach(pre => {
    pre.style.background = '#f5f5f5';
    pre.style.fontFamily = 'Consolas, monospace';
    pre.style.padding = '6px';
    pre.style.border = '1px solid #ddd';
    pre.style.borderRadius = '3px';
    pre.style.overflowX = 'auto';
  });

  element.querySelectorAll('h1').forEach(h => h.style.fontSize = '2em');
  element.querySelectorAll('h2').forEach(h => h.style.fontSize = '1.5em');
}
