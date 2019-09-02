const game = () => {
    let plyScore = 0;
    let compScore = 0;

    // Start the game
    const startGame = () => {
        const startBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const duelScreen = document.querySelector('.duel');
        const scoreScreen = document.querySelector('.score');


        startBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            duelScreen.classList.add('fadeIn');
            scoreScreen.classList.add('fadeIn');
        });
    }

    // Duel
    const playDuel = () => {
        // Get all three buttons
        const options = document.querySelectorAll('.options button');
        // Get player hand
        const playerHand = document.querySelector('.player-hand');
        // Get computer hand
        const computerHand = document.querySelector('.computer-hand');
        // Computer Options
        const computerOptions = ['rock', 'paper', 'scissors'];
        // Get both hands
        const hands = document.querySelectorAll('.hands img');

        // When animation ends, clear the animation, so it can be added again and again...
        hands.forEach(hand => {
            hand.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        });
        
        // Loop through buttons and listen to Click
        options.forEach((option) => {
            option.addEventListener('click', function() {
                // Computer Choice
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];

                // Update Images to Rocks
                playerHand.src = `img/rock.png`;
                computerHand.src = `img/rock.png`;

                // wait for Hand Animation to finish (after 1s)
                setTimeout(() => {
                    // Call compareHands(change text and increment plyScore, compScore)
                    compareHands(this.textContent, computerChoice);
                    // Update Score
                    updateScore();

                    // Update Images
                    playerHand.src = `img/${this.textContent}.png`;
                    computerHand.src = `img/${computerChoice}.png`;
                }, 1000)

                // Hand animation
                computerHand.style.animation = 'shakeComputer 1s ease';
                playerHand.style.animation = 'shakePlayer 1s ease';
            });
        });
    }

    const updateScore = () => {
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p');

        playerScore.textContent = plyScore;
        computerScore.textContent = compScore;
    }

    const compareHands = (playerChoice, computerChoice) => {
        // Update text
        const winner = document.querySelector('.winner');
        // Check for a tie
        if(playerChoice === computerChoice) {
            winner.textContent = `It is a draw!`;
            return;
        }
        // Check for a Rock
        if(playerChoice === 'rock') {
            if(computerChoice === 'scissors') {
                winner.textContent = `Player Wins!`;
                plyScore++;
                return;
            } else {
                winner.textContent = `Computer Wins!`;
                compScore++;
                return;
            }
        }
        // Check for a Paper
        if(playerChoice === 'paper') {
            if(computerChoice === 'scissors') {
                winner.textContent = `Computer Wins!`;
                compScore++;
                return;
            } else {
                winner.textContent = `Player Wins!`;
                plyScore++;
                return;
            }
        }
        // Check for a Scissors
        if(playerChoice === 'scissors') {
            if(computerChoice === 'paper') {
                winner.textContent = `Player Wins!`;
                plyScore++;
                return;
            } else {
                winner.textContent = `Computer Wins!`;
                compScore++;
                return;
            }
        }
    }

    // Call all inner functions
    startGame();
    playDuel();
}

game();