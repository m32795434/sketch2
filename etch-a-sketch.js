const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const range = document.querySelector('input[type="range"]');
let dotWidthRange = 0;

// Setup our canvas for drawing using destructuring.
const { width, height } = canvas;
const MOVE_AMOUNT = 40;
ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;

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
  ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
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
  if (visualWidth >= 1024 && visualWidth <= 1370) {
    console.log('drawing down 915');
    draw(x * 3.3684, y * 4.4444);
  } else if (visualWidth >= 844 && visualWidth < 1023) {
    draw(x * 3.79146, y * 4.4444);
  } else {
    // desktop
    draw(x * 2, y * 2.5);
    console.log('drawing upper 915');
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

shakeButton.addEventListener('click', clearCanvas);

handleRange();

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
