let jumpCount = 0;
let hasJumped = false;
let hasDucked = false;
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const counter = document.getElementById('jump-counter');
const restartButton = document.getElementById('restart-button');

let highScore = Number(localStorage.getItem('highScore')) || 0;
const highScoreDisplay = document.getElementById('high-score');

highScoreDisplay.innerText = `Recorde: ${highScore}`;

const jump = (event) => {
    if (!hasJumped) {
        event.preventDefault(); 
        mario.classList.add('jump');
        hasJumped = true;

        setTimeout(() => {
            mario.classList.remove('jump');
            hasJumped = false;
        }, 400);
    }
}

const duck = (event) => {
    if (!hasDucked) {
        event.preventDefault(); 
        mario.classList.add('duck');

        setTimeout(() => {
            mario.classList.remove('duck');
            hasDucked = false;
        }, 500);
    }
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 32) {
        jump(event);
    } else if (event.keyCode === 40) {
        duck(event);
    }
});

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump, {passive: false});

let pipeSpeed = 1.5; 
let pipeWidth = 80;

function updatePipeAnimation(duration, width) {
    let animationRule = `pipe-animation ${duration}s infinite linear`;
    pipe.style.animation = animationRule;
    pipe.style.width = `${width}px`;
}

function randomIntFromInterval(min, max) { // nova função
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const loop = () => {
    const gameInterval = setInterval(() => {
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        document.querySelectorAll('.pipe').forEach(pipe => {
            const pipePosition = pipe.offsetLeft;

            if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
                updateRanking(jumpCount);
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

                mario.style.animation = 'none';
                mario.style.bottom = `${marioPosition}px`;

                mario.src = './images/game-over.png';
                mario.style.width = '75px';
                mario.style.marginLeft = '50px';

                restartButton.style.display = 'block';
                clearInterval(gameInterval);

                // Aqui adicionamos a música de morte
                const deathMusic = document.getElementById('death-music');
                backgroundMusic.pause();
                deathMusic.play();

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
        });
    }, 10);
    return gameInterval;
}

let game = loop();

// Iniciar a reprodução da música quando o jogo começar
function startGame() {
    backgroundMusic.play();
}

// Pausar a reprodução da música quando o jogador morrer
function playerDies() {
    backgroundMusic.pause();
}

restartButton.addEventListener('click', () => {
        // Reset variables
        jumpCount = 0;
        hasJumped = false;
        hasDucked = false;
        
        location.reload();
        pipe.style.width = '80px';
        pipeSpeed = 1.5;
        updatePipeAnimation(pipeSpeed, pipeWidth);
        // Iniciar nova instância do jogo
        game = loop();
    });
    
    const backgroundMusic = document.getElementById('background-music');
    // Adicionamos um listener para quando a página terminar de carregar
    window.addEventListener('load', (event) => {
        backgroundMusic.play();
    });
    
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    
    function updateRanking(score) {
        ranking.push(score);
        // Ordena o ranking em ordem decrescente
        ranking.sort((a, b) => b - a);
        // Mantém apenas os 5 melhores resultados
        ranking = ranking.slice(0, 5);
        localStorage.setItem('ranking', JSON.stringify(ranking));
    
        // Atualiza a exibição do ranking
        const rankingDisplay = document.getElementById('ranking');
        rankingDisplay.innerHTML = 'Ranking:<br>' + ranking.map((score, i) => `#${i+1}: ${score}`).join('<br>');
    }
    
    updateRanking(0);
    