const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 960;
canvas.height = 600;

let start_x = 45;
let start_y = 50;
let margin = 30;
let card_lon = 30;
let card_width = card_lon * 4;
let card_height = card_lon * 4;
let cards_arr = [];

class Card {
  constructor(x, y, w, h, info) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.info = info;
    this.back_color = 'blue';
  }

  draw() {
    ctx.fillstyle = this.back_color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

const adjust = (xx, yy) => {
  let pos_canvas = canvas.getBoundingClientRect();
  let x = xx - pos_canvas.left;
  let y = yy - pos_canvas.top;
  return { x, y }
}

const select = (e) => {
  let pos = adjust(e.clientX, e.clientY);
  console.log(pos.x)
}

const shuffle = () => {
  let i, j, k;
  let temp;
  let lon = cards_arr.length
  for (let j = 0; j < lon * 3; j++) {
    i = Math.floor(Math.random() * lon);
    k = Math.floor(Math.random() * lon);
    temp = cards_arr[i].info;
    cards_arr[i].info = cards_arr[k];
    cards_arr[k].info = temp;
  }
}

const board = () => {
  let card;
  let x = start_x;
  let y = start_y;
  for (let i = 0; i < 6 ; i++) {
    card = new Card(x, y, card_width, card_height, i);
    cards_arr.push(card);
    card.draw();
    
    card = new Card(x, y + card_width + margin, card_width, card_height, i);
    cards_arr.push(card);
    card.draw();

    x += card_width + margin;
  }
}

canvas.addEventListener('click', select);
board();
shuffle();