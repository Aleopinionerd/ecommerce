const productContainer = document.getElementById('product-container');

//trova la categoria selezionata
document.addEventListener("DOMContentLoaded", function () {
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
            <p class="card-text">Anno: ${product.price}</p>            
          </div>
          <a href="#" class="btn btn-primary btn-margin" onclick="showMovieDetails('${product.id}')">Dettagli</a>
        </div>
      </div>
    `;
    }).join('');
    productContainer.innerHTML = `<div class="row row-gap">${productCard}</div>`;
}