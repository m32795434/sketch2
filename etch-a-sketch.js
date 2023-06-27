import {wait} from './lib/lib'
let picker;
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const range = document.querySelector('input[type="range"]');
const randomColorEl =  document.querySelector('#random-color')
const shapesSelect =  document.querySelector('#shapes-select')

//AUDIO SELECTORS
var audioPlayer = document.getElementById('audio-player');
var changeButton = document.getElementById('change-button');
var volumeSlider = document.getElementById('volume-slider');
const audioSrcs = [
  'https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2F8-bit-arcade-138828.mp3?alt=media&token=2e99e284-3b94-4d20-9896-929f745e56f2', 
  'https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fbrahms-lullaby-violin-129646.mp3?alt=media&token=85a6569f-2358-4d39-8b31-81c7dc5dcada', 
  'https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2F8-bit-dream-land-142093.mp3?alt=media&token=677ab70b-d282-41fa-ae11-7607a5e5a208', 
  'https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fdesesperebolo-9006.mp3?alt=media&token=ea240ead-6733-40e6-821c-c32ee5596e8e', 
  'https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fhappy-epic-cinematic-8306.mp3?alt=media&token=ad1f8935-e35b-463a-826f-7eab9da0c171', 
  'https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Felixir-of-life-9420.mp3?alt=media&token=bcf93ee9-c771-4619-b662-a4076010dc90', 
  'https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Finspiring-epic-motivation-cinematic-trailer-11218.mp3?alt=media&token=2b914963-8b37-4571-acf0-99bf99cda173', 
  'https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fsimple-piano-melody-9834.mp3?alt=media&token=c069316b-418e-40dc-b8a5-6294b192fd1b', 
  'https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fpassword-infinity-123276.mp3?alt=media&token=01c4aa2c-c88d-4e52-bfd9-3ea2c8df50e3', 
  'https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fsoulful-moonlight-sonata-111916.mp3?alt=media&token=a7b3244d-7a67-4703-afdf-5c6128ee3d55', 
  'https://firebasestorage.googleapis.com/v0/b/manuel-bravard-projects.appspot.com/o/audios%2Fuplifting-life-short-146426.mp3?alt=media&token=346c37a9-ed0c-4728-9fad-6a052d9189e0'];
const audiosLength =audioSrcs.length;
let track = -1;



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

  if (visualWidth === 1280) {
    draw(x * 2.1666, y * 2);//width: 1200px; height: 600px;
  } else if (visualWidth >= 1024 && visualWidth <= 1280) {
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

//AUDIO RELATED EVENT LESTINERS
changeButton.addEventListener('click', function() {
audioPlayer.pause();
if(track+1 >= 0 && track+1 < audiosLength){
  audioPlayer.src =  audioSrcs[++track];
}else{
  track = 0;
  audioPlayer.src =  audioSrcs[track];
}
audioPlayer.play();
});

volumeSlider.addEventListener('input', function() {
  audioPlayer.volume = volumeSlider.value;
});


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
