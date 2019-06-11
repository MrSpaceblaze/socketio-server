const port = 25515;
const express = require('express');
let app = express();
const http = require('http').Server(app)
const path = require('path');
const serveStatic = require('serve-static');
const io = require('socket.io')(port)

app.use(serveStatic(__dirname + "/dist"));

const messages = [];

io.on('connection', socket =>{
	console.log("New Connection")
	
	socket.on('getAll',chatId=>{
		console.log("getAll called")
		let list = []
		let limit = messages.count;
		messages.forEach(message=>{
			if(message.chat == chatId){
				list.push(message)
			}
			limit--;
			if(limit==0){
				socket.emit(chat.chat,list)
			}
		})
	})
	
	socket.on('sendMessage',message=>{
		console.log("Message recieved: " + message)
		let message2 = JSON.parse(message)
		message2.time = Date.now()
		messages.push(message2);
		console.log("Message parsed:" + message2.chat )
		socket.emit(message2.chat,JSON.stringify(message2));
	})
})
