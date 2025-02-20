let logoutButton = document.getElementById("login");
let signUpButton = document.getElementById("signup");
token = localStorage.getItem("authToken");
console.log(token);

document.addEventListener("DOMContentLoaded", function (){
  if(token != null){
    logoutButton.innerHTML="Logout";
    logoutButton.onclick="";
    signUpButton.innerHTML="<i class='fa-solid fa-user'></i>";
  }
});

/*window.onload = function (){
  loadCategories();
  localStorage.getItem("authToken");
}*/

logoutButton.addEventListener("click", function(){
  if(token != null){
    if(logoutButton.innerHTML=="Logout"){
      logout();
    }
  }
});

signUpButton.addEventListener("click", function(){
  if(token != null){
   window.location.href='../profilo.html';
  }
});

function logout() {
  // Recupera il token dal localStorage
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("Nessun token trovato nel localStorage");
    return;
  }
  
  fetch('http://localhost:8080/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Logout fallito');
      }
      return response.json();
  })
  .then(data => {
      console.log('Logout effettuato:', data);
      //printOutput(data);
      // Rimuove il token dal localStorage
      localStorage.removeItem("authToken");
      window.location.href="Home.html";
  })
  .catch(error => {
      console.error('Errore durante il logout:', error);
      //printOutput({ error: error.message });
  });
}


function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return; // Non inviare messaggi vuoti

  
    let userMessage = `<div class="message user">${userInput}</div>`;
    chatBox.innerHTML += userMessage;


    setTimeout(() => {
        let botMessage = `<div class="message bot">Grazie per il tuo messaggio! Spiegami di cosa hai bisogno 😊</div>`;
        chatBox.innerHTML += botMessage;
    }, 1000);

    document.getElementById("user-input").value = "";
}