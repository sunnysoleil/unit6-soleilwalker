const startOverlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseUl = document.querySelector('#phrase ul');
let scoreboard = document.querySelector('#scoreboard ol');

const startBtn = document.querySelector('.btn__reset');

let missed = 0;

const phrases = [
    'BREAK A LEG',
    'DIME A DOZEN',
    'RAINING CATS AND DOGS',
    'ONCE IN A BLUE MOON',
    'PENNY FOR YOUR THOUGHTS'
]

let getPhrase = '';

// Return random phrase from phrases array.
function getRandomPhraseAsArray() {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    return randomPhrase;
}

//Return a random phrase and add to HTML.
function addPhraseToDisplay() {
    getPhrase += getRandomPhraseAsArray();
    let splitPhrase = getPhrase.split('');
    const phraseUl = document.querySelector('#phrase ul');
    for (let i = 0; i < splitPhrase.length; i++) {
        let eachLetter = splitPhrase[i];
        let createLi = document.createElement('li');
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

function checkLetter(buttonKey) {
    let eachLi = document.querySelectorAll('#phrase li');

    let match = '';

    for (let i = 0; i < eachLi.length; i++) {
        let eachLiLetter = eachLi[i].textContent.toLowerCase();

        if (eachLiLetter.includes(buttonKey)) {
            eachLi[i].classList.add('show');
            match += buttonKey;
        }
    }
    return match;
}

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
    let keyTag = key.tagName;
    let keyLetter = key.textContent;
    let keyClass = key.className;

    if (keyTag === 'BUTTON' && keyClass !== 'chosen'){
        key.className = 'chosen';
        let checkFunc = checkLetter(keyLetter);
        let scoreboardHearts = scoreboard.firstElementChild;

        if (checkFunc === '') {
            missed++;
            scoreboardHearts.remove();
            let lostHeart = document.createElement('li')
            let lostHeartImg = `<img src="images/lostHeart.png" height="35px" width="30px">`;
            lostHeart.className = 'tries';
            lostHeart.innerHTML = lostHeartImg;
            scoreboard.appendChild(lostHeart);
        }
    }
    checkWin();
});