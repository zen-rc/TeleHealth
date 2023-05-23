// chat-form is located in the chat.html file as the form containing the message input and send button
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const socket = io()

// Message from server
socket.on('message', message => {
    console.log(message)
    outputMessage(message)

    // scroll down (not working but will just revisit later)
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// message submit
// adding an event listener to the send 
chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // to get text input
    const msg = e.target.elements.msg.value

    // emitting a message to server
    socket.emit('chatMessage', msg)

    // clear input
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()

    
})

// output message to DOM
function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
       ${message}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}