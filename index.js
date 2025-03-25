const server_url = "http://localhost:3000/items"
function getId (id_name){
    return document.getElementById(id_name)
}
fetch(server_url,{
    method: "GET",
    headers:{
        "Content-Type" : "application/json",
        "Accept" : "apllication/json"
    }
    
})
.then( res => res.json())
.then(data => displayProducts(data))
.catch(error => console.error("Error in fetching data:", error))
function displayProducts(prod){
    let product_caterory =getId('product-category')
    prod.forEach(item => {
        let html=`
        <div class="single-products">
        <img><
        <h4>${item.title}</h4>
        
        </div>
        `
        
    });

}
