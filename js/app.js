const startOverlay = document.getElementById('overlay');
const phraseUl = document.querySelector('#phrase ul');
const qwerty = document.getElementById('qwerty');
const scoreboard = document.querySelector('#scoreboard ol');

const startBtn = document.querySelector('.btn__reset');

const phrases = [
    'BREAK A LEG',
    'DIME A DOZEN',
    'RAINING CATS AND DOGS',
    'ONCE IN A BLUE MOON',
    'PENNY FOR YOUR THOUGHTS'
]

let missed = 0;

// Return random phrase from phrases array.
function getRandomPhraseAsArray() {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    return randomPhrase;
}

// Return a random phrase and add to HTML.
function addPhraseToDisplay() {
    let getPhrase = getRandomPhraseAsArray();
    let splitPhrase = getPhrase.split('');
    for (let i = 0; i < splitPhrase.length; i++) {
        let createLi = document.createElement('li');
        let eachLetter = splitPhrase[i];
        createLi.textContent = eachLetter;
        phraseUl.appendChild(createLi);
        if (splitPhrase[i].trim() === '') {
            createLi.className = 'space';
        } else {
            createLi.className = 'letter';
        }
    }
    return phraseUl;
}

// Check for letter-phrase match based on button key clicked.
function checkLetter(buttonKey) {
    let allLi = document.querySelectorAll('#phrase li');
    let match = '';
    for (let i = 0; i < allLi.length; i++) {
        let eachLi = allLi[i].textContent.toLowerCase();
        if (eachLi.includes(buttonKey)) {
            allLi[i].classList.add('show');
            allLi[i].style.transition = "all 1s";
            match += buttonKey;
        }
    }
    return match;
}

// Track game results - win or lose.
function checkWin() {
    let letter = document.querySelectorAll('li.letter');
    let show = document.querySelectorAll('li.show');
    let startOverlayTitle = document.querySelector('.title');
    if (letter.length === show.length) {
        startOverlay.classList.add('win');
        startOverlayTitle.textContent = 'You Win!';
        startBtn.textContent = 'Restart Game';
        startOverlay.style.display = 'flex';
    } else if (missed > 4) {
        startOverlay.classList.add('lose');
        startOverlayTitle.textContent = 'You Lost!';
        startBtn.textContent = 'Restart Game';
        startOverlay.style.display = 'flex';
    }
}

// Button to start the game.
startBtn.addEventListener('click', () => {
    startOverlay.style.display = 'none';
    let startOverlayClass = startOverlay.className;
    if (startOverlayClass.includes('win') || startOverlayClass.includes('lose')) {
        location.reload();
    }
    addPhraseToDisplay();
});

// On screen keyboard listener.
qwerty.addEventListener('click', (e) => {
    let key = e.target;
    let keyLetter = key.textContent;
    if (key.tagName === 'BUTTON' && key.className !== 'chosen'){
        key.className = 'chosen';
        let checkLetterFunc = checkLetter(keyLetter);
        if (checkLetterFunc === '') {
            missed++;
            scoreboard.firstElementChild.remove();
            let lostHeart = document.createElement('li')
            let lostHeartImg = `<img src="images/lostHeart.png" height="35px" width="30px">`;
            lostHeart.className = 'tries';
            lostHeart.innerHTML = lostHeartImg;
            scoreboard.appendChild(lostHeart);
        }
    }
    checkWin();
});