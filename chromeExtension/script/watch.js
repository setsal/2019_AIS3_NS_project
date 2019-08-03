// Author: setsal Lan
// Github: https://github.com/setsal

const blocklist = [ '你好' ]
const templateHtml = '<div><h1 style="padding: 30px; text-align: center;">好像是偏激的圖片 你確定要打開他嗎？</h1></div>'

const contentFromPosts = document.querySelector('#contentArea')
const contentFromPages = document.querySelector('#pagelet_timeline_main_column')
const content = contentFromPosts || contentFromPages


function removeElems () {
  const articles = content.querySelectorAll(`div[id][role="article"]`)

  function hasSensitiveWordInBlocklist (article) {
    return blocklist.some((sensitiveWord) => article.innerHTML.includes(sensitiveWord))
  }

  articles.forEach(function (article) {
    try { 
        var imageUrl = article.getElementsByClassName("scaledImageFitWidth img")[0].src

        $.ajax({
            url: 'http://localhost:5000/upload-check',
            // data:JSON.stringify({"url": imageUrl}),
            data:{ url: imageUrl},
            type: 'POST',
            cache: false,
            success: function(data) { 
              if ( data == "yes" ) {
                article.innerHTML = templateHtml
              }
              console.log(data); 
            },
            error: function (xhr, textStatus, thrownError) {
              console.log(textStatus);
            }
          })
    }
    catch(err) { 
        
    }
    // if (hasSensitiveWordInBlocklist(article)) {
    //   article.innerHTML = templateHtml
    // }
  })
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    if(request.cmd == 'test') removeElems();
    sendResponse('ok');
});
