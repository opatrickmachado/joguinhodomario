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
    if ((event.keyCode === 32 || event.type === "touchstart") && !hasJumped) {
        event.preventDefault(); 
        mario.classList.add('jump');
        hasJumped = true;

        setTimeout(() => {
            mario.classList.remove('jump');
            hasJumped = false;
        }, 500); // Aumentando o tempo de pulo para 500ms
    }
}

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump, {passive: false}); // Adiciona suporte a touch e permite prevenir o comportamento padrão

let pipeSpeed = 1.5; 
let pipeWidth = 80;

function updatePipeAnimation(duration, width) {
    let animationRule = `pipe-animation ${duration}s infinite linear`;
    pipe.style.animation = animationRule;
    pipe.style.width = `${width}px`;
}

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

        if (jumpCount % 5 === 0) {
            pipeSpeed = Math.max(0.5, pipeSpeed - 0.05); // A velocidade nunca será inferior a 0.5s
            pipeWidth = Math.max(50, pipeWidth - 2); // A largura nunca será menor que 50px
            updatePipeAnimation(pipeSpeed, pipeWidth);
        }

        if (jumpCount > highScore) {
            highScore = jumpCount;
            localStorage.setItem('highScore', highScore.toString());
            highScoreDisplay.innerText = `Recorde: ${highScore}`;
        }
    }

}, 10);

restartButton.addEventListener('click', () => {
    location.reload();
    pipe.style.width = '80px'; // Resetando o tamanho do cano
    pipeSpeed = 1.5; // Resetando a velocidade do cano
    updatePipeAnimation(pipeSpeed, pipeWidth);
});
