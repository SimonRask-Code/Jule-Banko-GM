class Circle {
  constructor(x, y, size, value) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.value = value;
    this.on = false;
    this.latest = false;
  }

  display() {
    // Draw ellipse

    fill(255);
    noStroke();
    ellipse(this.x, this.y - 6, this.size * 2);
    if (this.on && !this.latest) {
      // If tuned on
      fill(DarkBackground)
      strokeWeight(4);
      stroke(DarkText)
      ellipse(this.x, this.y, this.size * 2);
    } else if (this.on && this.latest) {
      fill(LatestBackground)
      strokeWeight(4);
      stroke(LatestText)
      ellipse(this.x, this.y, this.size * 2.9);
    } else {
      fill(LightBackground);
      strokeWeight(4);
      stroke(LightText);
      ellipse(this.x, this.y, this.size * 2);
    }



    // Draw value
    noStroke();
    textSize(this.size * 0.8);
    textFont('none');


    if (this.on && !this.latest) {
      fill(DarkText)
      textAlign(CENTER, CENTER);
      text(this.value, this.x, this.y);
    } else if (this.on && this.latest) {
      textSize(this.size * 0.8 * 1.9);
      fill(LatestText)
      textAlign(CENTER, CENTER);
      text(this.value, this.x, this.y);
    } else {
      fill(LightText)
      textAlign(CENTER, CENTER);
      text(this.value, this.x, this.y);
    }

  }

}

class Board {
  constructor() {
    this.Circles = CreateCircles();
    this.picked = [];
    this.numbers = []

    for (var i = 1; i < 91; i++) {
      this.numbers.push(i)
    }
  }

  reset() {
    this.Circles = CreateCircles();
    this.picked = [];
    this.numbers = []

    for (var i = 1; i < 91; i++) {
      this.numbers.push(i)
    }
  }

  display() {
    let latestCircle;
    for (var i = 0; i < this.Circles.length; i++) {
      if (this.Circles[i].latest) {
        latestCircle = this.Circles[i]
      } else {
        this.Circles[i].display()
      }

    }
    if (latestCircle) {
      latestCircle.display()
    }

  }

  resize() {
    let xoff = windowWidth / 12;
    let yoff = windowHeight / 12;

    let offset = min(xoff, yoff);

    let y_start = offset;
    let x_start = windowWidth / 2 - 4.5 * offset;


    for (var i = 0; i < this.Circles.length+1; i++) {
      if (i > 0){
        this.Circles[i - 1].size = 0.5 * offset * 0.9;
        this.Circles[i - 1].x = x_start +  (i%10) * offset;
        this.Circles[i - 1].y = y_start +  floor(i/10) * offset;
      }

    }
  }

  update(val) {
    for (var i = 0; i < this.Circles.length; i++) {
      this.Circles[i].latest = false
    }
    this.Circles[val - 1].on = true;
    this.Circles[val - 1].latest = true;
  }


}

function CreateCircles() {
  let Circles = [];

  let xoff = windowWidth / 12;
  let yoff = windowHeight / 12;

  let offset = min(xoff, yoff);

  let y_start = offset;

  for (i = 0; i < 9; i++) {
    let x_start = windowWidth / 2 - 4.5 * offset;
    for (j = 0; j < 10; j++) {
      thisCircle = new Circle(x_start, y_start, 0.5 * offset * 0.9, i * 10 + j)
      Circles.push(thisCircle)
      x_start += offset;
    }
    y_start += offset;
  }
  lastCircle = new Circle(windowWidth / 2 - 4.5 * offset, 10 * offset, 0.5 * offset * 0.9, 90)
  Circles.push(lastCircle)
  Circles.splice(0, 1)

  return Circles;
}

class NextNumber {
  constructor() {
    let xoff = windowWidth / 12;
    let yoff = windowHeight / 12;

    let offset = min(xoff, yoff);

    this.size = 2 * offset;
    this.x = windowWidth / 2 - offset;
    this.y = windowHeight - 1.3 * offset;

    this.value = 'Næste Nummer';

    this.on = false;
    this.on_for = 0;
  }

  display() {
    // Draw ellipse

    fill(255);
    noStroke();
    rect(this.x, this.y - 6, this.size, this.size / 3, this.size / 6);
    if (this.on) {
      // If tuned on
      fill(DarkBackground)
      strokeWeight(4);
      stroke(DarkText)
    } else {
      fill(LightBackground);
      strokeWeight(4);
      stroke(LightText);
    }

    rect(this.x, this.y, this.size, this.size / 3, this.size / 6);

    // Draw value
    noStroke();
    textFont('none');
    textSize(this.size * 0.13);

    if (this.on) {
      fill(DarkText)
      textAlign(CENTER, CENTER);
      text(this.value, this.x + this.size / 2, this.y + this.size / 6);
      this.on_for++;

    } else {
      fill(LightText)
      textAlign(CENTER, CENTER);
      text(this.value, this.x + this.size / 2, this.y + this.size / 6);
    }

    if (this.on_for > 5) {
      this.on = false;
      this.on_for = 0;
    }
  }

