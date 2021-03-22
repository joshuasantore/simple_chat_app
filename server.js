const http = require('http');
const express = require('express');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
	ws.on('message', (message) => {
		console.log(JSON.parse(message));
		wss.broadcast(message);
	});
	wss.broadcast(
		JSON.stringify({
			user: 'server',
			msg: 'A new user has entered the chat',
		})
	);
});

wss.broadcast = (message) => {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
};
server.listen(process.env.PORT || 8080, () => {
	console.log(`Server started on port ${server.address().port}...`);
});
