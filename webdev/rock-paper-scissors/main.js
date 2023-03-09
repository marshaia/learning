import './style.css';

var scoreBoard = { // GAME SCOREBOARD 
  player: 0,
  bot: 0,
};

readScoreBoard()

const results = [  // POSSIBLE RESULTS
  [0,-1,1],
  [1,0,-1],
  [-1,1,0]
]

const images = {  // STOCK PHOTOS 
  'rock' : "https://images.emojiterra.com/twitter/v14.0/512px/1faa8.png",
  'paper' : "https://images.emojiterra.com/twitter/v14.0/512px/1f4c3.png",
  'scissors' : "https://images.emojiterra.com/twitter/v14.0/512px/2702.png",
  'loading' : "https://tenor.com/view/loading-response-gif-14715020" ,  // not used
}



// Main Function
function playGame(selectedButton) {

  let bot = Math.floor(Math.random() * 3)
  let player

  switch(selectedButton.target.id) {
    case 'rock':
      player = 0;
      break;
    case 'paper':
      player = 1;
      break;
    case 'scissors':
      player = 2;
      break;
  }

  updateImage(0,player) 
  updateImage(1,bot)  // Still have to do a 'loading' image 
                      // so it wont be so fast

  let result = results[player][bot]  // MATCH RESULT

  
  if (result === 0) {        // DRAW
    setMessage('! DRAW !')
  }
  else if (result === 1) {  // PLAYER WON
    alterWinner(0)  
    updateScoreBoard(0)
    setMessage('! PLAYER WON !')
  }
  else {                    // BOT WON
    alterWinner(1)             
    updateScoreBoard(1)
    setMessage('! BOT WON !')
  }
}


// Alters the background color of the score board depending on who won
function alterWinner(winner) {  // winner: 0 - Player ; 1 - Bot
  if (winner == 0) {
    document.getElementById('player-score-container').setAttribute('style','background-color:green')
    document.getElementById('computer-score-container').setAttribute('style','background-color:#f5f5f5')
  }
  else {
    document.getElementById('player-score-container').setAttribute('style','background-color:#f5f5f5')
    document.getElementById('computer-score-container').setAttribute('style','background-color:green')
  }
}


// Updates the score board or resets
function updateScoreBoard(whoWon, mode = 1) {  // whoWon: 0 - Player ; 1 - Bot

  if (mode === 0) {     // mode: 0 - Reset Score Board
    scoreBoard.player = 0
    scoreBoard.bot = 0    
  }       
                            
  else if (whoWon === 0) scoreBoard.player += 1  // Update Score Board
  else scoreBoard.bot += 1
  
  document.getElementById('player-score').innerText = scoreBoard.player
  document.getElementById('computer-score').innerText = scoreBoard.bot

  localStorage.setItem('scoreboard',scoreBoard.player+'-'+scoreBoard.bot)
}


// Sets the message to be displayed
function setMessage(text) {
  document.getElementsByClassName('message')[0].innerText = text
}


// Resets de Game
function resetGame() {
  updateScoreBoard(1,0)
  setMessage('')
  document.getElementById('player-img').setAttribute('src','')
  document.getElementById('computer-img').setAttribute('src','')
  document.getElementById('player-score-container').setAttribute('style','background-color:#f5f5f5')
  document.getElementById('computer-score-container').setAttribute('style','background-color:#f5f5f5')
}


// Updates the image according to what was chosen by both player and computer
function updateImage(whoChose,num) { // WhoChose: 0 - Player; 1 - Bot
  let img = ""
  if (num == 0) img = images.rock
  else if (num == 1) img = images.paper
  else img = images.scissors

  if (whoChose == 0) document.getElementById('player-img').setAttribute('src',img)
  else document.getElementById('computer-img').setAttribute('src',img)
}



function readScoreBoard() {
  if (localStorage.getItem('scoreboard')) {
    let scorer = localStorage.getItem('scoreboard').split("-")
    scoreBoard.player = parseInt(scorer[0])
    scoreBoard.bot = parseInt(scorer[1]) - 1
    updateScoreBoard(1)
  }
}


document.querySelectorAll('button').forEach((e) => {
  if (e.id === 'reset') e.addEventListener('click',resetGame)
  else e.addEventListener('click', playGame);
});
