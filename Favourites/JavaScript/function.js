const ProductContainer = document.getElementById("product-container");

function getQueryParam(id) {
    const params = new URLSearchParams(window.location.search); 
    console.log(params);
    return params.get(id);
}

function loadFavourites(){
    id = getQueryParam("id");
    let url = "https://fakestoreapi.com/products/" + id;
    fetch(url)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          displayProduct(data);
      })
      .catch(error => console.error("Errore nel recupero dati:", error));
}

function displayProduct(product){
    const productCard = 
    `<div id="${product.id}" class="col-md-6 col-lg-3 centre-col mt-5">
        <div class="card home-product-card" style="width: 18rem;">
          <img src="${product.image !== 'N/A' ? product.image : 'https://via.placeholder.com/300x450'}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">Anno: ${product.price}</p>            
          </div>
          <button onclick="removeFavourite(this, ${product.id})" class="btn btn-primary fav-btn"><i class="fa-solid fa-heart fav-icon after-fav-icon"></i></button>
        </div>
      </div>
    `;
    ProductContainer.innerHTML += `${productCard}`;
}

function removeFavourite(x, id){
  x.innerHTML = "<i class='fa-regular fa-heart fav-icon prev-fav-icon'></i>";
  element = document.getElementById(id);
  element.remove();
}