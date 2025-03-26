# phase-1-project

# **Online E-commerce Supermarket**

This project is an online e-commerce supermarket built with JavaScript. It allows users to explore a variety of products, adjust quantities, add items to a virtual shopping cart, and view the total cost. An admin panel is included to add new products to the catalog.

## **Installation**

Access the live application here: [Live Link](https://phase-1-project-flax-theta.vercel.app/)

GitHub Repository: [Online E-commerce Supermarket](https://github.com/Richard3wasonga/phase-1-project)

1. Clone this repository:
   ```bash
   git clone https://github.com/Richard3wasonga/phase-1-project
   ```
2. Navigate to the project directory:
   ```bash
   cd e-commerce-supermarket
   ```
3. Ensure the server URL in `index.js` is set to `https://phase-1-project-flax-theta.vercel.app/items`.
4. Open the `index.html` file in your browser.

## **How the JavaScript Works**

### **index.js**
This script fetches product data from the server and displays it on the webpage. It also manages the shopping cart functionalities:
- Fetches products and displays the first 12 on the page.
- Handles adding products to the cart, updating quantities, and calculating totals.
- Utilizes local storage to save cart data, ensuring persistence.
- Manages click events for adding, removing, and adjusting products in the cart.

### **admin.js**
This script handles the addition of new products to the catalog through the admin panel:
- Listens for the submission event of the admin form.
- Captures form data, formats it as JSON, and sends a POST request to the server.
- Ensures price data is formatted correctly.

```javascript
let form = document.querySelector("form");
form.addEventListener('submit', handlesubmit);

let base_url = 'https://phase-1-project-flax-theta.vercel.app/items';

function handlesubmit(event) {
    event.preventDefault();
    let formData = new FormData(form);
    let data = Object.fromEntries(formData);
    let jsonData = JSON.stringify(data);

    if (data.price) {
        data.price = parseFloat(data.price).toFixed(2);
    }

    fetch(base_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}
```

## **Features**

- Fetches product data from a server endpoint hosted on Vercel (`https://phase-1-project-flax-theta.vercel.app/items`).
- Dynamic display of products with adjustable quantities.
- Shopping cart functionality: add, adjust, and remove items.
- Displays total cart value with persistent data using `localStorage`.
- Admin panel for adding new products to the catalog.

## **Technologies Used**

- HTML, CSS, JavaScript
- Local Storage for data persistence
- Fetch API for data retrieval

## **Future Improvements**

- Integration with a backend server and real database.
- Implement user authentication for personalized experiences.
- Enhance the UI/UX for a more modern look.

## **Authors**
- Richard Wasonga - [GitHub Profile](https://github.com/Richard3wasonga)

## Contributors
- Bob Oyier - [GitHub Profile](https://github.com/oyieroyier)

## **License**

This project is open-source and available under the MIT License.


