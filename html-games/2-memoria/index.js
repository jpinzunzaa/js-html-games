const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 960;
canvas.height = 600;

let first_card = null;
let second_card = null;
let is_equal = false;
let cards_arr = [];
let start_x = 45;
let start_y = 50;
let margin = 30;
let card_size = 100;
let back_color = 'yellow';
let front_color = 'blue';

class Card {
  constructor(x, y, w, h, info) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.info = info;
    this.is_flipped = false;
    this.matched = false;
  }

  draw() {
    ctx.fillStyle = this.is_flipped || this.matched ? front_color : back_color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    
    if (this.is_flipped || this.matched) {
      ctx.font = 'bold 40px Comic Sans MS';
      ctx.fillStyle = 'black';
      ctx.fillText(String(this.info), this.x + this.w / 2 - 10, this.y + this.h / 2 + 10);
    }
  }

  flip() {
    this.is_flipped = !this.is_flipped;
    this.draw();
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

  for (let card of cards_arr) {
    if (
      !card.matched &&
      pos.x > card.x && pos.x < card.x + card.w &&
      pos.y > card.y && pos.y < card.y + card.h
    ) {
      if (!first_card) {
        first_card = card;
        first_card.flip();
      } else if (!second_card && card !== first_card) {
        second_card = card;
        second_card.flip();

        if (first_card.info === second_card.info) {
          is_equal = true;
          setTimeout(() => {
            first_card.matched = true;
            second_card.matched = true;
            first_card = null;
            second_card = null;
          }, 500);
        } else {
          is_equal = false;
          setTimeout(() => {
            first_card.flip();
            second_card.flip();
            first_card = null;
            second_card = null;
          }, 1000);
        }
      }
      break;
    }
  }
}

const shuffle = () => {
  for (let i = cards_arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards_arr[i].info, cards_arr[j].info] = [cards_arr[j].info, cards_arr[i].info];
  }
}

const board = () => {
  let x = start_x;
  let y = start_y;
  for (let i = 0; i < 6; i++) {
    let card1 = new Card(x, y, card_size, card_size, i);
    let card2 = new Card(x, y + card_size + margin, card_size, card_size, i);
    
    cards_arr.push(card1, card2);
    
    x += card_size + margin;
  }

  shuffle();
  cards_arr.forEach(card => card.draw());
}

canvas.addEventListener('click', select);
board();
