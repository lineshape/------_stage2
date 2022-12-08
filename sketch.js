let btn = [];
let checkbtn;

const mbti = ['I', 'N', 'T', 'P', 'E', 'S', 'F', 'J'];
let current_mbti = ['', '', '', ''];

let answer_mbti = 'INTP';

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 4; i++) {
    btn.push(new Button(i * 100, 200, 100, 100, mbti[i]));
  }

  for (let i = 4; i < 8; i++) {
    btn.push(new Button((i - 4) * 100, 300, 100, 100, mbti[i]));
  }

  checkbtn = new Button(300, 100, 50, 50, '확인');
}

function draw() {
  background(220);

  for (let i = 0; i < 4; i++) {
    text(current_mbti[i], 55 + i * 50, 80, 85 + i * 50, 80);
    line(50 + i * 50, 100, 80 + i * 50, 100);
  }

  for (let i = 0; i < 8; i++) {
    btn[i].show();
  }

  for (let i = 0; i < 8; i++) {
    let clicked_mbti = btn[i].click();

    if (clicked_mbti) {
      current_mbti[i % 4] = clicked_mbti;
    }
  }

  checkbtn.show();
  if (checkbtn.click()) {
    // 여기에 확인 버튼이 눌렸을 때 처리
    let tried_mbti = current_mbti.join('');

    if (answer_mbti == tried_mbti) {
      console.log('정답!');
    } else {
      console.log('실패');
    }
  }
}
