let playerChoice;
let computerChoice;
let countdown;

const choices = ['rock', 'paper', 'scissors'];

function startGame() 
{
  document.getElementById('options').classList.remove('hidden');
  document.getElementById('result').innerText = 'Make your move!';
  playerChoice = null;
  computerChoice = null;
  resetTimer();

  if (!document.getElementById('options').classList.contains('hidden')) 
  {
    // Show options, start countdown only if options are visible
    countdown = setInterval(() => 
    {
      const timerElement = document.getElementById('timer');
      const timeLeft = parseInt(timerElement.innerText) || 0;
      if (timeLeft > 0) 
      {
        timerElement.innerText = timeLeft - 1;
      } 
      else 
      {
        clearInterval(countdown);
        hideOptions(); // Hide options when the timer reaches zero
        if (!playerChoice) 
        {
          displayResult("You haven't chosen a move.");
          setTimeout(() => 
          {
            showOptions(); // Show options after a 1-second delay
            document.getElementById('result').innerText = 'Make your move!';
          }, 1000);
        }
        else 
        {
          displayResult('You didn\'t make a move. Play again!');
        }
      }
    }, 1000);
  }

  setTimeout(() => 
  {
    clearInterval(countdown);
    if (!playerChoice) 
    {
      hideOptions(); // Hide options when the timer is over and no move is made
      displayResult("You haven't chosen a move.");
      setTimeout(() => 
      {
        hideOptions(); // Show options after a 1-second delay
        document.getElementById('result').innerText = 'Play Again!';
      }, 2000);
    }
    // No need to call playGame here, as it will be called by the countdown
  }, 3000);
}

function playGame(choice) 
{
  clearInterval(countdown); // Clear the countdown timer

  if (choice) 
  {
    playerChoice = choice;
    document.getElementById('options').classList.add(`${playerChoice}-animation`);
    setTimeout(() => 
    {
      document.getElementById('options').classList.remove(`${playerChoice}-animation`);
      hideOptions(); // Hide options after the animation
      determineWinnerAndDisplayResult();
    }, 1000); // 1 second is the duration of the animation

    // Computer makes a choice
    computerChoice = choices[Math.floor(Math.random() * 3)];
  } 
  else 
  {
    // If choice is not provided, set it to a random value
    playerChoice = choices[Math.floor(Math.random() * 3)];
    document.getElementById('options').classList.add(`${playerChoice}-animation`);
    setTimeout(() => 
    {
      document.getElementById('options').classList.remove(`${playerChoice}-animation`);
      hideOptions(); // Hide options after the animation
      determineWinnerAndDisplayResult();
    }, 1000);

    // Computer makes a choice
    computerChoice = choices[Math.floor(Math.random() * 3)];
  }
}

function determineWinnerAndDisplayResult() 
{
  document.getElementById('result').innerText = `You chose ${playerChoice}. Computer chose ${computerChoice}. ${determineWinner(playerChoice, computerChoice)}`;
  // Display the result
  resetTimer(); // Reset the timer after each move
}

function determineWinner(player, computer) 
{
  if (player === computer) 
  {
    return 'It\'s a tie!';
  }

  if ((player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')) 
  {
    return 'You win!';
  } 
  else 
  {
    return 'You lose!';
  }
}

function hideOptions() 
{
  document.getElementById('options').classList.add('hidden');
}

function showOptions() 
{
  document.getElementById('options').classList.remove('hidden');
}

function displayResult(message) 
{
  document.getElementById('result').innerText = message;
}

function resetTimer() 
{
  clearInterval(countdown);
  document.getElementById('timer').innerText = '3';
}