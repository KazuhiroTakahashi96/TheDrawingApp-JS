const canvas = document.getElementById("drawing-canvas");
const increaseBtn = document.querySelector("#increase");
const decreaseBtn = document.querySelector("#decrease");
const strokeThickness = document.querySelector("#size");
const colorBtn = document.querySelector("#color");
const clearBtn = document.querySelector("#clear");

/******************* Canvas getContext() Method *********************
https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext#:~:text=getContext()%20method%20returns%20a,to%20a%20different%20context%20mode.

******************* CanvasRenderingContext2D ********************
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
*/

const ctx = canvas.getContext("2d");
// console.log(ctx);

let size = 10;
let isPressed = false;
let color = "black";
let x = undefined;
let y = undefined;

canvas.addEventListener("mousedown", function (e) {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", function (e) {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", function (e) {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

// Drawing lines
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

// Drawing circle
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

// increase btn
increaseBtn.addEventListener("click", function () {
  size += 1;

  if (size > 50) {
    size = 50;
  }

  updateSize();
});

// decrease btn
decreaseBtn.addEventListener("click", function () {
  size -= 1;

  if (size < 1) {
    size = 1;
  }

  updateSize();
});

// color btn
colorBtn.addEventListener("change", function (e) {
  color = e.target.value;
});

// clear btn
clearBtn.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// updating the stroke width dynamically
function updateSize() {
  strokeThickness.innerText = size;
}
