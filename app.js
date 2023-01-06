let color = document.querySelector('#color');
let erase = document.querySelector('#erase');
let decrease = document.querySelector('#decrease'); 
let increase = document.querySelector('#increase') ;
let sizeEl = document.querySelector('#size') ;
let pen = document.querySelector('#pen');
let square = document.querySelector('#square');
let circle = document.querySelector('#circle');
let save = document.querySelector('#save') ;
let clear = document.querySelector('#clear'); 
let canvas= document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let radius = 1;
let r1 = 0 ;
let r2 = 0 ;

let pos1 = {
      x : 0,
      y : 0
}

let pos2 = {
      x : 0,
      y : 0
}
let isDrawing = false
let colorPaint = '#000000';
let size = 10
sizeEl.innerText = size;
 
//  draw free
function freeDrag(e){

       if(isDrawing){
            pos2 ={
                  x : e.offsetX,
                  y : e.offsetY
            }
            // fille net vẽ
              
                        ctx.beginPath();
            ctx.arc(pos1.x, pos1.y, size, 0,2 * Math.PI);
            ctx.fillStyle = colorPaint;
            ctx.fill();
      
            // vẽ out line
            ctx.beginPath();
            ctx.moveTo(pos1.x, pos1.y);
            ctx.lineTo(pos2.x, pos2.y);
            ctx.strokeStyle = colorPaint;
            ctx.lineWidth = size*2;
            ctx.stroke();
      
            pos1.x = pos2.x;
            pos1.y= pos2.y;

                  }
}  

pen.addEventListener('click', function(){
      // remove specile shape Drag listener
      document.removeEventListener('mousemove', dragByShape)
      document.removeEventListener('mouseup',drawCircle)
      document.addEventListener('mousedown',function(e){
            pos1 ={
                  x : e.offsetX,
                  y : e.offsetY
            }
            isDrawing = true
      })     
      document.addEventListener('mousemove', freeDrag)
      document.addEventListener('mouseup', function(e){
            isDrawing = false;
      })
})

function dragByShape(e){
      isDrawing = true;
      if(isDrawing){
            pos2 ={
                  x : e.offsetX,
                  y : e.offsetY
            }
            ctx.beginPath();
            ctx.rect(pos1.x, pos1.y, Math.abs(pos2.x- pos1.x), Math.abs(pos2.y-pos1.y));
            ctx.stroke();
          
           }  
}
function drawCircle(e){
      isDrawing = true;
      if(isDrawing){
            // pos2 = {
            //        x : e.offsetX,
            //        y : e.offsetY
            // }

            ctx.beginPath();
            ctx.arc(pos1.x, pos1.y, size, 0 ,2 * Math.PI);
            ctx.stroke();
      }
}
// vẽ theo hình
square.addEventListener('click', function(){
      // remove free Drag listener
      document.removeEventListener('mousemove',freeDrag)
      document.removeEventListener('mouseup',drawCircle)

      document.addEventListener('mousedown',function(e){
            pos1 ={
                  x : e.offsetX,
                  y : e.offsetY
            }
            isDrawing = true
      })
      
      document.addEventListener('mouseup', dragByShape)
    
      document.addEventListener('mouseup', function(e){
            isDrawing = false;
      })
      
})

circle.addEventListener('click', function(){
      document.removeEventListener('mouseup', dragByShape)
      document.removeEventListener('mousemove',freeDrag)
      document.addEventListener('mousedown', function(e){
            pos1 = {
                  x : e.offsetX,
                  y : e.offsetY
            }
            isDrawing = true
      })
      document.addEventListener('mouseup', drawCircle)    
      
      document.addEventListener('mouseup', function(e){
            isDrawing = false;
      })
      
})

color.addEventListener('change', function(e){
      colorPaint = e.target.value
})

eraser.addEventListener('click', function(){
      colorPaint = '#ffffff'
      document.removeEventListener('mousemove', dragByShape)
      document.addEventListener('mousedown',function(e){
            pos1 ={
                  x : e.offsetX,
                  y : e.offsetY
            }
            isDrawing = true
      })     
      document.addEventListener('mousemove', freeDrag)
      document.addEventListener('mouseup', function(e){
            isDrawing = false;
      })
})

decrease.addEventListener('click', function (){
    size -= 1
    size = size > 1 ? size : 1
    sizeEl.innerText = size
})
increase.addEventListener('click', function (){
      size += 1
      size = size <30 ? size : 30
      sizeEl.innerText = size
})

clear.addEventListener('click', function(){  
      ctx.clearRect(0, 0 , 1000, 600)
})
save.addEventListener('click', function(){
     let output = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
     save.setAttribute('href', output)
     save.click();
})