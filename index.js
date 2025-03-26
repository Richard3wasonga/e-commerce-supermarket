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
    addEvent(closecart, 'click', () => {
        body.classList.remove('showcart')
    })
    addEvent(getId('product-category'), 'click',(e) => {
        if(e.target.classList.contains('cart-minus')){
            adjustQuantity(e.target.dataset.id, -1)
        }else if(e.target.classList.contains('qty-plus')){
            adjustQuantity(e.target.dataset.id, 1)
        }else if(e.target.classList.contains('prod-btn')){
            const itemId = Number(e.target.dataset.id)
            const qty = parseInt(document.querySelector(`.qty-value[data-id="${itemId}"]`).textContent)
            addToCart(itemId,qty)
        }
    })
    addEvent(listcartHtml,'click', (e) => {
        if (e.target.classList.contains('cart-minus')) {
            adjustCartQuantity(e.target.closest('.item').dataset.id, -1);
        } else if (e.target.classList.contains('cart-plus')) {
            adjustCartQuantity(e.target.closest('.item').dataset.id, 1);
        } else if (e.target.classList.contains('remove-item')) {
            removeFromCart(e.target.closest('.item').dataset.id);
        }
    })
    addEvent(checkoutBtn,'click', () => {
        alert('Proceeding to checkout!')
    })

}
function adjustQuantity(productId, change) {
    const qtyElement = document.querySelector(`.qty-value[data-id="${productId}"]`);
    let newQty = parseInt(qtyElement.textContent) + change;
    if (newQty < 1) newQty = 1;
    qtyElement.textContent = newQty;
}
function adjustCartQuantity(productId, change) {
    const itemIndex = carts.findIndex(item => item.product_id == productId);
    if (itemIndex >= 0) {
        carts[itemIndex].quantity += change;
        
        if (carts[itemIndex].quantity < 1) {
            carts.splice(itemIndex, 1);
        }
        saveCart();
        addCartToHtml();
        updateCartIcon();
        
        
    }
}
function addToCart(productId, quantity) {
    const existingItem = carts.find(item => item.product_id == productId);
    const product = productList.find(p => p.id == productId);
    
    if (!product) return;
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        carts.push({
            product_id: productId,
            quantity: quantity,
            price: product.price,
            name: product.name,
            image: product.image
        });
    }
    
    saveCart();
    addCartToHtml();
    updateCartIcon();
    
    
    const btn = document.querySelector(`.prod-btn[data-id="${productId}"]`);
    if (btn) {
        btn.textContent = 'Added!';
        setTimeout(() => btn.textContent = 'Add to cart', 1000);
    }
}
function removeFromCart(productId) {
    carts = carts.filter(item => item.product_id != productId);
    saveCart();
    addCartToHtml();
    updateCartIcon();
}

fetchProducts()