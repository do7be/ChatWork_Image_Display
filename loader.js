var targets = ['jquery-1.11.3.min.js', 'addImage.js'];

targets.forEach(function(target){
    var script = document.createElement('script');
    script.setAttribute('src', chrome.extension.getURL(target));
    document.documentElement.appendChild(script);
});