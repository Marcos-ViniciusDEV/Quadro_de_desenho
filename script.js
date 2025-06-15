//inicial data
let currentColor = 'black';
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');
ctx.lineWidth = 10;
let canDraw = false;


//events

document.querySelectorAll('.colorArea .color').forEach(colorElement => {
    colorElement.addEventListener('click', colorClickEvent)

});

document.addEventListener('mousedown', mouseDownEvent);  
document.addEventListener('mousemove', mouseMoveEvent); 
document.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);
//function

document.querySelector('.borracha').addEventListener('click', erease)


document.querySelector('.plus').addEventListener('click', plus);
document.querySelector('.minus').addEventListener('click', minus);

function colorClickEvent(event) {
    let color = event.target.getAttribute('data-color');
    currentColor = color;
    ctx.lineWidth = 10;
    document.querySelector('.color.active').classList.remove('active');
    event.target.classList.add('active');
    document.querySelector('.borracha').classList.remove('active');
}



function plus() {
    ctx.lineWidth += 5;
}

function minus() {
  
        ctx.lineWidth -= 5;
   
}

function draw(x, y) {
    
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //desenhar
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke(); 
    

    mouseX = pointX;
    mouseY = pointY;

    plus();
    minus();



    

}

function mouseDownEvent(event){
    canDraw = true;
    mouseX = event.pageX - screen.offsetLeft;
    mouseY = event.pageY - screen.offsetTop;


}

function mouseMoveEvent(event) {
    if(canDraw) {
        draw(event.pageX, event.pageY);

    }
}

function mouseUpEvent() {
  canDraw = false;
  
}


function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformation matrix
    ctx.clearRect(0, 0, screen.width, screen.height); // Clear the canvas
    document.querySelector('.borracha').classList.remove('active');

}

function erease(e) {
    currentColor = 'white';
    ctx.lineWidth = 50;
    e.target.classList.add('active');
}

