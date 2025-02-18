const productContainer = document.getElementById('product-container');
const categoryText = document.getElementById('category-text');
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
      window.location.href="../Home/Home.html";
  })
  .catch(error => {
      console.error('Errore durante il logout:', error);
      //printOutput({ error: error.message });
  });
}

//trova la categoria selezionata
document.addEventListener("DOMContentLoaded", function () {
  loadCategory("https://fakestoreapi.com/products/category/men's clothing");
  const categoryLinks = document.querySelectorAll('#dropdown .dropdown-item');

  categoryLinks.forEach(link => {
      link.addEventListener('click', function (e) {
          e.preventDefault();

          const category = this.getAttribute("id");
          console.log("Categoria selezionata:", category);

          let url = "";
          if (category === "men") {
              url = "https://fakestoreapi.com/products/category/men's clothing";
          } else if (category === "women") {
              url = "https://fakestoreapi.com/products/category/women's clothing";
          } else if (category === "jewelery") {
              url = "https://fakestoreapi.com/products/category/jewelery";
          } else if (category === "electronics") {
              url = "https://fakestoreapi.com/products/category/electronics";
          }

          if (url) {
            loadCategory(url);
          }
      });
  });
});

//funzione per caricare categoria
function loadCategory(category) {
  fetch(category)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          displayProducts(data);
      })
      .catch(error => console.error("Errore nel recupero dati:", error));
}

//funzione per mostrare i prodotti di una categoria
function displayProducts(product){
    const productCard = product.map(product => {
    return `
      <div class="col-6 col-md-4 col-lg-3 centre-col">
        <div class="card">
          <img src="${product.image !== 'N/A' ? product.image : 'https://via.placeholder.com/300x450'}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">Prezzo: ${product.price} €</p>            
          </div>
          <a href="#" class="btn btn-primary btn-margin" onclick="showDetails('${product.id}')">Dettagli</a>
          <button onclick="addToFavourites(this, '${product.id}')" class="btn btn-primary fav-btn"><i class="fa-regular fa-heart fav-icon prev-fav-icon"></i></button>
        </div>
      </div>
    `;
    }).join('');
    productContainer.innerHTML = `<div class="row row-gap">${productCard}</div>`;
}

function showDetails(id) {
    window.location.href = "../Details/Details.html?id=" + id;
}

function addToFavourites(x, id){
  x.innerHTML = "<i class='fa-solid fa-heart fav-icon after-fav-icon'></i>";
  window.location.href = "../Favourites/Favourites.html?id=" + id;
}