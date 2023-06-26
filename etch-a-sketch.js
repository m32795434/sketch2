import {wait} from './lib/lib'
let picker;
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const range = document.querySelector('input[type="range"]');
const randomColorEl =  document.querySelector('#random-color')
const shapesSelect =  document.querySelector('#shapes-select')

let dotWidthRange = 0;

//initial values
const { width, height } = canvas;
const MOVE_AMOUNT = 40;
ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
randomColorEl.value = "on";
shapesSelect.value = "round";

// create random x and y,  starting points on the canvas.
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

ctx.beginPath(); // first dot;
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

let isDrawing = false;

function handleRange(e) {
  if (e) {
    dotWidthRange = e.target.value;
  } else {
    dotWidthRange = range.value;
  }
}

function draw(localX, localY) {
  if(randomColorEl.value === "on"){
    ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }
  ctx.beginPath();
  ctx.moveTo(localX, localY);
  ctx.lineTo(localX, localY);
  ctx.lineWidth = MOVE_AMOUNT * dotWidthRange;
  ctx.stroke();
}

// Write a handler for the keys and touch events
function handleEvent(event, localX, localY) {
  event.preventDefault();
  // just hovering, but not drawing?
  if (event.type === 'mousemove' && !isDrawing) {
    return;
  }

  if (localY && localX) {
    // if mouse move or down event
    [x, y] = [localX, localY];
  }

  if (event instanceof TouchEvent) {
    if (event.type === 'touchstart') {
      isDrawing = true;
    } else if (event.type === 'touchend' || event.type === 'touchcancel') {
      isDrawing = false;
      return;
    }
    x = event.touches[0].clientX - canvas.offsetLeft;
    y = event.touches[0].clientY - canvas.offsetTop;
  }
  const visualWidth = window.visualViewport.width;
  if (visualWidth >= 1024 && visualWidth <= 1280) {
    draw(x * 2.7368, y * 2.6666);//width: 950px; height: 450px;ok
  } else if (visualWidth >= 844 && visualWidth < 1023) {//width: 790px;height: 300px;
    draw(x * 3.2911, y * 4);
  }else if (visualWidth <=843) {//width: 600px;height: 300px;
    draw(x * 4.3333, y * 4);
  } else {
    // desktop
    draw(x * 2, y * 2);//width: 1300px;height: 600px;ok
  }
}

// Clear canvas
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    () => {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

async function handlePicker(){
  picker = document.querySelector('#picker');
  if(picker){
    pickerEventsAppliyer(picker)
    const button = picker.shadowRoot.querySelector('button');
    button.style.cssText += 'transition: width .5s linear; width: 10vw;'
  }else{
    await wait(3000);
  picker = document.querySelector('#picker');
    if(picker){
      pickerEventsAppliyer(picker)
      const button = picker.shadowRoot.querySelector('button');
      button.style.cssText += 'transition: width .5s linear; width: 10vw;'
    }else{alert('Sorry😕. Color picker not available!')}
  }
}

function pickerEventsAppliyer(picker){
picker.addEventListener('change', (evt)=>{
  randomColorEl.value = "off";
  ctx.strokeStyle =evt.detail.hsl;
})
}
// Listen for arrow keys and touch events
// window.addEventListener('keydown', handleEvent);
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  handleEvent(e, e.offsetX, e.offsetY);
});
canvas.addEventListener('mousemove', (e) =>
  handleEvent(e, e.offsetX, e.offsetY)
);
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});
canvas.addEventListener('mouseout', () => {
  isDrawing = false;
});
canvas.addEventListener('touchstart', (e) => handleEvent(e));
canvas.addEventListener('touchmove', (e) => {
  handleEvent(e);
  e.preventDefault();
});
canvas.addEventListener('touchend', (e) => handleEvent(e));
canvas.addEventListener('touchcancel', (e) => handleEvent(e));

range.addEventListener('input', handleRange);
shapesSelect.addEventListener('input', (e)=>{
const val =  e.currentTarget.value;
console.log('shape:', val)
ctx.lineCap = `${val}`;
ctx.lineJoin = `${val}`;
});
randomColorEl.addEventListener('input', (e)=>{
const val = e.currentTarget.value;
if(val ==="off") picker.color = ctx.strokeStyle;
})

shakeButton.addEventListener('click', clearCanvas);




handleRange();
handlePicker();

/* Previous draw functs
function draw({ key }) {
  ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
  console.log(key);
  // start the path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move our x and y where the user pressed the arrow key
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineWidth = MOVE_AMOUNT * dotWidthRange;
  ctx.lineTo(x, y);
  ctx.stroke();
} 
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault(); // stop scrolling
    draw(e);
  }
}
window.addEventListener('keydown', handleKey);


*/
