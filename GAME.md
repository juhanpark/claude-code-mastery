# 게임 개발 임시 코드

## 간단한 캔버스 게임 예제

아래는 HTML5 Canvas를 사용한 간단한 공 튀기기 게임입니다.

### HTML 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>간단한 게임</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #1a1a2e;
        }
        canvas {
            border: 3px solid #00d9ff;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
        }
        .game-container {
            text-align: center;
        }
        h1 {
            color: #00d9ff;
            margin-bottom: 20px;
            font-family: 'Pretendard', sans-serif;
        }
        .score {
            color: #fff;
            font-size: 24px;
            margin-top: 15px;
            font-family: 'Pretendard', sans-serif;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>🎮 공 튀기기 게임</h1>
        <canvas id="gameCanvas" width="800" height="500"></canvas>
        <div class="score">점수: <span id="score">0</span></div>
    </div>
    <script src="game.js"></script>
</body>
</html>
```

### JavaScript 게임 로직 (game.js)

```javascript
// 캔버스 설정
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 게임 상태
let score = 0;
let gameRunning = true;

// 공 객체
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    dx: 5,  // x 방향 속도
    dy: 5,  // y 방향 속도
    color: '#00d9ff'
};

// 패들 객체
const paddle = {
    width: 120,
    height: 15,
    x: canvas.width / 2 - 60,
    y: canvas.height - 30,
    speed: 8,
    color: '#10B981'
};

// 블록 설정
const blockRowCount = 4;
const blockColumnCount = 8;
const blockWidth = 85;
const blockHeight = 25;
const blockPadding = 10;
const blockOffsetTop = 50;
const blockOffsetLeft = 35;

// 블록 배열 생성
const blocks = [];
const blockColors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];

for (let row = 0; row < blockRowCount; row++) {
    blocks[row] = [];
    for (let col = 0; col < blockColumnCount; col++) {
        blocks[row][col] = {
            x: col * (blockWidth + blockPadding) + blockOffsetLeft,
            y: row * (blockHeight + blockPadding) + blockOffsetTop,
            visible: true,
            color: blockColors[row % blockColors.length]
        };
    }
}

// 키보드 입력 처리
let leftPressed = false;
let rightPressed = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') leftPressed = true;
    if (e.key === 'ArrowRight' || e.key === 'd') rightPressed = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') leftPressed = false;
    if (e.key === 'ArrowRight' || e.key === 'd') rightPressed = false;
});

// 공 그리기
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();

    // 공 그림자 효과
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius + 5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.3)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
}

// 패들 그리기
function drawPaddle() {
    ctx.beginPath();
    ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 5);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
}

// 블록 그리기
function drawBlocks() {
    for (let row = 0; row < blockRowCount; row++) {
        for (let col = 0; col < blockColumnCount; col++) {
            const block = blocks[row][col];
            if (block.visible) {
                ctx.beginPath();
                ctx.roundRect(block.x, block.y, blockWidth, blockHeight, 5);
                ctx.fillStyle = block.color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// 충돌 감지
function detectCollision() {
    // 벽 충돌
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }

    // 바닥 충돌 (게임 오버)
    if (ball.y + ball.dy > canvas.height - ball.radius) {
        gameOver();
        return;
    }

    // 패들 충돌
    if (ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
        // 패들 위치에 따라 공 방향 조절
        let hitPoint = (ball.x - paddle.x) / paddle.width;
        ball.dx = 8 * (hitPoint - 0.5);
    }

    // 블록 충돌
    for (let row = 0; row < blockRowCount; row++) {
        for (let col = 0; col < blockColumnCount; col++) {
            const block = blocks[row][col];
            if (block.visible) {
                if (ball.x > block.x &&
                    ball.x < block.x + blockWidth &&
                    ball.y > block.y &&
                    ball.y < block.y + blockHeight) {
                    ball.dy = -ball.dy;
                    block.visible = false;
                    score += 10;
                    document.getElementById('score').textContent = score;

                    // 모든 블록 제거 시 승리
                    checkWin();
                }
            }
        }
    }
}

// 패들 이동
function movePaddle() {
    if (leftPressed && paddle.x > 0) {
        paddle.x -= paddle.speed;
    }
    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.speed;
    }
}

// 승리 체크
function checkWin() {
    let allDestroyed = true;
    for (let row = 0; row < blockRowCount; row++) {
        for (let col = 0; col < blockColumnCount; col++) {
            if (blocks[row][col].visible) {
                allDestroyed = false;
                break;
            }
        }
    }
    if (allDestroyed) {
        gameRunning = false;
        alert('🎉 축하합니다! 승리했습니다!\n최종 점수: ' + score);
    }
}

// 게임 오버
function gameOver() {
    gameRunning = false;
    alert('💀 게임 오버!\n최종 점수: ' + score);
    location.reload();
}

// 게임 루프
function gameLoop() {
    if (!gameRunning) return;

    // 화면 지우기
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 게임 요소 그리기
    drawBlocks();
    drawBall();
    drawPaddle();

    // 게임 로직
    detectCollision();
    movePaddle();

    // 공 이동
    ball.x += ball.dx;
    ball.y += ball.dy;

    requestAnimationFrame(gameLoop);
}

// 게임 시작
gameLoop();

console.log('🎮 게임이 시작되었습니다!');
console.log('← → 또는 A, D 키로 패들을 조작하세요.');
```

## 조작 방법

- **← / A**: 왼쪽으로 이동
- **→ / D**: 오른쪽으로 이동

## TODO

- [ ] 레벨 시스템 추가
- [ ] 파워업 아이템
- [ ] 사운드 효과
- [ ] 최고 점수 저장 (LocalStorage)
- [ ] 모바일 터치 지원
