const socket = io.connect();

const container = document.getElementById('chatBox');

const createNewMessage = (e) => {
    e.preventDefault();
    socket.emit('newMessage', {name: e.target.name.value, message: e.target.message.value});
};

socket.on('fullChat', data => {
    data.map(message => displayNewMessage(message));
});

socket.on('showCurrentMessage', data => {
    displayNewMessage(data);
});

const displayNewMessage = newUserMessage =>{
    const newNode = document.createElement('p');
    newNode.textContent = `${newUserMessage.name}: ${newUserMessage.message}`;
    container.appendChild(newNode);
};