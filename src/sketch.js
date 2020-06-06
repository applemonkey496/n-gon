
// called once
function setup() {
  createCanvas(550, 550);
  angleMode(RADIANS); // so the equations work

  const n = window.prompt('How many sides? (Integer)'); // get input

  const r = Math.min(width, height) / 2 - 50; // circumradius for the shape

  // get arrays for the x- and y- coordinates
  const x = getPoints({
    sides: n,
    radius: r,
    offset: width / 2,
    mode: 'x'
  });
  const y = getPoints({
    sides: n,
    radius: r,
    offset: height / 2,
    mode: 'y'
  });

  // draw the shape
  for (let i = 0; i < n; i++) {
    const x1 = x[i];
    const y1 = y[i];

    const j = (i + 1) % n;
    const x2 = x[j];
    const y2 = y[j];

    line(x1, y1, x2, y2);
  }

  // formulae for side length and exterior angles
  const ext = 360 / n;
  const side = 2 * r * sin(PI / n);

  // display result of formulae
  text(`Turn ${round(ext, 1)}°, forward ${round(side, 2)}px`, 25, 25);
}

// function to get the x / y points of an n-gon
// see https://gamedev.stackexchange.com/questions/29559/algorithm-for-constructing-the-corners-of-a-regular-n-sided-polygon
function getPoints(data = {
  sides: 3,
  radius: 100,
  offset: 0,
  mode: 'x'
}) {
  let points = [];

  if (data.mode === 'x') {
    for (let i = 0; i < data.sides; i++) {
      let value = sin(i / data.sides * 2 * PI) * data.radius + data.offset;
      points.push(value);
    }
  } else if (data.mode === 'y') {
    for (let i = 0; i < data.sides; i++) {
      let value = cos(i / data.sides * 2 * PI) * data.radius + data.offset;
      points.push(value);
    }
  } else {
    throw new Error(`Expected mode to be either 'x' or 'y', but got ${data.mode}`);
    return;
  }

  return points;
}

/* 
 * A rounding function so I can specify the number of decimal places
 *
 * Number.EPSILON accounts for the some minor discrepancies with floating point numbers
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON 
 */
function round(number, places) {
  const exp = Math.pow(10, places);
  return rounded = Math.round((number + Number.EPSILON) * exp) / exp;
}
