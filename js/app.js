const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseUl = document.querySelector('#phrase ul');

const startBtn = document.querySelector('.btn__reset');

let missed = 0;

const phrases = [
    'BREAK A LEG',
    'DIME A DOZEN',
    'RAINING CATS AND DOGS',
    'ONCE IN A BLUE MOON',
    'PENNY FOR YOUR THOUGHTS'
]


// Return random phrase from phrases array.
function getRandomPhraseAsArray() {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    return randomPhrase;
}

//Return a random phrase and add to HTML.
function addPhraseToDisplay() {
    let getPhrase = getRandomPhraseAsArray();
    let splitPhrase = getPhrase.split('');
    const phraseUl = document.querySelector('#phrase ul');
    for (let i = 0; i < splitPhrase.length; i++) {
        let le = splitPhrase[i];
        let createLi = document.createElement('li');
        createLi.textContent = le;
        phraseUl.appendChild(createLi);
        if (splitPhrase[i].trim() === '') {
            createLi.className = 'space';
        } else {
            createLi.className = 'letter';
        }
    }
    return phraseUl;
}

// Button to start the game.
startBtn.addEventListener('click', () => {
    const startOverlay = document.getElementById('overlay');
    startOverlay.style.display = 'none';
    addPhraseToDisplay();
});