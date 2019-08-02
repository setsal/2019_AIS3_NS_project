// Author: setsal Lan
// Github: https://github.com/setsal

const blocklist = [ '你好' ]
const templateHtml = '<div><h1 style="padding: 30px; text-align: center;">好像是1偏激的圖片 你確定要打開他嗎？</h1></div>'

const contentFromPosts = document.querySelector('#contentArea')
const contentFromPages = document.querySelector('#pagelet_timeline_main_column')
const content = contentFromPosts || contentFromPages

function processStatus(response) {
    // 狀態 "0" 是處理本地檔案 (例如Cordova/Phonegap等等)
    if (response.status === 200 || response.status === 0) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}


function removeElems () {
  const articles = content.querySelectorAll(`div[id][role="article"]`)

  function hasSensitiveWordInBlocklist (article) {
    return blocklist.some((sensitiveWord) => article.innerHTML.includes(sensitiveWord))
  }

  articles.forEach(function (article) {
    try { 
        var imageUrl = article.getElementsByClassName("scaledImageFitWidth img")[0].src
        // $.ajax({
        //     url: 'http://localhost:5000/upload-check',
        //     type: 'POST',
        //     success: function(data) { console.log(data); },
        //     contentType: "application/json",
        //     dataType: 'json'
        //   })
          console.log(imageUrl);
    }
    catch(err) { 
        
    }
    // if (hasSensitiveWordInBlocklist(article)) {
    //   article.innerHTML = templateHtml
    // }
  })
}

content.addEventListener('DOMContentLoaded', function (event) {
  removeElems()
})

content.addEventListener('DOMNodeInserted', function (event) {
//   removeElems()
})

content.addEventListener('DOMSubtreeModified', function (event) {
//   removeElems()
})