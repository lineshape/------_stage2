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

function setup() {
  createCanvas(400, 400);
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
    image(blood_img, 0, 0, 400, 400);
    textSize(14);
    fill(255);
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
        break;
      case wrong_mbti:
        index++;
        break;
      default:
        isanswer = 'false';
        break;
    }
  }
}
