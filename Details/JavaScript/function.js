const ProductContainer = document.getElementById("product-container");

function getQueryParam(id) {
    const params = new URLSearchParams(window.location.search); 
    console.log(params);
    return params.get(id);
}

function loadCategory(){
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
    `<div class="col-md-12 col-lg-6 centre-col mt-5">
        <div class="card home-product-card" style="width: 18rem;">
          <img src="${product.image !== 'N/A' ? product.image : 'https://via.placeholder.com/300x450'}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">Anno: ${product.price}</p>            
          </div>
        </div>
      </div>
      <div class="col-md-12 col-lg-6">
        <p>${product.description}</p>
        <p>Valutazione: ${product.rating.rate} <i class="fas fa-star"></i></p>
      </div>
    `;
    ProductContainer.innerHTML += `${productCard}`;
}