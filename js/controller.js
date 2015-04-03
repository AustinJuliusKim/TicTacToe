angular
	.module('mainApp')
	.controller('TicTacToeController', TicTacToeController);

TicTacToeController.$inject = ['$firebaseObject'];

function TicTacToeController($firebaseObject) {
	
	var self = this;
	self.test = "controller is working";
	

	self.readyToPlay = readyToPlay;
	self.alternatePlay = alternatePlay;
	
	self.determineWinner = determineWinner;
	self.allThree = allThree;
	self.winnerIs = winnerIs;
	self.winsRow = winsRow;
	self.winsCol = winsCol;
	self.winsDiag = winsDiag;

	self.gameObj = syncFB();

	// Start sync portion of everything we want to sync with FB
	function syncFB() {
		var ref = new Firebase('https://tictact.firebaseio.com/gameObj/');
		var gameObj = $firebaseObject(ref);

		gameObj.$loaded(function(){
			gameObj.gameBoard = [{piece : " "},
						{piece : " "},
						{piece : " "},
						{piece : " "},
						{piece : " "},
						{piece : " "},
						{piece : " "},
						{piece : " "},
						{piece : " "}];
		//  This loads every time the page is refreshed, however data will not be saved if the page is refreshed
			console.log("This loads second: ");
		})
		gameObj.nextPlayer="O";
		//  Syncs the next player with firebase to determine which piece to place next


		gameObj.$save();

		console.log("This loads first: ");
		return gameObj;
	}
// Ready to Play will script an alert stating X goes first and then clears the board of placed pieces.
	function readyToPlay() {
		alert("Player X goes first");
		for (var i = 0; i < 9; i ++){
		self.gameObj.gameBoard[i].piece = " ";
		}	
	}
// Alternate Play will alternate between X and O. First move will be X, then O upon click.
	function alternatePlay(space) {
		var index = self.gameObj.gameBoard.indexOf(space);	
		if (self.gameObj.gameBoard[index].piece !== " ") {
			alert("That space is occupied already");
		}
		else {
			if (self.gameObj.nextPlayer === "O") {
				self.gameObj.nextPlayer = "X";
			}
			else {
				self.gameObj.nextPlayer = "O";
			}
		self.gameObj.gameBoard[index].piece = self.gameObj.nextPlayer;
	}
	self.determineWinner();
	self.gameObj.$save();

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
		else if (checkCatsGame()) {
			setTimeout(function(){
				alert("Cat's Game"), 500;
			})
		}
	}


	function checkCatsGame () {
		var boardFull = self.gameObj.gameBoard.every(function(x) {
			return x.piece !== " ";
		});
		return boardFull;
	}
	

	function allThree(player, spaceOne,spaceTwo,spaceThree) {
		return (spaceOne === player) && (spaceTwo ===player) && (spaceThree === player);
	}

	function winnerIs(player) {
		return winsRow(player) || winsCol(player) || winsDiag(player);
	}

	function winsRow(player, spaceOne,spaceTwo,spaceThree) {
		return  allThree(player, self.gameObj.gameBoard[0].piece, self.gameObj.gameBoard[1].piece, self.gameObj.gameBoard[2].piece) ||
			allThree(player, self.gameObj.gameBoard[3].piece, self.gameObj.gameBoard[4].piece, self.gameObj.gameBoard[5].piece) ||
			allThree(player, self.gameObj.gameBoard[6].piece, self.gameObj.gameBoard[7].piece, self.gameObj.gameBoard[8].piece);
	}

	function winsCol(player, spaceOne,spaceTwo,spaceThree) {
		return allThree(player, self.gameObj.gameBoard[0].piece, self.gameObj.gameBoard[3].piece, self.gameObj.gameBoard[6].piece) ||
			allThree(player, self.gameObj.gameBoard[1].piece, self.gameObj.gameBoard[4].piece, self.gameObj.gameBoard[7].piece) ||
			allThree(player, self.gameObj.gameBoard[2].piece, self.gameObj.gameBoard[5].piece, self.gameObj.gameBoard[8].piece);
	}

	function winsDiag(player, spaceOne,spaceTwo,spaceThree) {
		return allThree(player, self.gameObj.gameBoard[0].piece, self.gameObj.gameBoard[4].piece, self.gameObj.gameBoard[8].piece) ||
			allThree(player, self.gameObj.gameBoard[2].piece, self.gameObj.gameBoard[4].piece, self.gameObj.gameBoard[6].piece);
	}
}





