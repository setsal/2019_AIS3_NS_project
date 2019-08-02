// Author: setsal Lan
// Github: https://github.com/setsal

function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}


function block() {
    sendMessageToContentScript({cmd:'test'}, function(response)
    {
        //success
    });
}
  
  document.getElementById('clickme').addEventListener('click', block);