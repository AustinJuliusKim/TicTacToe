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

	self.allThree = allThree;
	self.winnerIs = winnerIs;
	self.winsRow = winsRow;
	self.winsCol = winsCol;
	self.winsDiag = winsDiag;

	self.gameBoard = [];
	for (var i = 0 ; i < 9 ; i++) {
			self.gameBoard.push({piece : ""})
	}

// Ready to Play will script an alert stating X goes first and then clears the board of placed pieces.
	function readyToPlay() {
		setTimeout(function() {
			alert("X goes first"), 400
		})
		for (var i = 0; i < 9; i ++){
		self.gameBoard[i].piece = "";
		}	
	}
// Alternate Play will alternate between X and O. First move will be X, then O upon click.
	function alternatePlay(space) {
		var index = self.gameBoard.indexOf(space);	
		if (self.gameBoard[index].piece !== "") {
			alert("That space is occupied already");
		}
		else {
			if (nextPlayer === "O") {
				nextPlayer = "X";
			}
			else {
				nextPlayer = "O";
			}

			self.gameBoard[index].piece = nextPlayer;
			console.log("hi", self.gameBoard[index].piece);

		}
		self.determineWinner();
				}

	function determineWinner() {
		if (winnerIs("X")) {
			setTimeout(function(){
				alert("X wins"),600});
			
		}
		else if (winnerIs("O")) {
			setTimeout(function(){
				alert("O wins"),600});	
		}
	}
	

	function winnerIs(player) {
		 return winsRow(player) || winsCol(player) || winsDiag(player);
	}

	function allThree(player, spaceOne,spaceTwo,spaceThree) {
		return (spaceOne === player) && (spaceTwo ===player) && (spaceThree === player);
	}

	function winsRow(player, spaceOne,spaceTwo,spaceThree) {
		 return allThree(player, self.gameBoard[0].piece, self.gameBoard[1].piece, self.gameBoard[2].piece) ||
			allThree(player, self.gameBoard[3].piece, self.gameBoard[4].piece, self.gameBoard[5].piece) ||
			allThree(player, self.gameBoard[6].piece, self.gameBoard[7].piece, self.gameBoard[8].piece);
	}

	function winsCol(player, spaceOne,spaceTwo,spaceThree) {
		return allThree(player, self.gameBoard[0].piece, self.gameBoard[3].piece, self.gameBoard[6].piece) ||
			allThree(player, self.gameBoard[1].piece, self.gameBoard[4].piece, self.gameBoard[7].piece) ||
			allThree(player, self.gameBoard[2].piece, self.gameBoard[5].piece, self.gameBoard[8].piece);
	}
	
	function winsDiag(player, spaceOne,spaceTwo,spaceThree) {
		return allThree(player, self.gameBoard[0].piece, self.gameBoard[4].piece, self.gameBoard[8].piece) ||
			allThree(player, self.gameBoard[2].piece, self.gameBoard[4].piece, self.gameBoard[6].piece);
	}

}


