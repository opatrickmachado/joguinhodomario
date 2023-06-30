let jumpCount = 0;
let hasJumped = false;
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const counter = document.getElementById('jump-counter');
const restartButton = document.getElementById('restart-button'); // novo

const jump = () => {
    mario.classList.add('jump');
    hasJumped = true;

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
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

        restartButton.style.display = 'block'; // novo
        clearInterval(loop);
    }

    if (pipePosition < mario.offsetWidth && hasJumped) {
        jumpCount += 1;
        counter.innerText = `Pulos: ${jumpCount}`;
        hasJumped = false;
    }

}, 10);

document.addEventListener('keydown', jump);

// novo
restartButton.addEventListener('click', () => {
    location.reload();
});
