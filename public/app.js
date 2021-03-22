user = localStorage.getItem('user');
document.getElementById('user').value = user;

const url = 'ws://192.168.1.170:8080/';
const connection = new WebSocket(url);

connection.onopen = () => {
	console.log('Connected to chat');
};

connection.onerror = (error) => {
	console.log(`WebSocket error: ${error}`);
};

connection.onmessage = (e) => {
	addtoChat(JSON.parse(e.data));
};

const onSubmit = () => {
	const username = document.getElementById('user').value;
	let message = document.getElementById('message');
	if (!username || !message.value) {
		console.log('ERROR');
	} else {
		localStorage.setItem('user', username);
		connection.send(JSON.stringify({ user: username, msg: message.value }));
		message.value = '';
	}
};

const messageComponent = ({ user, msg }) => {
	const li = document.createElement('li');
	li.classList = 'message';
	const h1 = document.createElement('h1');
	const p = document.createElement('p');
	h1.innerText = user;
	p.innerText = msg;
	li.appendChild(h1);
	li.appendChild(p);
	return li;
};

const addtoChat = (message) => {
	const chat = document.getElementById('chat');
	const newMessage = messageComponent(message);
	chat.appendChild(newMessage);
};
