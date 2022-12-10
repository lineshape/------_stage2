let btn = [];
let checkbtn;
let blood_img;

const mbti = ['I', 'N', 'T', 'P', 'E', 'S', 'F', 'J'];
let current_mbti = ['', '', '', ''];

// TODO: 여기에 정답과, 반대 mbti를 설정합니다.
const answer_mbti = 'INTP';
const wrong_mbti = 'ESFJ';

const wrong_mbti_dialogs = [
  '전혀 틀렸어. 나도 알아. 나 못난거',
  '근데 왜 나에 대한 기준만 이렇게 엄격한데?',
  '다들 날 싫어하는게 분명해',
];
let index = -1;

let isanswer = 'none';

var fireworks = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < 4; i++) {
    btn.push(new Button(i * 100, 200, 100, 100, mbti[i]));
  }

  for (let i = 4; i < 8; i++) {
    btn.push(new Button((i - 4) * 100, 300, 100, 100, mbti[i]));
  }

  checkbtn = new Button(300, 100, 50, 50, '확인');

  blood_img = loadImage('assets/blood.png');
}

function draw() {
  if (index >= 0) {
    image(blood_img, 0, 0, window.innerWidth, window.innerHeight);
    textSize(14);
    fill(0);
    text(wrong_mbti_dialogs[index], 30, 175);
    fill(0);
  } else {
    background(220);
  }

  switch (isanswer) {
    case 'none':
      text('MBTI를 맞춰보세요!', 30, 40);
      break;
    case 'true':
      text('정답입니다! 다음은 9999을 입력해.', 30, 40);
      break;
    case 'false':
      text('틀렸어.', 30, 40);
      break;
  }

  // 현재 선택한 mbti를 알려주는 View
  for (let i = 0; i < 4; i++) {
    text(current_mbti[i], 55 + i * 50, 80, 85 + i * 50, 80);
    line(50 + i * 50, 100, 80 + i * 50, 100);
  }

  // mbti 버튼
  for (let i = 0; i < 8; i++) {
    btn[i].show();
  }

  // mbti 버튼 클릭 처리
  for (let i = 0; i < 8; i++) {
    let clicked_mbti = btn[i].click();

    if (clicked_mbti) {
      current_mbti[i % 4] = clicked_mbti;
    }
  }

  // 확인 버튼
  checkbtn.show();

  // TODO: 여기에 확인 버튼 클릭을 처리합니다.
  if (checkbtn.click()) {
    let tried_mbti = current_mbti.join('');

    switch (tried_mbti) {
      case answer_mbti:
        index = -1;
        isanswer = 'true';
        fireworks.push(new Fireworks(80));
        setInterval(() => fireworks.push(new Fireworks(80)), 3000);
        break;
      case wrong_mbti:
        index++;
        break;
      default:
        isanswer = 'false';
        break;
    }
  }

  for (var i = 0; i < fireworks.length; i++) {
    fireworks[i].display();
    fireworks[i].update();
    if (fireworks[i].needRemove()) {
      fireworks.splice(i, 1);
    }
  }
}

function Fireworks(radius) {
  var num = 512; //     ，      (     )
  var centerPosition = new p5.Vector(
    random(width / 8, (width * 7) / 8),
    random(height / 2, (height * 4) / 5),
    random(-100, 100)
  ); //
  var velocity = new p5.Vector(0, -22, 0);
  var accel = new p5.Vector(0, 0.4, 0);
  var img;
  var firePosition = [];
  var cosTheta;
  var sinTheta;
  var phi;
  var colorChange = random(0, 5);

  for (var i = 0; i < num; i++) {
    cosTheta = random(0, 1) * 2 - 1;
    sinTheta = sqrt(1 - cosTheta * cosTheta);
    phi = random(0, 1) * 2 * PI;
    firePosition[i] = new p5.Vector(
      radius * sinTheta * cos(phi),
      radius * sinTheta * sin(phi),
      radius * cosTheta
    ); //1
    firePosition[i] = p5.Vector.mult(firePosition[i], 1.12);
  }

  //        ，
  if (colorChange >= 3.8) {
    img = createLight(0.9, random(0.2, 0.5), random(0.2, 0.5));
  } else if (colorChange > 3.2) {
    img = createLight(random(0.2, 0.5), 0.9, random(0.2, 0.5));
  } else if (colorChange > 2) {
    img = createLight(random(0.2, 0.5), random(0.2, 0.5), 0.9);
  } else {
    img = createLight(random(0.5, 0.8), random(0.5, 0.8), random(0.5, 0.8));
  }

  this.display = function () {
    for (var i = 0; i < num; i++) {
      push();
      translate(centerPosition.x, centerPosition.y, centerPosition.z);
      translate(firePosition[i].x, firePosition[i].y, firePosition[i].z);
      blendMode(ADD); //    （       ）
      image(img, 0, 0);
      pop();

      firePosition[i] = p5.Vector.mult(firePosition[i], 1.015); //    （   ）
    }
  };

  this.update = function () {
    //
    radius = dist(
      0,
      0,
      0,
      firePosition[0].x,
      firePosition[0].y,
      firePosition[0].z
    );
    centerPosition.add(velocity);
    velocity.add(accel);
  };

  this.needRemove = function () {
    if (centerPosition.y - radius > height) {
      return true;
    } else {
      return false;
    }
  };
}

function createLight(rPower, gPower, bPower) {
  var side = 64;
  var center = side / 2.0;
  var img = createImage(side, side);
  img.loadPixels();
  for (var y = 0; y < side; y++) {
    for (var x = 0; x < side; x++) {
      var distance = (sq(center - x) + sq(center - y)) / 10.0;
      var r = int((255 * rPower) / distance);
      var g = int((255 * gPower) / distance);
      var b = int((255 * bPower) / distance);
      // img.pixels[x + y * side] = color(r, g, b);
      img.set(y, x, color(r, g, b));
    }
  }

  img.updatePixels();
  return img;
}
