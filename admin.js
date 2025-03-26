let form = document.querySelector("form");
let base_url = 'http://localhost:3000/items';
let itemList = document.getElementById("item-list");


document.addEventListener("DOMContentLoaded", () => {
    fetchItems();
});


form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    
    let formData = new FormData(form);
    let data = Object.fromEntries(formData);  
     

    if (data.price) {
        data.price = parseFloat(data.price).toFixed(2);  
    }

    
    fetch(base_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        alert("Product added successfully!");
        form.reset();  
        fetchItems();  
    })
    .catch(error => console.error("Error adding product:", error));
}


function fetchItems() {
    fetch(base_url)
        .then(response => response.json())
        .then(data => {
            itemList.innerHTML = "<h2>Manage Products</h2>";  
            data.forEach(item => displayItem(item));
        })
        .catch(error => console.error("Error fetching items:", error));
}


function displayItem(item) {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
        <p><strong>${item.name}</strong> - $${item.price}</p>
        <button onclick="deleteItem(${item.id})">Delete</button>
    `;
    itemList.appendChild(div);
}


function deleteItem(itemId) {
    if (confirm("Are you sure you want to delete this item?")) {
        fetch(`${base_url}/${itemId}`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                alert("Item deleted successfully!");
                fetchItems();  
            } else {
                alert("Failed to delete item.");
            }
        })
        .catch(error => console.error("Error deleting item:", error));
    }
}