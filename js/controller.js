angular
	.module('mainApp')
	.controller('TicTacToeController', TicTacToeController);

TicTacToeController.$inject = ['$firebaseObject'];

function TicTacToeController($firebaseObject) {
	
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

	//richard was here
	self.gameObj = syncFB();

	function syncFB(){
		var ref = new Firebase('https://tictact.firebaseio.com/');
		var gameObj = $firebaseObject(ref);

		gameObj.$loaded(function(){
			//all thee shit
			gameObj.nextPlayer;
			//end of shit
			gameObj.board = [{piece : " "},
						{piece : " "},
						{piece : " "},
						{piece : " "},
						{piece : " "},
						{piece : " "},
						{piece : " "},
						{piece : " "},
						{piece : " "}];
			gameObj.$save();
		});
		return gameObj;
	}
	//end of richard

	// self.board = [];
	// for (var i = 0 ; i < 9 ; i++) {
	// 		self.board.push({piece : " ", space: i})
	// }

	// function getBoardObject() {
	// 	var ref = new Firebase("https://tictact.firebaseio.com/")
	// 	var board = $firebaseObject(ref);
	// 	board.spaces = [{piece : " "},
	// 					{piece : " "},
	// 					{piece : " "},
	// 					{piece : " "},
	// 					{piece : " "},
	// 					{piece : " "},
	// 					{piece : " "},
	// 					{piece : " "},
	// 					{piece : " "}]
	// 	// board.$save();
	// 	board.$loaded(function() {
	// 		console.log("hi")
	// 			board.piece
	// 	});
	// 	return board;

	// }

// Ready to Play will script an alert stating X goes first and then clears the board of placed pieces.
	function readyToPlay() {
		alert("Player X goes first");
		for (var i = 0; i < 9; i ++){
		self.gameObj.board[i].piece = " ";
		}	
	}
// Alternate Play will alternate between X and O. First move will be X, then O upon click.
	function alternatePlay(space) {
		var index = self.gameObj.board.indexOf(space);	
		if (self.gameObj.board[index].piece !== " ") {
			alert("That space is occupied already");
		}
		else {
			if (nextPlayer === "O") {
				nextPlayer = "X";
			}
			else {
				nextPlayer = "O";
			}

			self.gameObj.board[index].piece = nextPlayer;
			console.log("hi", self.gameObj.board[index].piece);

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
		else {
			 null;
		}		
	}

	function allThree(player, spaceOne,spaceTwo,spaceThree) {
		return (spaceOne === player) && (spaceTwo ===player) && (spaceThree === player);
	}

	function winnerIs(player) {
		return winsRow(player) || winsCol(player) || winsDiag(player);
	}

	function winsRow(player, spaceOne,spaceTwo,spaceThree) {
		return  allThree(player, self.gameObj.board[0].piece, self.gameObj.board[1].piece, self.gameObj.board[2].piece) ||
			allThree(player, self.gameObj.board[3].piece, self.gameObj.board[4].piece, self.gameObj.board[5].piece) ||
			allThree(player, self.gameObj.board[6].piece, self.gameObj.board[7].piece, self.gameObj.board[8].piece);
	}

	function winsCol(player, spaceOne,spaceTwo,spaceThree) {
		return allThree(player, self.gameObj.board[0].piece, self.gameObj.board[3].piece, self.gameObj.board[6].piece) ||
			allThree(player, self.gameObj.board[1].piece, self.gameObj.board[4].piece, self.gameObj.board[7].piece) ||
			allThree(player, self.gameObj.board[2].piece, self.gameObj.board[5].piece, self.gameObj.board[8].piece);
	}

	function winsDiag(player, spaceOne,spaceTwo,spaceThree) {
		return allThree(player, self.gameObj.board[0].piece, self.gameObj.board[4].piece, self.gameObj.board[8].piece) ||
			allThree(player, self.gameObj.board[2].piece, self.gameObj.board[4].piece, self.gameObj.board[6].piece);
	}
}




