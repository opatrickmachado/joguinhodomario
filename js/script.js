let jumpCount = 0;
let hasJumped = false;
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const counter = document.getElementById('jump-counter');
const restartButton = document.getElementById('restart-button');

let highScore = Number(localStorage.getItem('highScore')) || 0;
const highScoreDisplay = document.getElementById('high-score');

highScoreDisplay.innerText = `Recorde: ${highScore}`;

const jump = (event) => {
    if (event.keyCode === 32 && !hasJumped) {
        mario.classList.add('jump');
        hasJumped = true;

        setTimeout(() => {
            mario.classList.remove('jump');
            hasJumped = false;
        }, 500);
    }
}

document.addEventListener('keydown', jump);

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        restartButton.style.display = 'block';
        clearInterval(loop);

        if (jumpCount > highScore) {
            highScore = jumpCount;
            localStorage.setItem('highScore', highScore.toString());
            highScoreDisplay.innerText = `Recorde: ${highScore}`;
        }
    }

    if (pipePosition < mario.offsetWidth && hasJumped) {
        jumpCount += 1;
        counter.innerText = `Pulos: ${jumpCount}`;
        hasJumped = false;

        if (jumpCount > highScore) {
            highScore = jumpCount;
            localStorage.setItem('highScore', highScore.toString());
            highScoreDisplay.innerText = `Recorde: ${highScore}`;
        }
    }

}, 10);

restartButton.addEventListener('click', () => {
    location.reload();
});
