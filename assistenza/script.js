function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return; 

  
    let userMessage = `<div class="message user">${userInput}</div>`;
    chatBox.innerHTML += userMessage;


    setTimeout(() => {
        let botMessage = `<div class="message bot">Grazie per il tuo messaggio! Spiegami di cosa hai bisogno 😊</div>`;
        chatBox.innerHTML += botMessage;
    }, 1000);

    document.getElementById("user-input").value = "";
}
