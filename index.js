const server_url = "http://localhost:3000/items"
function getId (id_name){
    return document.getElementById(id_name)
}
function createElement(element){
    return document.createElement(element)
}
fetch(server_url,{
    method: "GET",
    headers:{
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    }
    
})
.then( res => res.json())
.then(data => displayProducts(data.slice(0,12)))
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
function addtocart(procuctId){
    console.log(`product With Id ${procuctId} added to cart`)
    alert("Product added to cart")
}
