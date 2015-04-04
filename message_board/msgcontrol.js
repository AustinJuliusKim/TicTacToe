angular
	.module('messageApp')
	.controller('MessageBoardController', MessageBoardController);

function MessageBoardController() {
	var self = this;


	self.listOfMessages = [];
		for (var i = 0 ; i <10 ; i ++){
			self.listOfMessages.push({userName : "user", comment: " "})
		}

	self.chat; // bound to input box for new todo
	self.user; // bound to input box for username
	self.addMessage = addMessage;
	self.removeMessage = removeMessage;
	self.limitChatBox = limitChatBox;

		function addMessage() {
		 	var newComment = {userName: self.user, comment: self.chat};
		 
		 		self.listOfMessages.unshift(newComment);

		 		self.chat = null;
		 }
		 
		 function removeMessage() {
		 	self.listOfMessages.pop();
		 }

		 function limitChatBox() {
		 	var newComment = {comment: self.chat};
		 	if (self.listOfMessages.length >=10){
		 		removeMessage();
		 		console.log("test")
		 		addMessage();
		 	}
		 	else if (self.chat == null) {
		 		console.log("nothing here")
		 		
		 	}
		 	else {
		 		addMessage();
		 		console.log("He")
		 	}
		 }
		}


	