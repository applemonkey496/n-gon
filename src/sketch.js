
function setup() {
  createCanvas(550, 550);
  angleMode(RADIANS);

  const n = window.prompt('How many sides? (Integer)');

  const r = Math.min(width, height) / 2 - 50;

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

  for (let i = 0; i < n; i++) {
    const x1 = x[i];
    const y1 = y[i];

    const j = (i + 1) % n;
    const x2 = x[j];
    const y2 = y[j];

    line(x1, y1, x2, y2);
  }

  const ext = 360 / n;
  const side = 2 * r * sin(PI / n);

  text(`Turn ${round(ext, 1)}°, forward ${round(side, 2)}px`, 25, 25);
}

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

function round(number, places) {
  const exp = Math.pow(10, places);
  return rounded = Math.round((number + Number.EPSILON) * exp) / exp;
}
