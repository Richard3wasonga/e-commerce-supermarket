const server_url = "http://localhost:3000/items"
let productList =[];
const cartItems = [];
function getId (id_name){
    return document.getElementById(id_name)
}
function createElement(element){
    return document.createElement(element)
}
function addEvent(element,event,callback){
    return element.addEventListener(event,callback)
}
function appendChild(element_1,element_2){
    return element_1.appendChild(element_2)

}
fetch(server_url,{
    method: "GET",
    headers:{
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    }
    
})
.then( res => res.json())
.then(data => { 
    productList= data;
    displayProducts(data.slice(0,12))})
.catch(error => console.error("Error in fetching data:", error))
function displayProducts(prod){
    let product_caterory =getId('product-category')
    prod.forEach(item => {
        let product_div = createElement("div")
        product_div.classList.add("single-products")
        product_div.innerHTML =`
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <button id="prod-btn" onclick = "addtocart(${item.id})">Add to cart</button>
    `
    product_caterory.appendChild(product_div)
    });
    

}

function addtocart(productId){
    const product = productList.find(item => item.id === productId)
    if (product){
    let existingItem = cartItems.find(item => item.id === productId)
    if(existingItem){
        existingItem.quantity += 1
    }else {
        cartItems.push({...product,quantity: 1})
    }
    console.log(`product With Id ${productId} added to cart`)
    alert("Product added to cart")
        
}


let  cartButton = getId("cart");
addEvent(cartButton,"click",displayItems)

function displayItems(){
    let cartContainer = getId("cart-container")
    cartContainer.innerHTML =""
    if(cartItems.length === 0){
        cartContainer.innerHTML="<p>Your cart is empty.</P>"
        return;
    }
    cartItems.forEach(item => {
        let cartItem= createElement("div")
        cartItem.classList.add("cart-item")
        cartItem.innerHTML= `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <button onclick = "removefromcart(${item.id})">Remove</button>
        `;
        appendChild(cartContainer,cartItem)
    })
}
function removefromcart(productId){
    let index = cartItems.findIndex(item => item.id === productId)
    if(index !== -1){
        cartItems.splice(index,1)
        displayItems()

    }
}
