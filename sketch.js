let pattern,
  arr,
  totalLines,
  minNumLines,
  linePitch,
  tL,
  randX,
  randY;

preload = () => {
  img = loadImage("bg.png");
};

setup = () => {
  createCanvas(windowHeight, windowHeight);
  pattern = [];
  arr = [];
  totalLines = round(random(10, 50));
  minNumLines = random(30);
  linePitch = random(2, 40);
  randY = random(height * 2);
  randX = random(width * 2);
  tL = Array(totalLines).fill(0);
  background(0);
  stroke(255);
  strokeWeight(random(0.5, 4));
  strokeCap(ROUND);
  noFill();
  noLoop();
  for (let i = 0; i < totalLines; i++) {
    let s = round(random(1, 50));
    arr.push(s);
    let acc = [];
    let randCoeff = random(0.5, 1);
    for (let x = 0; x <= width + 800; x += minNumLines) {
      if (random() > randCoeff) {
        let pitch = random(minNumLines, linePitch);
        for (let j = 0; j < pitch; j++) {
          acc.push(false);
        }
        x += pitch;
      }
      else {
        for (let j = 0; j < minNumLines; j++) {
          acc.push(true);
        }
      }
    }
    pattern.push(acc);
  }
};

draw = () => {
  image(img, 0, 0, width, height);
  let i = 0;
  for (let y = 0; y < height; y += height / totalLines) {
    let begun = true;
    beginShape();
    let ptr = pattern[i];
    let speedMod = map(randX, 0, width, 1, 10);
    t = tL[i];
    tL[i] += ptr[i] * round(speedMod);
    let shift = y / 200;
    let freq = map(randY, 0, height, height * 0.25, height * 0.05);
    let getY = (xVal) => sin(xVal / freq - frameCount / 3000 + shift) * height / totalLines + y;
    for (let x = 0; x <= width; x += 1) {
      let val = ptr[(x + t) % width];
      if (val && begun) {
        vertex(x, getY(x));
      } else if (val && !begun) {
        begun = true;
        beginShape();
        vertex(x, getY(x));
      } else if (!val && begun) {
        endShape();
        begun = false;
        blendMode(BLEND);
      }
    }
    endShape();
    i++;
  }
};

keyPressed = () => {
  if (key === 's') {
    save();
  }
};