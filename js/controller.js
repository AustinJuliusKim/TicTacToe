angular
	.module('mainApp')
	.controller('TicTacToeController', TicTacToeController);

function TicTacToeController() {
	
	var self = this;
	self.test = "controller is working";
	var nextPlayer = "O";

	self.readyToPlay = readyToPlay;
	self.alternatePlay = alternatePlay;
	self.determineWinner = determineWinner;
	self.restartGameOver = restartGameOver;
	self.allThree = allThree;
	self.winnerIs = winnerIs;
	self.winsRow = winsRow;
	self.winsCol = winsCol;
	self.winsDiag = winsDiag;

	self.board = [];
	for (var i = 0 ; i < 9 ; i++) {
			self.board.push({piece : "", space: i})
	}

// Ready to Play will script an alert stating X goes first and then clears the board of placed pieces.
	function readyToPlay() {
		for (var i = 0; i < 9; i ++){
		self.board[i].piece = "";
		}	
	}
// Alternate Play will alternate between X and O. First move will be X, then O upon click.
	function alternatePlay(space) {
		var index = self.board.indexOf(space);	
		if (self.board[index].piece !== "") {
			alert("That space is occupied already");
		}
		else {
			if (nextPlayer === "O") {
				nextPlayer = "X";
			}
			else {
				nextPlayer = "O";
			}

			self.board[index].piece = nextPlayer;
			console.log("hi", self.board[index].piece);

		}
		self.determineWinner();
		
		}

	function determineWinner() {
		if (winnerIs("X")) {
			setTimeout(function(){
				alert("X wins"),500});
		}
		else if (winnerIs("O")) {
			setTimeout(function(){
				alert("O wins"),500});
		}
		else if (winnerIs("X") !== true && winnerIs("O") !== true) {
			console.log("no winner");
		}
		restartGameOver();
		
		}
	function restartGameOver() {
		if (winnerIs("X") || winnerIs("O")) {
			setTimeout(function() {
				alert("Game Over, Click to Play Again"),1000});
			for (var i = 0; i < 9; i ++){
				console.log(i);
				self.board[i].piece = "";
			};
		}
	}

	function winnerIs(player) {
		return winsRow(player) || winsCol(player) || winsDiag(player);
	}

	function allThree(player, spaceOne,spaceTwo,spaceThree) {
		return (spaceOne === player) && (spaceTwo ===player) && (spaceThree === player);
	}

	function winsRow(player, spaceOne,spaceTwo,spaceThree) {
		return  allThree(player, self.board[0].piece, self.board[1].piece, self.board[2].piece) ||
			allThree(player, self.board[3].piece, self.board[4].piece, self.board[5].piece) ||
			allThree(player, self.board[6].piece, self.board[7].piece, self.board[8].piece);
	}

	function winsCol(player, spaceOne,spaceTwo,spaceThree) {
		return allThree(player, self.board[0].piece, self.board[3].piece, self.board[6].piece) ||
			allThree(player, self.board[1].piece, self.board[4].piece, self.board[7].piece) ||
			allThree(player, self.board[2].piece, self.board[5].piece, self.board[8].piece);
	}
	
	function winsDiag(player, spaceOne,spaceTwo,spaceThree) {
		return allThree(player, self.board[0].piece, self.board[4].piece, self.board[8].piece) ||
			allThree(player, self.board[2].piece, self.board[4].piece, self.board[6].piece);
	}

}


