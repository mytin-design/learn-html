const canvas = document.querySelector('canvas');

canvas.style.border = 'red solid';

ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';

ctx.fillRect(10, 10, 100, 100); //values in the order x1, y1, x2, y2;

//the top-left corner is at x1, y1 (0, 0);

