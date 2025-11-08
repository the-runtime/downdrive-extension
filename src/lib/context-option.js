chrome.runtime.onStartup.addListener(() => {
    chrome.contextMenus.create( {
        id: "Save to cloud",
        title: "Save file to cloud",
        enabled : true,
        contexts: ["text","link"]
    })
})

// chrome.runtime.onInstalled.addListener(( => {
//     chrome.contextMenus.create({
//         id
//     })
// }))