  clicked(x, y, board) {
    if (
      x < this.x + this.size &&
      x > this.x &&
      y < this.y + this.size / 3 &&
      y > this.y
    ) {
      this.on = !this.on;

      // We check if there are any numbers left to pick
      if (board.numbers.length > 0) {
        let nextNumber = random(board.numbers);
        let indexOfNumber = board.numbers.indexOf(nextNumber)
        board.numbers.splice(indexOfNumber, 1)
        board.picked.push(nextNumber)
        board.update(nextNumber)
      }
    }
  }


  resize() {
    let xoff = windowWidth / 12;
    let yoff = windowHeight / 12;

    let offset = min(xoff, yoff);

    this.size = 2 * offset;
    this.x = windowWidth / 2 - offset;
    this.y = windowHeight - 1.2 * offset;
  }
}

class NewGame {
  constructor() {
    let xoff = windowWidth / 12;
    let yoff = windowHeight / 12;

    let offset = min(xoff, yoff);

    this.size = 2 * offset;
    this.x = windowWidth / 4 - offset;
    this.y = windowHeight - 1.3 * offset;

    this.value = 'Nyt Spil';

    this.on = false;
    this.on_for = 0;
  }

  display() {
    // Draw ellipse

    fill(255);
    noStroke();
    rect(this.x, this.y - 6, this.size, this.size / 3, this.size / 6);
    if (this.on) {
      // If tuned on
      fill(DarkBackground)
      strokeWeight(4);
      stroke(DarkText)
    } else {
      fill(LightBackground);
      strokeWeight(4);
      stroke(LightText);
    }

    rect(this.x, this.y, this.size, this.size / 3, this.size / 6);

    // Draw value
    noStroke();
    textFont('none');
    textSize(this.size * 0.13);

    if (this.on) {
      fill(DarkText)
      textAlign(CENTER, CENTER);
      text(this.value, this.x + this.size / 2, this.y + this.size / 6);
      this.on_for++;

    } else {
      fill(LightText)
      textAlign(CENTER, CENTER);
      text(this.value, this.x + this.size / 2, this.y + this.size / 6);
    }

    if (this.on_for > 5) {
      this.on = false;
      this.on_for = 0;
    }
  }

  clicked(x, y, board) {
    if (
      x < this.x + this.size &&
      x > this.x &&
      y < this.y + this.size / 3 &&
      y > this.y
    ) {
      this.on = !this.on;
      board.reset()

    }
  }


  resize() {
    let xoff = windowWidth / 12;
    let yoff = windowHeight / 12;

    let offset = min(xoff, yoff);

    this.size = 2 * offset;
    this.x = windowWidth / 4 - offset;
    this.y = windowHeight - 1.2 * offset;

  }
}

class Shake {
  constructor() {
    let xoff = windowWidth / 12;
    let yoff = windowHeight / 12;

    let offset = min(xoff, yoff);

    this.size = 2 * offset;
    this.x = 3 * windowWidth / 4 - offset;
    this.y = windowHeight - 1.3 * offset;

    this.value = 'Ryst Posen';

    this.on = false;
    this.on_for = 0;

    this.shake = false;
    this.shake_for = 0;
  }

  display() {
    // Draw ellipse

    fill(255);
    noStroke();
    rect(this.x, this.y - 6, this.size, this.size / 3, this.size / 6);
    if (this.on) {
      // If tuned on
      fill(DarkBackground)
      strokeWeight(4);
      stroke(DarkText)
    } else {
      fill(LightBackground);
      strokeWeight(4);
      stroke(LightText);
    }

    rect(this.x, this.y, this.size, this.size / 3, this.size / 6);

    // Draw value
    noStroke();
    textFont('none');
    textSize(this.size * 0.13);

    if (this.on) {
      fill(DarkText)
      textAlign(CENTER, CENTER);
      text(this.value, this.x + this.size / 2, this.y + this.size / 6);
      this.on_for++;

    } else {
      fill(LightText)
      textAlign(CENTER, CENTER);
      text(this.value, this.x + this.size / 2, this.y + this.size / 6);
    }

    if (this.on_for > 5) {
      this.on = false;
      this.on_for = 0;
    }
    let shakeVec;
    if (this.shake && this.shake_for < 45) {
      shakeVec = new p5.Vector(random(10), random(10));
      this.shake_for++;
    } else {
      shakeVec = new p5.Vector(0, 0);
      this.shake_for = 0;
      this.shake = false;
    }
    return shakeVec
  }

  clicked(x, y, board) {
    if (
      x < this.x + this.size &&
      x > this.x &&
      y < this.y + this.size / 3 &&
      y > this.y
    ) {
      this.on = !this.on;
      this.shake = true

    }
  }


  resize() {
    let xoff = windowWidth / 12;
    let yoff = windowHeight / 12;

    let offset = min(xoff, yoff);

    this.size = 2 * offset;
    this.x = 3 * windowWidth / 4 - offset;
    this.y = windowHeight - 1.2 * offset;

  }
}