const productContent = document.querySelector('.product-content');
const addProdContent = document.querySelector('.add-product-content');
const upProdContent = document.querySelector('.update-product-content');
const prodDetails = document.querySelector('.new-product-details');
const updateDetails = document.querySelector('.update-product-details');

class Products {
    constructor() {
        this.newProduct = {};
        this.updatedProduct = {};
        this.list = [];
        this.products = [];
        this.fetchProducts();
    }

    //fetch products in the data base
    fetchProducts() {
        fetch('/products')
        .then(res => res.json())
        .then(data => {
            this.products = data;
            this.displayProducts(this.products);
        })
        .catch(error => {
            console.log(error);
        });
    }

    displayProducts(array) {
        productContent.innerHTML = "";
         //iterates over all submited orders in the database and creates html for each
         array.forEach(value => {
            const { _id, id, name, image, description, price, category } = value;
        
            const newDiv = document.createElement('div');
            newDiv.classList.add('product-box');
            newDiv.setAttribute('data-product-id', `${_id}`);
            newDiv.innerHTML = `
            <div class='left'>
                <button class='update-btn' data-product-id=${_id}>UPDATE</button>
                <button class='delete-btn' data-product-id=${_id}>DELETE</button>
            </div>
            <div class='middle'>
                <div>Category: ${category}</div>
                <div>Product ID: ${id}</div>
                <div>Name: ${name}</div>
                <div>Price: Php ${price}</div>
                <div>Description: ${description}</div>
            </div>
            <div class='right'>
                <img loading='lazy' src='./images/${image}'/>
            </div>
            `;
            productContent.appendChild(newDiv);
        });

        const deleteBtns = document.querySelectorAll('.delete-btn');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', event => {
                const productId = event.target.dataset.productId;
                const action = event.target.textContent.trim();
                this.deleteProduct(productId, action)
                alert("Order has been removed from product list.");
            });
        });

        const updateBtns = document.querySelectorAll('.update-btn');
        updateBtns.forEach(btn => {
            btn.addEventListener('click', event => {
                toggleHidden(productContent);
                toggleHidden(addProductBtn);
                toggleFlex(upProdContent);
                toggleFlex(addToListBtn);
                const productId = event.target.dataset.productId;
                this.updateProducts(productId);
            });
        });
    }

    openModal() {
        prodDetails.innerHTML = "";
        
        //generate html display for the add product form
        prodDetails.innerHTML = `
        <label for='product-category'>Product Category: </label>
        <input type='text' id='product-category' name='product-category' placeholder='e.g. beverage' required />

        <label for='product-id'>Product ID: </label>
        <input type='number' id='product-id' name='product-id' placeholder='0' required />

        <label for='product-name'>Product Name: </label>
        <input type='text' id='product-name' name='product-name' placeholder='e.g. Dirty Horchata' required />

        <label for='product-price'>Product Price: </label>
        <input type='number' id='product-price' name='product-price' placeholder='160' required />

        <label for='product-description'>Product Description: </label>
        <input type='text' id='product-description' name='product-description' placeholder='e.g. A smooth blend of rice milk, cinnamon, vanilla, and espresso' required />

        <label for='product-image'>Product Image: </label>
        <input type='file' id='product-image' name='product-image' accept='image/png' placeholder='e.g. product image here' required />
        `;
    }

    addProduct() {
        //get input field values
        const category = document.getElementById('product-category').value;
        const id = document.getElementById('product-id').value;
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const description = document.getElementById('product-description').value;
        const image = document.getElementById('product-image').value;

        //creates the product object
        this.newProduct = {
            category,
            id,
            name,
            price,
            description,
            image
        }

        //adds the product to the database
        fetch('/addProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.newProduct)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Product added successfully: ', data);
        })
        .catch(error => {
            console.log('Error adding product: ', error);
        });
    }

     //update a product in product collection
     updateProducts(productId) {

        const product = this.products.find(item => item._id === productId);
        const { category, id, name, price, description, image } = product;

        updateDetails.innerHTML = "";

        updateDetails.innerHTML = `
        <h2>You are about to update product:</h2><p>${name}</p>

        <label for='new-product-category'>Product Category: </label>
        <input type='text' id='new-product-category' name='new-product-category' placeholder='${category}' required />

        <label for='new-product-id'>Product ID: </label>
        <input type='number' id='new-product-id' name='new-product-id' placeholder='${id}' required />

        <label for='new-product-name'>Product Name: </label>
        <input type='text' id='new-product-name' name='new-product-name' placeholder='${name}' required />

        <label for='new-product-price'>Product Price: </label>
        <input type='number' id='new-product-price' name='new-product-price' placeholder='${price}' required />

        <label for='new-product-description'>Product Description: </label>
        <input type='text' id='new-product-description' name='new-product-description' placeholder='${description}' required />

        <label for='new-product-image'>Product Image: </label>
        <input type='file' id='new-product-image' name='new-product-image' accept='image/png' placeholder='${image}' required />
        `;
    }

    postUpdate(productId) {
        //get input field values
        const category = document.getElementById('new-product-category').value;
        const id = document.getElementById('new-product-id').value;
        const name = document.getElementById('new-product-name').value;
        const price = document.getElementById('new-product-price').value;
        const description = document.getElementById('new-product-description').value;
        const image = document.getElementById('new-product-image').value;

        //creates the product object
        this.updatedProduct = {
            category,
            id,
            name,
            price,
            description,
            image
        }
    }

    //delete a product from the products collection
    deleteProduct(productId, action) {
        fetch(`/addProducts/${productId}`, {
            method: 'DELETE'
        })
        .then(res => {
            if(!res.ok) {
                throw new Error('Failed to delete product');
            }
            return res.json();
        })
        .then(data => {
            console.log(`Product with ID: ${productId} has been ${action}`);

            this.fetchProducts();
        })
        .catch(error => {
            console.log('Error deleting order: ', error);
        });
    }
}

const products = new Products();
console.log(products);

//opens the modal for adding item to the product list
const addProductBtn = document.querySelector('.add-product-btn');
addProductBtn.addEventListener('click', () => {
    toggleHidden(productContent);
    toggleHidden(addProductBtn);
    toggleFlex(addProdContent);
    toggleFlex(addToListBtn);

    products.openModal();
});

//adds an item to the product list
const addToListBtn = document.querySelector('.add-to-list-btn');
addToListBtn.addEventListener('click', () => {
    products.addProduct();
    toggleHidden(addProdContent);
    toggleHidden(addToListBtn);
    toggleFlex(productContent);
    toggleFlex(addProductBtn);
    
    products.fetchProducts();
});

//cancel button for adding products
const cancel = document.querySelector('.cancel-btn');
cancel.addEventListener('click', () => {
    toggleHidden(addProdContent);
    toggleHidden(addToListBtn);
    toggleFlex(productContent);
    toggleFlex(addProductBtn);
});

const finishUpdateBtn = document.querySelector('.finish-update-btn');
finishUpdateBtn.addEventListener('click', event => {
    toggleHidden(upProdContent);
    toggleHidden(addToListBtn);
    toggleFlex(productContent);
    toggleFlex(addProductBtn);
    const productIdInput = document.getElementById('new-product-id');
    const productId = productIdInput.value; // Get productId from the input field
    products.postUpdate(productId);
});

const cancelUpdate = document.querySelector('.cancel-update-btn');
cancelUpdate.addEventListener('click', () => {
    toggleHidden(upProdContent);
    toggleHidden(addToListBtn);
    toggleFlex(productContent);
    toggleFlex(addProductBtn);
});