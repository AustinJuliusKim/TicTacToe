angular
	.module('mainApp', [])
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

	self.board = [];
	for (var i = 0 ; i < 9 ; i++) {
			self.board.push({piece : " ", space: i})
	}

// Ready to Play will script an alert stating X goes first and then clears the board of placed pieces.
	function readyToPlay() {
		alert("Player X goes first");
		for (var i = 0; i < 9; i ++){
		self.board[i].piece = " ";
		}	
	}
// Alternate Play will alternate between X and O. First move will be X, then O upon click.
	function alternatePlay(space) {
		var index = self.board.indexOf(space);	
		if (self.board[index].piece !== " ") {
			return alert("That space is occupied already");
		}
		else {
			if (nextPlayer === "O") {
				nextPlayer = "X";
			}
			else {
				nextPlayer = "O";
			}
			self.board[index].piece = nextPlayer;
		}
		determineWinner();
	}


	function determineWinner() {

		console.log("check ")
		if (winnerIs("X")) {
			
			// for (var i = 0; i < 9; i ++){
			// 		self.board[i].piece = " ";
			// 	}
			return 	alert("X wins");
		}
		else if (winnerIs("O")) {s
			return alert("O wins");
		}
		else {
			return null;
		}		
	}
	function allThree(player, spaceOne,spaceTwo,spaceThree) {
		return (spaceOne === player) && (spaceTwo ===player) && (spaceThree === player);
	}
	function winnerIs(player) {
		return winsRow(player) || winsCol(player) || winsDiag(player);
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



