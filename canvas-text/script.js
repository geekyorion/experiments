const canvas = document.getElementById('text-canvas');
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;
const context = canvas.getContext('2d');

// utils
const getRandomNumber = (min = 0, max = 10) => {
  return ~~(Math.random() * (max - min)) + min;
}

// common settings
context.textBaseline = "top";
context.textAlign = "start";

const drawOnCanvas = (letter, fillRectColor) => {
  // fill style for fading the text
  context.fillStyle = fillRectColor;
  context.fillRect(0, 0, width, height);
  
  // fillstyle for the text
  context.fillStyle = '#000';
  const fontSize = getRandomNumber(30, 100);
  context.font = `${fontSize}px Arial`;
  const randomX = getRandomNumber(0, width - fontSize);
  const randomY = getRandomNumber(0, height - fontSize);
  
  // fill the text on canvas
  context.fillText(letter, randomX, randomY);
};

// accepts alphanumeric letters with some special symbols
const regex = /^[\w!@#$%^&*()+=-]$/;

// welcome message
let firstKeyPressPending = true;
const text = 'Press any key (/\w!@#$%^&*()+=-]$/) to continue';
context.font = '40px Arial';
context.fillText(text, 10, 10);

document.addEventListener('keydown', ({ key }) => {
  if (regex.test(key)) {
    let fillRectColor = firstKeyPressPending ? '#fff' : '#fff1';
    drawOnCanvas(key, fillRectColor);
    firstKeyPressPending = false;
  }
});
