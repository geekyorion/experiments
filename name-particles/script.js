// common settings
const text = 'GeekyOrion';
const fontSize = 30;
const textColor = '#fff';
const radius = 2;
const angle_360 = Math.PI * 2;
const margin = 10;
const padding = radius + 2;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

context.strokeStyle = textColor;
context.fillStyle = textColor;

context.font = `20px Arial`;
context.fillText(text, 10, 30);

// context.rect(8, 12, 110, 24)
// context.stroke();

const imageData = context.getImageData(8, 12, 110, 24);
const { data: pixelData, width: imageWidth, height: imageHeight } = imageData;

context.fillStyle = '#000';
context.fillRect(0, 0, innerWidth, innerHeight);

// put the bigger text now
context.font = `20px Arial`;
context.fillText(text, 10, 30);

for (let i = 0; i < imageWidth * imageHeight; i++) {
  const col = i % imageWidth;
  const row = ~~(i / imageWidth);
  
  const r = pixelData[4 * i + 0];
  const g = pixelData[4 * i + 1];
  const b = pixelData[4 * i + 2];
  const a = pixelData[4 * i + 3];
  
  context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
  
  context.save();
  context.beginPath();
  context.translate(margin + col * radius * padding, margin + row * radius * padding);
  context.arc(0, 0, radius, 0, angle_360);
  context.stroke();
  context.restore();
}
