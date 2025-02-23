const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const radio = 10;
let bolax = 50;
let bolay = 100;
let dx = 4;
let dy = 4;
let width = canvas.width;
let height = canvas.height;
let right_limit= width - radio;
let left_limit = radio;
let top_limit = radio;
let bottom_limit = height - radio;

ctx.lineWidth = radio;
ctx.fillStyle = 'red';

const check_limits = () => {
  let nbolax = bolax + dx;
  let nbolay = bolay + dy;
  if (nbolax > right_limit) {
    dx *= -1;
    nbolax = right_limit;
  }
  if (nbolax < left_limit) {
    dx *= -1;
    nbolax = left_limit;
  }
  if (nbolay > bottom_limit) {
    dy *= -1;
    nbolay = bottom_limit;
  }
  if (nbolay < top_limit) {
    dy *= -1;
    nbolay = top_limit;
  }
  bolax = nbolax;
  bolay = nbolay;
}

const move = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  check_limits();
  ctx.beginPath();
  ctx.arc(bolax, bolay, radio, 0, 2 * Math.PI, true);
  ctx.fill();
}

setInterval(
  () => {
    move();
  },
  60
)