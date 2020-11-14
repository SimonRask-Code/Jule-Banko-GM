class flake {
  constructor(y_pos = false) {
    this.x = random(windowWidth);
    if (y_pos){
      this.y = random(windowHeight);
    } else {
      this.y = 0;
    }
    this.dx = random(-5, 5);
    this.dy = random(1, 5);
    this.opacity = random(100, 255)
    this.size = random(5, 9);
    this.moving = true;
  }

  display() {
    // Draw flake
    noStroke();
    fill(255, 255, 255, this.opacity)
    ellipse(this.x, this.y, 2 * this.size)

  }

  NextPosY() {
    if (this.y + this.dy >= windowHeight - this.size + this.dy) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    // Check if hit the ground
    if (this.NextPosY() || !this.moving) {
      this.moving = false;
      this.opacity -= 0.3;
    }

    if (this.moving) {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x > windowWidth) {
        this.x = 0;
      } else if (this.x < 0) {
        this.x = windowWidth;
      }
    }
  }
}