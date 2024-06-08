function setupCanvas(){
   Canvas.height =window.innerHeight;
   canvas.width =window.innerWidth;
}

setupCanvas();

window.onresize=setupCanvas;

const pointer ={
   x:window.innerWidth/2,
   y:window.innerHeight/2
}

function updatePointerPosition(e){
   pointer.x =e.clientX;
   pointer.y =e.clienty;
}


window.onclick =updatePointerPosition;
window.onmousemove =updatePointerPosition;


const ctx = canvas.getContext("2d");

const params ={
   spring: 0.6,
   pointCount:50
}

const trail= new Array(params.pointCount);

for(let i=0; i < trail.length; i++){
   trail[i]={
      x:pointer.x,
      y:pointer.y,
      dy:0,
      dx:0
   }
}
function draw(){
    ctx.clearRect(0,0, canvas.width,canvas.height);

    trail.forEach((p,idx) => {
       const prev =idx === 0 ? pointer :trail[idx -1];
       const spring =idx === 0 ? 0.4 *params.spring : params.spring;

     p.dx =(prev.x-p.x) *spring;
     p.dy =(prev.y-p.y) *spring;
 
     p.x += p.dx;
     p.y += p.dy;

     ctx.beginPath();
     ctx.fillStyle =`hsl(${(idx*80) /trail.length-30},100%,50%)`;
     ctx.arc(p.x, p.y, 10 - idx /5,0,math.PI * 2);
     ctx.fill();
     
    });

    requestAnimationFrame(draw);
}

draw();

