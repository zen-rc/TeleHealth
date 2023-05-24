// chat-form is located in the chat.html file as the form containing the message input and send button
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

// get username and room from URL
// not sure if I need this since ideally this would be coming from user and post collection
const { username, room } = Qs.parse(location.search, {
    ignoreQureyPrefix: true
})

console.log("this is the username", username)
const socket = io()

// Message from server
socket.on('message', message => {
    console.log('main js', message)
    outputMessage(message)

    // scroll down (not working but will just revisit later)
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// message submit
// adding an event listener to the send 
chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // to get text input
    const msg = { text: e.target.elements.msg.value, username: username, time: new Date() }
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
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
       ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}