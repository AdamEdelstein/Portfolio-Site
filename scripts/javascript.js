//This code changes the color of the active section in the NavBar
$('#navbar li').click(function() {
    $(this).addClass('active').siblings('li').removeClass('active');
});


//This is the code to hide and show the Navigation bar on scroll
(function() {
    var documentElem = $(document),
        nav = $('#navbar'),
        lastScrollTop = 0;

    documentElem.on('scroll', function() {
        var currentScrollTop = $(this).scrollTop();

        //scroll down
        if ( currentScrollTop > lastScrollTop ) nav.addClass('hidden');
        //scroll up
        else nav.removeClass('hidden');

        lastScrollTop = currentScrollTop;
    });
})();

//Background Interactive Stuff

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = window.innerWidth;
var height = window.innerHeight;
var dots = [];
var mousePos = {x: -20, y: -20};
var colors = ['#4682B4', '#B0DBFF', '#63B8FF', '#586D7F', '#4F93CC']


function Dot(x, y, color) {
  var _this = this;
  this.x = x;
  this.y = y;
  this.targetRadius = 3;
  this.radius = 3;
  this.color = color;
  
  this.draw = function() {
    var d = d2points(_this, mousePos);
    if (d < 100) _this.targetRadius = 3 + (100-d)/7;
    else _this.targetRadius = 3;
    _this.radius = _this.radius + (_this.targetRadius - _this.radius)*0.1;
    ctx.beginPath();
    ctx.arc(_this.x, _this.y, _this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = _this.color;
    ctx.fill();
  }
}

// You can change the number of dots that appear by changing the values in this
function placeDots() {
  dots = [];
  var ci = 0;
  for (var x = 14; x < width; x = x + 30) {
    for (var y = 14; y < height; y = y + 30) {
      var d = new Dot(x, y, colors[ci%colors.length]);
      dots.push(d);
      ci++;
    }
  }
}

function drawDots() {
  for (var i = 0; i < dots.length; i++) {
    dots[i].draw();
  }
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  placeDots();
}

function addListeners() {
  canvas.addEventListener('mousemove', mousemove);
  canvas.addEventListener('touchstart', touchmove);
  canvas.addEventListener('touchmove', touchmove);
  window.addEventListener('resize', resize);
  window.addEventListener('touchmove', function(e) {
                          e.preventDefault();
                          })
}

function mousemove(e) {
  mousePos.x = e.pageX;
  mousePos.y = e.pageY;
}

function touchmove(e) {
  	mousePos.y = e.targetTouches[0].pageY;
  	mousePos.x = e.targetTouches[0].pageX;
}

function loop() {
  ctx.clearRect(0,0,width,height);
  drawDots();
  requestAnimationFrame(loop);
}

function d2points(p1, p2)
{
  var xs = p2.x - p1.x;
  var xs = xs * xs;
  var ys = p2.y - p1.y;
  ys = ys * ys;
  return Math.sqrt( xs + ys );
}

resize();
// Take off Comment to turn back on
//addListeners();
loop();

// Starting of gallery scriptages
$("#projects").justifiedGallery({
    rowHeight : 70,
    lastRow : 'nojustify',
    margins : 3
});
