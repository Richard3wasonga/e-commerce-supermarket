const server_url = "http://localhost:3000/items";
const listcartHtml = document.querySelector('.listcart');
const iconcartspan = document.querySelector('.cart-count');
let productList = [];
let carts = JSON.parse(localStorage.getItem('cart')) || [];
function getId(id_name) { return document.getElementById(id_name); }
function createElement(element) { return document.createElement(element); }
function addEvent(element, event, callback) { return element.addEventListener(event, callback); }
function appendChild(element_1, element_2) { return element_1.appendChild(element_2); }


function fetchProducts() {
    return fetch(server_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        productList = data;
        displayProducts(data.slice(0, 12));
        return data;
    })
    .catch(error => console.error("Error fetching products:", error));
}


function displayProducts(products) {
    const container = getId('product-category');
    container.innerHTML = '';
    
    products.forEach(product => {
        const productDiv = createElement("div");
        productDiv.className = "single-products";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>Price: $${product.price.toFixed(2)}</p>
            <div class="quantity-selector">
                <button class="qty-minus" data-id="${product.id}">-</button>
                <span class="qty-value" data-id="${product.id}">1</span>
                <button class="qty-plus" data-id="${product.id}">+</button>
            </div>
            <button class="prod-btn" data-id="${product.id}">Add to cart</button>
        `;
        appendChild(container, productDiv);
    });
}


function initCart() {
    
    updateCartIcon();
    
    
    const iconcart = document.querySelector('.icon-cart');
    const closecart = document.querySelector('.close');
    const body = document.querySelector('body');
    const checkoutBtn = document.querySelector('.checkout');

    addEvent(iconcart, 'click',() => {
        body.classList.toggle('showcart')
        if(body.classList.contains('showcart')){
            addCartToHtml()
        }
    })

}