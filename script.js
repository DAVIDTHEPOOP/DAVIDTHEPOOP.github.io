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

for (var i=0; i<anchors.length; ++i) {
  var anchor = anchors[i];
  var href = anchor.getAttribute('data-href');
  anchor.addEventListener('click', function(event) {
    event.preventDefault();
    window.open(href, '_blank');
  });
}

function MatrixCursor() {
  var possibleEmoji = ["1", "0"]
  var width = window.innerWidth;
  var height = window.innerHeight;
  var cursor = {x: width/2, y: width/2};
  var particles = [];
  function init() {
    bindEvents();
    loop();
  }

  function bindEvents() {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchstart', onTouchMove);
    window.addEventListener('resize', onWindowResize);
  }
  function onWindowResize(e) {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  function onTouchMove(e) {
    if( e.touches.length > 0 ) {
      for( var i = 0; i < e.touches.length; i++ ) {
        addParticle( e.touches[i].clientX, e.touches[i].clientY, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
      }
    }
  }
  function onMouseMove(e) {    
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    addParticle( cursor.x, cursor.y, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
  }
  function addParticle(x, y, character) {
    var particle = new Particle();
    particle.init(x, y, character);
    particles.push(particle);
  }
  function updateParticles() {
    for( var i = 0; i < particles.length; i++ ) {
      particles[i].update();
    }
    for( var i = particles.length -1; i >= 0; i-- ) {
      if( particles[i].lifeSpan < 0 ) {
        particles[i].die();
        particles.splice(i, 1);
      }
    }
  }
  function loop() {
    requestAnimationFrame(loop);
    updateParticles();
  }

  function Particle() {
  
    this.lifeSpan = 30;
    this.initialStyles ={
      "position": "absolute",
      "display": "block",
      "pointerEvents": "none",
      "z-index": "10000000",
      "fontSize": "64px",
      "will-change": "transform",
      "color": "#0d0",
      "font-family": "mnospace"
    };

    this.init = function(x, y, character) {
    
      this.velocity = {
        x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        y: 2
      };
      this.position = {x: x - 26, y: y - 45};
    
      this.element = document.createElement('span');
      this.element.innerHTML = character;
      applyProperties(this.element, this.initialStyles);
      this.update();
      document.body.appendChild(this.element);
    };
    this.update = function() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.lifeSpan--;
      this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
    }
    this.die = function() {
      this.element.parentNode.removeChild(this.element);
    }
  }

  function applyProperties( target, properties ) {
    for( var key in properties ) {
      target.style[ key ] = properties[ key ];
    }
  }
  init();
}
