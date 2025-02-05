let CartContainer = document.getElementById("carrello");

function getQueryParam(id) {
    const params = new URLSearchParams(window.location.search); 
    console.log(params);
    return params.get(id);
}

function loadProduct(){
    id = getQueryParam("id");
    let url = "https://fakestoreapi.com/products/" + id;
    fetch(url)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          displayToCart(data);
      })
      .catch(error => console.error("Errore nel recupero dati:", error));
}

function displayToCart(product){
    let productCard = 
    `   <div class="col-lg-3 centre-col align-col">
            <img id="product-img" src="${product.image}" alt="Prodotto 1">
            <span id="product-span">${product.title}</span>
        </div>
        <div class="col-lg-3 centre-col align-col">
            <span class="grassetto">Quantità</span>
            <input type="number" id="quantita" value="1" min="1" onchange="aggiornaPrezzo(this, ${product.price})"class="grassetto">
        </div> 
        <div class="col-lg-2 centre-col align-col">
            <span id="product-price" class="grassetto">Prezzo:</span>
            <span id="product-price">${product.price}</span>
        </div>
        <div class="col-lg-2 centre-col align-col">
            <span id="product-price" class="grassetto">Prezzo Totale:</span>
            <span id="product-tot-price"></span>
        </div>
        <div class="col-lg-2 centre-col align-col">
            <button class="rimuovi">Rimuovi</button>
        </div>
    `;
    CartContainer.innerHTML += `${productCard}`;

    let Quantita = document.getElementById("quantita").value;
    let PrezzoTot = document.getElementById("product-tot-price");
    PrezzoTot.innerHTML = product.price * Quantita;
}

function aggiornaPrezzo(elemento, price){    
        let PrezzoTot = document.getElementById("product-tot-price");
        PrezzoTot.innerHTML = price * elemento.value;
}

