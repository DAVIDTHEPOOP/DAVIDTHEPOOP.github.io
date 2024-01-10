var image = document.getElementById("toothlessimg");
var audio = document.getElementById("toothlessaudio");
image.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
        audio.currentTime = 0;
    }
});

var anchors = document.querySelectorAll('a[data-href]');

/*
for (var i=0; i<anchors.length; ++i) {
  var anchor = anchors[i];
  var href = anchor.getAttribute('data-href');
  anchor.addEventListener('click', function() {
    window.location = href;
  });
}
*/

var anchors = document.querySelectorAll('a[data-href]');

for (var i=0; i<anchors.length; ++i) {
  var anchor = anchors[i];
  var href = anchor.getAttribute('data-href');
  anchor.addEventListener('click', function(event) {
    event.preventDefault();
    window.open(href, '_blank');
  });
}