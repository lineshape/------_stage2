class Button {
  constructor(x, y, w, h, title) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.title = title;

    this.isClicked = false;
  }

  show() {
    if (this.over()) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    rect(this.x, this.y, this.w, this.h);

    fill(0);
    textSize(18);
    text(
      this.title,
      this.x + this.w / 2 - this.title.length * 7,
      this.y + this.h / 2
    );
  }

  over() {
    let x2 = this.x + this.w;
    let y2 = this.y + this.h;
    if (this.x < mouseX && mouseX < x2 && this.y < mouseY && mouseY < y2) {
      return true;
    } else {
      return false;
    }
  }

  click() {
    let x2 = this.x + this.w;
    let y2 = this.y + this.h;
    if (this.x < mouseX && mouseX < x2 && this.y < mouseY && mouseY < y2) {
      if (mouseIsPressed) {
        if (!this.isClicked) {
          this.isClicked = true;
          return this.title;
        } else {
          return null;
        }
      }
    }

    this.isClicked = false;
    return null;
  }

  setTitle(t) {
    this.title = t;
  }
}
