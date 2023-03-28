const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const counterToStartGame = document.getElementById('counterToStartGame');

let counter = 6;
// Count Down for the user to start playing
window.addEventListener("DOMContentLoaded", () => {
   text.style.display = 'none'
   const countersInterval = setInterval(() => {
        
         counter--;
        
        if (counter === 0){
            clearInterval(countersInterval);
            text.style.display = 'inline-block'
            text.focus();

        }
        counterToStartGame.textContent = `Ready in ${counter}`; 
    }, 1000);
    
})

   
//Random word API




// List of words for Game

const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike', 
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving',
    'basketball',
    'game',
    'city',
    'seattle',
    'Gonzaga',
    'NBA',
    'screens',
    'laptop',
    'faces',
    'groups',
    'parents',
    'Ramadan',
    'Islam',
    'muslims',
    'kenya'
];

// Init word
let randomWord;

//Int score
let score = 0;

//Init time
let time = 10;

// Difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';



//Start counting down
const timeInterval = setInterval(updateTime, 1000);


// Genarate Random word from array
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to Dom
function addWordToDOm(){
    randomWord = getRandomWord();

    word.innerHTML = randomWord;
}


function updateScore(){
    score++;
    scoreEl.innerHTML = score;

}

//Game over, show end screens
function gameOver(){
    endgameEl.innerHTML = `
        <h1>Time ran out!</h1>
        <P>Your final score is ${score}</p>
        <button class="relode" onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';

   text.style.display = 'none';
   word.style.display = 'none';
}


// Update TIme
function updateTime(){

   setTimeout(() => {
    
    timeInterval;
    time--;
}, 5000)
    
    timeEl.innerHTML = time + 's';

    if(time <= 0){
        clearInterval(timeInterval);

        
        //End game 
        gameOver();
    }
}
addWordToDOm();


// Event Listeners

// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value

        if (insertedText === randomWord){
            addWordToDOm();
            updateScore();

            // Clear
            e.target.value = '';

            if(difficulty === 'hard'){
                time += 2;
            }else if (difficulty === 'medium'){
                time += 3;
            }else {
                time += 5;
            }

            updateTime();
        }
    
})

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;

        localStorage.setItem('difficulty', difficulty)
    console.log(difficulty)
})