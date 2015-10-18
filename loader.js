var targets = ['addImage.js'];

for (var i = 0; i < targets.length; i++) {
  var script = document.createElement('script');
  script.setAttribute('src', chrome.extension.getURL(targets[i]));
  document.body.appendChild(script);
}