const toMatchWord = document.getElementById('toMatchWord');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const counterToStartGame = document.getElementById('counterToStartGame');
const userNameInput = document.getElementById('username');
const avatar = document.querySelectorAll('.emojis')
const outputEmoji = document.getElementById('output-emoji');
const modalSubmitBtn = document.getElementById('submitModalBtn');


let apiWordPromise = null;
let nextWordPromise = null;

async function getWordsApi(){
    if (!apiWordPromise){
        apiWordPromise = fetch('https://random-word-api.herokuapp.com/word')
                            .then(res => {
                                if(res.ok){
                                    return res.json();
                                }else {
                                    throw new Error("Error");
                                }
                            })
                            .then(data => {
                                apiWordPromise = null;
                                return data
                            })
                            .catch(error => {
                                console.log("Error fetching api: ", error);
                            });
    }
    return apiWordPromise;

    // return fetch('https://random-word-api.herokuapp.com/word')
    //         .then(res => {
    //             if(res.ok){
    //                 return res.json();
    //             }else {
    //                 throw new Error("Error")
    //             }
    //         })
    //         .then(data => {
    //             return data
    //         })
    //         .catch(error => {
    //             console.log("Error fetching api: ", error);
    //         })
}

function prefetchNextWord(){
    if(!nextWordPromise){
        nextWordPromise = fetch("https://random-word-api.herokuapp.com/word")
                                .then(res => {
                                    if (res.ok){
                                        return res.json();
                                    }else {
                                        throw new Error("Error");
                                    }
                                })
                                .then(data => {
                                    nextWordPromise = null;
                                    return data;
                                })
                                .catch(error => {
                                    nextWordPromise = null;
                                    console.log("Error fetching next Word: ", error)
                                })
    }
    return nextWordPromise;
}


async function addWordToDom(){
    try{
        const apiWord = await getWordsApi();
        toMatchWord.innerHTML = apiWord[0];
        console.log("Added word to DOM: ", apiWord)

        text.addEventListener('input', e => {
            const insertedText = e.target.value
    

            if (insertedText.trim().toLowerCase() === apiWord[0].toLowerCase()){
                addWordToDom();
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
            prefetchNextWord();
    })
        return apiWord;
    } catch(error) {
        console.log("Error feting api: ", error)
    }
    
}

















const matchWord = addWordToDom();




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
    if(time <= 5){
        timeEl.style.color = 'red'
    }else {
        timeEl.style.color = '';
    }
}

//Modal submit Button
modalSubmitBtn.addEventListener('click', () => {
    const usersName = getUsername();
    document.getElementById('user-name').textContent = usersName;
    
});


//Modal container
function selectAvatar(){
    avatar.forEach(avatar => {
        avatar.addEventListener('click', (e) => {
            const selectedEmoji = e.target.innerHTML;
            

            outputEmoji.innerHTML = selectedEmoji;
            outputEmoji.style.fontSize = '2.5rem'
            
        })
    })

}


//Update username
function getUsername(){
    const user = userNameInput.value;

}

let counter = 6;
// Count Down for the user to start playing
window.addEventListener("DOMContentLoaded", () => {
   
   counterToStartGame.classList.add('scale')
   text.style.display = 'none'
   const countersInterval = setInterval(() => {
        
         counter--;
        
        if (counter === 0){
            clearInterval(countersInterval);
            text.style.display = 'inline-block'
            text.focus();
            counterToStartGame.classList.remove('scale');
        }
        counterToStartGame.textContent = `Ready in ${counter}`; 
    }, 1000);
    
})


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


// Add word to Dom
// function addWordToDOm(){
//             getWordsApi()
//                 .then(wordData => {
//                 if(word){
//                     return word.innerHTML = wordData;
//                 }else {
//                     console.log("Element with id 'word' not found");
//                 }
                    
//                 })
//                 .catch(error => {
//                     console.log("Error adding word to Dom: ", error)
//                 })
// }

function updateScore(){
    score++;
    scoreEl.innerHTML = score;

}

//Game over, show end screens
function gameOver(){
    let greatJob = 'Wow Nice Job!!';
    let betterLuck = 'not so great try again.';
    endgameEl.innerHTML = `
        <h1>Time ran out!</h1>
        <P>Your final score is ${score}, ${score > 10 ? greatJob : betterLuck}</p>
        <button class="relode" onClick="relodeGame()">Reload</button>
    `;
    
    

    endgameEl.style.display = 'flex';

   text.style.display = 'none';
   toMatchWord.style.display = 'none';
}



// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;

    localStorage.setItem('difficulty', difficulty)
    
})
const modal = document.querySelector('.modal-container')

window.addEventListener('click', (e) => {
    if (e.target === modal){
        modal.style.display = 'none';
    }

    
})