//Game Values
let min = 1,
	max = 10,
	winningNum = getRandomNum(min, max),
	geussesLeft = 3;

//UI Elements
const game = document.getElementById("game"),
	minNum = document.querySelector(".min-num"),
	maxNum = document.querySelector(".max-num"),
	guessBtn = document.getElementById("guess-btn"),
	guessInput = document.getElementById("guess-input"),
	message = document.querySelector(".message");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener("mousedown", function (e) {
	if (e.target.className === "play-again") {
		window.location.reload();
	}
});

//Listen for Guess
guessBtn.addEventListener("click", function () {
	let guess = parseInt(guessInput.value);

	//Validate Input
	if (isNaN(guess) || guess > max || guess < min) {
		setMessage(`Please enter a number between ${min} and ${max}!`, "red");
	} else {
		//Check if won
		if (guess === winningNum) {
			//disable input
			gameOver(true, `${winningNum} is correct. YOU WIN`);
		} else {
			//Wrong number
			geussesLeft--;
			console.log(geussesLeft);

			if (geussesLeft === 0) {
				//Lost
				gameOver(false, `Game Over, LOSER! It was ${winningNum}...`);
			} else {
				//Next Turn
				guessInput.style.borderColor = "orange";
				guessInput.value = "";
				setMessage(`${guess} is wrong! You have ${geussesLeft} guesses left.`, "orange");
			}
		}
	}
});

function gameOver(won, msg) {
	let color;
	won === true ? (color = "green") : (color = "red");
	guessInput.disabled = true;
	guessInput.style.borderColor = "green";
	setMessage(msg, color);
	guessBtn.value = "Play Again";
	guessBtn.className = "play-again";
}

function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}

function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
