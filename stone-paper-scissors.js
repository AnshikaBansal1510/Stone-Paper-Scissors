//let computerMove = '';    // global variables

// const score = {
//   wins: 0,
//   losses: 0,
//   ties: 0
// };

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};  

// when we reload the page it will load the score from local storage

// if(score === null){
//   score = {
//     wins: 0,
//     losses: 0,
//     ties: 0
//   };
// }

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay(){

  if(!isAutoPlaying){

    intervalId = setInterval(function(){
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  } else {
    
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function playGame(playerMove){

  const computerMove = pickComputerMove();

  let result = '';

  if(playerMove === 'stone'){

    if(computerMove === 'stone') {
      result = 'Tie.';
    } else if(computerMove === 'paper'){
      result = 'You lose.';
    } else {
      result = 'You win.';
    }
  }

  else if(playerMove === 'paper'){

    if(computerMove === 'stone') {
      result = 'You win.';
    } else if(computerMove === 'paper'){
      result = 'Tie.';
    } else {
      result = 'You lose.';
    }
  }

  else if(playerMove === 'scissors'){

    if(computerMove === 'stone') {
      result = 'You lose.';
    } else if(computerMove === 'paper'){
      result = 'You win.';
    } else {
      result = 'Tie.';
    }
  }

  if(result === 'You lose.')    score.losses += 1;

  else if(result === 'You win.')  score.wins += 1;

  else    score.ties++;

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;
  
  document.querySelector('.js-moves')
    .innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){

  const randomNumber = Math.random();

  let computerMove = '';

  if(randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'stone';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}