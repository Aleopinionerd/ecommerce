const productContainer = document.getElementById('product-container');

//funzione per jewelery
function visualizzaJewelery(){
    const url = "https://fakestoreapi.com/products/category/jewelery";
    fetch(url)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        displayProducts(data);
        });
}

function displayProducts(product){
    const productCard = product.map(product => {
    return `
      <div class="col-6 col-md-4 col-lg-3 centre-col">
        <div class="card">
          <img src="${product.image !== 'N/A' ? product.image : 'https://via.placeholder.com/300x450'}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">Anno: ${product.price}</p>            
          </div>
          <a href="#" class="btn btn-primary btn-margin" onclick="showMovieDetails('${product.id}')">Dettagli</a>
        </div>
      </div>
    `;
    }).join('');
    productContainer.innerHTML = `<div class="row row-gap">${productCard}</div>`;
}