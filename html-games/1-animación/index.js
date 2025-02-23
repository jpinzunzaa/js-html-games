const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const check_limits = (ball) => {
  let next_x = ball.x + ball.dx;
  let next_y = ball.y + ball.dy;
  let right_limit = ball.width - ball.radius;
  let left_limit = ball.radius;
  let top_imit = ball.radius;
  let bottom_limit = ball.height - ball.radius;

  if (next_x > right_limit || next_x < left_limit) {
    ball.dx *= -1;
  }
  if (next_y > bottom_limit || next_y < top_imit) {
    ball.dy *= -1;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;
}

class Ball {
  constructor(ctx, x, y, radius, dx, dy, color = 'red') {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  move() {
    this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    check_limits(this);
    this.draw();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}

const ball = new Ball(ctx, 50, 100, 10, 4, 4);

setInterval(() => {
  ball.move();
}, 60);
