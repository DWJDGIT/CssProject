var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var cw = canvas.width = 30;
var ch = canvas.height = 30;
var cx = cw / 2;
var cy = ch / 2;
var _mx = cx;
var _my = cy;

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var Point = function(x, y, ang, cr){
    this.x = x;
    this.y = y;
    this.ang = ang;
    this.cr = cr;
    this.v = Math.random()*20+10;
    Point.list.push(this);
}
Point.list = [];

for(let i=0; i<800; i++){
    let ang = Math.random() * 2 * Math.PI;
    let r = 30 + Math.random() * 100;
    _mx = cx + 150*Math.cos(2*Math.PI*i/800);
    _my = cy + 150*Math.sin(2*Math.PI*i/800);
    new Point(_mx, _my, ang, r);
}

var lastFrameTime = Date.now();
var st = lastFrameTime;
requestAnimationFrame(function draw(){
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,.1)";
    ctx.fillRect(0, 0, cw, ch);
    ctx.restore();
    if(Date.now()-lastFrameTime < 16){
        requestAnimationFrame(draw);
        return;
    }
/********************************************/
    Point.list.forEach(function(self, index){
        ctx.beginPath();
        ctx.fillRect(self.x+self.cr*Math.cos(self.ang), self.y+self.cr*Math.sin(self.ang), 2, 2);
        ctx.fill();
        if(self.cr >= 1)
            self.cr -= self.cr / self.v;
        else
            self.cr -= 0.8;
        if(self.cr <= 1){
            self.x = _mx;
            self.y = _my;
            self.ang = Math.random() * 2 * Math.PI;
            self.cr = 30 + Math.random() * 100;
            self.v = Math.floor(Math.random()*20+10);
        }     
    });
    _mx = cx + 150*Math.cos(2*Math.PI*(Date.now()-st)/1500);
    _my = cy + 150*Math.sin(2*Math.PI*(Date.now()-st)/1500);
/********************************************/
    lastFrameTime = Date.now();
    requestAnimationFrame(draw);
})

document.onmousemove = function(e){
    //_mx = e.pageX;
    //_my = e.pageY;
}