'use strict';

class Score {
    #date;
    #hits;
    #percentage;

    constructor(date,hits,percentage){
        this.#date = date;
        this.#hits = hits;
        this.#percentage = percentage;
    }

    get date(){
        return this.#date
    }

    get hits(){
        return this.#hits
    }

    get percentage(){
        return this.#percentage
    }
}


let countdownTimer;
function countTimeDown(countdown){ 
    wordInput.disabled = true;
    countdownTimer = setInterval(() => {
        countDownMusic.play();
        countdown--;
        wordDisplay.innerText = countdown;
        if(countdown <= 0){
            clearInterval(countdownTimer);
            wordDisplay.innerText = `GO!`;
            setTimeout(() =>{
                timer(timeLeft);
            },500);
        }
    },1000);
}
let gameTimer;
function timer(timeLeft) {
    wordDisplay.innerText = randomWord = randomizeWord(wordsCopy);
    gameTimer = setInterval(() => {
        timeDisplay.innerHTML = `${--timeLeft}`;
        wordInput.disabled = false;
        wordInput.focus();
        //bgm too short to play during the whole game,add loop to make sure it will play until the game end
        BGM.loop = true;
        BGM.play();
        if(timeLeft <= 0) {
            wordDisplay.innerText = 'Time\'s up';
            endGame();
        }
    }, 1000);
}

function validateInput(words) {
    wordInput.addEventListener('keyup',()=>{
        if(wordInput.value.trim() === randomWord) {
            const index = words.indexOf(randomWord);
            console.log(words[index]);
            words.splice(index, 1);
            wordInput.style.border = 'solid #008000';
            pointsDisplay.innerHTML = `${points += 1}`;
            wordInput.value = '';
            corretBGM.play();
            if (words.length > 0) {
                wordDisplay.innerText = randomWord = randomizeWord(wordsCopy);
            } else {
                wordDisplay.innerText = 'You Win!';
                endGame();
            }   
        } else {
            wordInput.style.border = 'solid #ff0000';
        }
    })
}

function startGame() {
    homeScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    countTimeDown(countdown);
    validateInput(wordsCopy);
}

function getScore(){
    const date = new Date();
    let percentage = (points/words.length*100).toFixed(2) + '%';
    const score = new Score(date.toDateString(),points,percentage);
    scoreArray.push(score);
    console.log(scoreArray);
}

function gameReset(){
    clearInterval(gameTimer);
    BGM.pause();            
    wordInput.disabled = true;
    timeLeft = 100;
    points = 0;
    wordInput.value = '';
    wordsCopy.push(...words);
}

function endGame(){
    getScore();
    gameReset();
    setTimeout(()=>{
        homeScreen.style.display = 'block';
        gameScreen.style.display = 'none';
        startGameBtn.innerText = 'Start Again';
        wordInput.style.border = '2px solid #ccc';
        timeDisplay.innerText = '--';
        pointsDisplay.innerText = '--';
        wordDisplay.innerText = '- - - -';
    },2000);
}

function randomizeWord(words){
    let randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

const words = [ 
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'weather',  
    'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'machine',  
    'accurate', 'rainbow', 'bicycle', 'eclipse', 'trouble', 'developer',  
    'database', 'periodic', 'fortune', 'phone', 'future', 'pasta', 'microwave',  
    'jungle', 'wallet', 'canada', 'velvet', 'potion', 'treasure', 'beacon',  
    'whisper', 'breeze', 'coffee', 'beauty', 'agency', 'chocolate', 'eleven',  
    'alphabet', 'magician', 'triangle', 'baseball', 'beyond', 'banana', 'perfume', 
    'computer', 'butterfly', 'music', 'eagle', 'crown', 'chess', 'laptop',  
    'bedroom', 'enemy', 'button', 'door', 'bird', 'superman', 'library',  
    'bookstore', 'language', 'homework', 'beach', 'economy', 'awesome',  
    'science', 'mystery', 'famous', 'league', 'memory', 'leather', 'planet',  
    'software', 'update', 'yellow', 'keyboard', 'window', 'beans', 'truck',  
    'sheep', 'blossom', 'secret', 'wonder', 'destiny', 'quest', 'download',  
    'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'audio', 'school',  
    'detective', 'hero', 'progress', 'winter', 'passion', 'rebel', 'amber',  
    'jacket', 'article', 'paradox', 'social', 'resort', 'mask', 'escape',  
    'promise', 'band', 'level', 'hope', 'moonlight', 'media', 'orchestra',  
    'volcano', 'guitar', 'raindrop', 'diamond', 'illusion', 'firefly', 'ocean',  
    'cascade', 'journey', 'laughter', 'horizon', 'marvel', 'compiler', 'twilight',  
    'harmony', 'symphony', 'solitude', 'essence', 'forest', 'melody',  
    'vision', 'silence', 'eternity', 'embrace', 'poet', 'ricochet', 'mountain',  
    'dance', 'sunrise', 'dragon', 'adventure', 'galaxy', 'echo', 'fantasy',  
    'radiant', 'mermaid', 'legend', 'monitor', 'plastic', 'pressure', 'bread',  
    'cake', 'caramel', 'juice', 'mouse', 'charger', 'pillow', 'candle', 'sunset',  
    'farmer', 'garden', 'whistle', 'blanket', 'picnic', 'sweater', 'lantern',  
    'theater', 'traffic', 'website', 'courage', 'shelter', 'painter', 'twinkle',  
    'squeeze', 'forever', 'stadium', 'gourmet', 'flower', 'bravery', 'playful',  
    'captain', 'vibrant', 'damage', 'outlet', 'general', 'batman', 'enigma',  
    'storm', 'universe', 'engine', 'mistake', 'hurricane' 
]; 

//const words = [ 'dinosaur','robot', 'building'];
const wordsCopy = [...words];
const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const startGameBtn = document.getElementById("start-game-btn");
const wordDisplay = document.getElementById("word-display");
const timeDisplay = document.getElementById("timer");
const pointsDisplay = document.getElementById("score");
const wordInput = document.getElementById("word-input");
const reStartBtn = document.getElementById("restart-btn");
const countDownMusic = new Audio('./assets/BGM/321.wav');
const BGM = new Audio('./assets/BGM/bgm.wav');
const corretBGM = new Audio('./assets/BGM/correct-choice.wav');
const scoreArray = [];


let timeLeft = 100;
let countdown = 4;
let points = 0;
let randomWord = '';
wordInput.value = '';
wordInput.disabled = true;



startGameBtn.addEventListener('click', ()=>{
    startGame();
});

reStartBtn.addEventListener('click', ()=>{
    clearInterval(countdownTimer);
    countDownMusic.pause();
    countDownMusic.currentTime = 0;
    gameReset();
    wordInput.style.border = '2px solid #ccc';
    timeDisplay.innerText = '--';
    pointsDisplay.innerText = '--';
    wordDisplay.innerText = '- - - -';
    startGame();
});
