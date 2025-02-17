let CartContainer = document.getElementById("carrello");
let savedProducts = JSON.parse(localStorage.getItem("Products")) || [];

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
          saveProduct(data);
      })
      .catch(error => console.error("Errore nel recupero dati:", error));
}

function saveProduct(product){
    let prodottoEsistente = savedProducts.some(p => p.id == product.id);
    if (!prodottoEsistente) {
        savedProducts.push(product);
        localStorage.setItem("Products", JSON.stringify(savedProducts));
    }
    displayToCart();
}

function displayToCart(){
    let productsString = localStorage.getItem("Products");
    let products = JSON.parse(productsString);
    let i = 1;
    products.forEach(product => {
        let productCard = 
    `   
        <div id="${product.id}" class="col-12">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 centre-col align-col">
                        <img id="product-img" src="${product.image}" alt="Prodotto 1">
                        <span id="product-span">${product.title}</span>
                    </div>
                    <div class="col-lg-3 centre-col align-col">
                        <span class="grassetto">Quantità</span>
                        <input type="number" id="quantita${i}" value="1" min="1" onchange="aggiornaPrezzo(this, ${product.price}, ${i})"class="grassetto">
                    </div> 
                    <div class="col-lg-2 centre-col align-col">
                        <span id="product-price" class="grassetto">Prezzo:</span>
                        <span id="product-price">${product.price}</span>
                    </div>
                    <div class="col-lg-2 centre-col align-col">
                        <span id="product-price" class="grassetto">Prezzo Totale:</span>
                        <span id="product-tot-price${i}"></span>
                    </div>
                    <div class="col-lg-2 centre-col align-col">
                        <button class="rimuovi" onclick="removeFromCart(${product.id})">Rimuovi</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    CartContainer.innerHTML += `${productCard}`;
    let Quantita = document.getElementById("quantita" + i).value;
    let PrezzoTot = document.getElementById("product-tot-price" + i);
    PrezzoTot.innerHTML = product.price * Quantita;
    i++;
    });
}

function aggiornaPrezzo(elemento, price, i){    
        let PrezzoTot = document.getElementById("product-tot-price" + i);
        PrezzoTot.innerHTML = price * elemento.value;
}

function removeFromCart(id){
    element = document.getElementById(id);
    element.remove();
}
