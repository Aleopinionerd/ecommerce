const productContainer = document.getElementById('product-container');
const productContainer2 = document.getElementById('product-container2');
const productContainer3 = document.getElementById('product-container3');
const secondProductContainer = document.getElementById('second-product-container');
const secondProductContainer2 = document.getElementById('second-product-container2');
const secondProductContainer3 = document.getElementById('second-product-container3');
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

window.onload = function (){
  loadCategories();
  localStorage.getItem("authToken");
}

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

//funzione per caricare categoria
function loadCategory(category) {
    let url = "https://fakestoreapi.com/products/category/" + category + "?limit=2";
    fetch(url)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          displayProducts(data, category);
      })
      .catch(error => console.error("Errore nel recupero dati:", error));
}

//funzione per mostrare i prodotti di una categoria
function displayProducts(product, category){
    const productCard = product.map(product => {
    return `
    <div class="col-md-12 col-lg-4">
        <div class="card home-product-card" style="width: 18rem;">
          <img src="${product.image !== 'N/A' ? product.image : 'https://via.placeholder.com/300x450'}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">Anno: ${product.price}</p>            
          </div>
          <a href="#" class="btn btn-primary btn-margin" onclick="showDetails('${product.id}')">Dettagli</a>
        </div>
      </div>
    `;
    }).join('');
    if(category == "men's clothing"){
        productContainer.innerHTML = `${productCard}`;
    }
    else if(category == "women's clothing"){
        productContainer2.innerHTML = `${productCard}`;
    }
    else if(category == "jewelery"){
        productContainer3.innerHTML = `${productCard}`;
    }
}

function loadElectronicsCategory(id){
    let url = "https://fakestoreapi.com/products/" + id;
    fetch(url)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          displayElectronicsProducts(data, id);
      })
      .catch(error => console.error("Errore nel recupero dati:", error));
}

function displayElectronicsProducts(product, id){
    const productCard = 
    `<div class="col-md-12 col-lg-4">
        <div class="card home-product-card" style="width: 18rem;">
          <img src="${product.image !== 'N/A' ? product.image : 'https://via.placeholder.com/300x450'}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">Anno: ${product.price}</p>            
          </div>
          <a href="#" class="btn btn-primary btn-margin" onclick="showDetails('${product.id}')">Dettagli</a>
        </div>
      </div>
    `;
    if(id == 9 || id == 10){
        secondProductContainer.innerHTML += `${productCard}`;
    }
    else if(id == 11 || id == 12){
        secondProductContainer2.innerHTML += `${productCard}`;
    }
    else if(id == 13 || id == 14){
        secondProductContainer3.innerHTML += `${productCard}`;
    }
}

function loadCategories(){
    loadCategory("men's clothing");
    loadCategory("women's clothing");
    loadCategory("jewelery");
    loadElectronicsCategory(9);
    loadElectronicsCategory(10);
    loadElectronicsCategory(11);
    loadElectronicsCategory(12);
    loadElectronicsCategory(13);
    loadElectronicsCategory(14);
}

function showDetails(id) {
  window.location.href = "../Details/Details.html?id=" + id;
}

