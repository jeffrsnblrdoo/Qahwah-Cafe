
const openCart = document.querySelector('.shopping-cart');
const closeCart = document.querySelector('.closeShop');
const cartList = document.querySelector('.cart-list');
const cartContainer = document.querySelector('.cart-container');
const formContainer = document.querySelector('.form-container');
const orderContainer = document.querySelector('.order-container');
const modalContainer = document.querySelector('.modal-container');
const modalContent = document.querySelector('.modal-content');
const orderReview = document.querySelector('.order-review');
const itemsContainer = document.querySelector('.items-container');
const ltoList = document.querySelector('.lto-list');
const drinkList = document.querySelector('.drink-list');
const pastryList = document.querySelector('.pastry-list');
const total = document.querySelector('.amount-total');
const quantity = document.querySelector('.quantity');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');
const modalBtn = document.querySelector('.modal-btn');
const customerName = document.getElementById('fname');
const customerNumber = document.getElementById('contact-number');
const customerAddress = document.getElementById('address');

//function for html display creation
const createDisplay = (value) => {
    let newDiv = document.createElement('div');
        newDiv.classList.add(value.category);
        newDiv.innerHTML = `
        <div class='flip-card'>
            <div class='flip-card-inner'>
                <div class='flip-card-front'>
                    <img loading='lazy' src='./images/${value.image}'/>
                </div>
                <div class='flip-card-back'>${value.description}</div>
            </div>
        </div>
        <div class='title'>${value.name}</div>
        <div class='price'>Php ${value.price.toLocaleString()}
        <button id='${value.id}' class='add-to-orders-btn'>+</button>
        </div>
        `;
        return newDiv;
}

//creates the display for the products array
fetch('/products')
    .then(res => res.json())
    .then(data => {
        data.forEach((value) => {
            switch (value.category) {
                case "lto":
                    ltoList.appendChild(createDisplay(value));
                    break;
                case "beverage":
                    drinkList.appendChild(createDisplay(value));
                    break;
                case "pastry":
                    pastryList.appendChild(createDisplay(value));
                    break;
                default:
                    break;
            }
        });

        const addToOrdersBtns = document.getElementsByClassName("add-to-orders-btn");
        [...addToOrdersBtns].forEach((btn) => {
            btn.addEventListener("click", (event) => {
                cart.showModal(Number(event.target.id));
                toggleContainerFlex(modalContainer);
                toggleContainerBlock(overlay);
                console.log(cart);
                return;
            });
        });
    })
    .catch(error => {
        console.log(error);
});


//toggles the display for cart
openCart.addEventListener("click", () => {
    orderContainer.style.display = orderContainer.style.display === "none" ? "flex" : "none";
});

//display togglers
const toggleContainerFlex = (container) => {
    container.style.display = "flex";
}

const toggleContainerBlock = (container) => {
    container.style.display = "block";
}

const toggleContainerHide = (container) => {
    container.style.display = "none";
}

class ShoppingCart {
    constructor() {
      this.cart = [];
      this.temp = [];
      this.order = {};
      this.count = 0;
      this.total = 0;
      this.products = [];
      this.fetchedProducts();
    }

    //fetch the products from the data base
    fetchedProducts() {
        fetch('/products')
            .then(res => res.json())
            .then(data => {
                this.products = data;
            })
            .catch(error => {
                console.log("ERROR FETCHING PRODUCTS: ", error);
            })
    }

    //checks if shopping cart is empty
    //returns boolean
    isCartEmpty() {
        return this.cart.length === 0;
    }

    //this function opens the order modal for the user
    showModal(id) {
        //searches the products array for any product that matches with element id
        //destructures the product and initialize a quantity of 1
        //assign that product to the order object
        const product = this.products.find((item) => item.id === id);
        const { name, price, description } = product;
        product.quantity = 1;
        this.order = product;
        //generates the product display for the modal based on the elements id that matches the products id
        const newDiv = document.createElement('div');
        newDiv.classList.add('order-details');
        //for beverages, adds a hot or iced choice
        if(product.category === "beverage") {
        newDiv.innerHTML = 
        `<div>
            <div class='title-div'><h1>${name}</h1></div>
            <div class='description-div'>${description}</div>
            <div class='price-div'><h3>Php ${price}</h3></div>
        </div>
        <hr>
        <div class="radioBtns">
            <h3>Hot or Iced</h3>
            <label for="iced">
                <input type="radio" id="iced" name="temperature" value="Iced" checked /> Iced
            </label>
            <label for="hot">
                <input type="radio" id="hot" name="temperature" value="Hot" /> Hot
            </label>
        </div>
        <div class="orderComment">
            <label for="comment">
                <h3>Special Instructions</h3>
                <p>Special requests are subject to the barista's/owner's approval. Tell us here!</p>
                <textarea id="comment" name="comment" placeholder="e.g. Light ice" rows="5" cols="67" style="resize: none"></textarea>
            </label>
        </div>
        <hr>
        <div class='modal-footer'>
            <div class='modal-qty'>
                <button id='${id}' class='modal-dec-btn'>-</button>
                <span class='modal-qty-span'>${this.order.quantity}</span>
                <button id='${id}' class='modal-inc-btn'>+</button>
            </div>
            <button id='${id}' class='add-to-cart-btn'>Add to cart</button>
        </div>`;
        } else {
            newDiv.innerHTML = 
        `<div>
            <div class='title-div'><h1>${name}</h1></div>
            <div class='description-div'>${description}</div>
            <div class='price-div'><h3>Php ${price}</h3></div>
        </div>
        <hr>
        <div class="orderComment">
            <label for="comment">
                <h3>Special Instructions</h3>
                <p>Special requests are subject to the barista's/owner's approval. Tell us here!</p>
                <textarea id="comment" name="comment" placeholder="e.g. no straw/untensils" rows="5" cols="67" style="resize: none"></textarea>
            </label>
        </div>
        <hr>
        <div class='modal-footer'>
            <div class='modal-qty'>
                <button id='${id}' class='modal-dec-btn'>-</button>
                <span class='modal-qty-span'>${this.order.quantity}</span>
                <button id='${id}' class='modal-inc-btn'>+</button>
            </div>
            <button id='${id}' class='add-to-cart-btn'>Add to cart</button>
        </div>`;
        }
        modalContent.append(newDiv);
        //disables the modal background so user can focus on order details
        //adds depth to the view
        body.classList.add('disabled-body');

        this.orderLimit(this.order.quantity);
    }

    //increase order quantity
    modal_incQty(id) {
        this.order.quantity++;

        const modalQty = document.querySelector('.modal-qty');
        modalQty.innerHTML = `<button id='${id}' class='modal-dec-btn'>-</button>
        <span class='modal-qty-span'>${this.order.quantity}</span>
        <button id='${id}' class='modal-inc-btn'>+</button>`;
    }

    //decrease order quantity
    modal_decQty(id) {
        this.order.quantity--;

        const modalQty = document.querySelector('.modal-qty');
        modalQty.innerHTML = `<button id='${id}' class='modal-dec-btn'>-</button>
        <span class='modal-qty-span'>${this.order.quantity}</span>
        <button id='${id}' class='modal-inc-btn'>+</button>`;
   
        this.orderLimit(this.order.quantity);
    }

    //set order limit to quantity of 1
    orderLimit(object) {
        if(object === 1) {
            const decQtyBtn = document.querySelector('.modal-dec-btn');
            decQtyBtn.style.cursor = "not-allowed";
            decQtyBtn.disabled = true;
            decQtyBtn.style.backgroundColor = "#815E5B";
        }
    } 

    //closes the modal to allow user to continue browsing products
    //this also resets the modal display for the next product to order
    closeModal() {
        toggleContainerHide(overlay);
        toggleContainerHide(modalContainer);
        body.classList.remove('disabled-body');
        modalContent.innerHTML = "";
        this.order = {};
    }

     //gets the value from temperature radio button
     temperature() {
        const radios = document.getElementsByName('temperature');
        for(let i = 0; i < radios.length; i++) {
            if(radios[i].checked) {
               return radios[i].value;
            }
        }
    }

    //adds the item into cart
    addItem() {
        //destructure the order to get and add important details
        const {category, id, name, price, quantity} = this.order;
        const drinkTemp = this.temperature();
        const comment = document.getElementById('comment').value;
        //adds the order into the a temporary array with the important details
        const newOrder = {
            category, 
            name,  
            price, 
            quantity, 
            comment
        }
        //if the order is beverage, adds a temperature property
        if(this.order.category === "beverage") {
            newOrder.temperature = drinkTemp;
            newOrder.id = `${id}_${drinkTemp}`;
        } else {
            newOrder.id = `${id}`;
        }

        this.temp.push(newOrder);

        this.updateCartDisplay(this.temp);
        this.updateQtyDisplay();
        this.calculateTotal();
    }

    //removes any duplicates in the array
    //makes sure that there is only 1 unique id-temperature object in the array with accumulated quantity
    //sets a new id for the product
    updateCartDisplay(array) {
        cartList.innerHTML = "";

        const uniqueOrder = {};

        array.forEach((order) => {
            if(uniqueOrder.hasOwnProperty(order.id)) {
                uniqueOrder[order.id].quantity += order.quantity;
            } else {
                uniqueOrder[order.id] = {...order};
                console.log(uniqueOrder);
            }
        });
        this.cart = Object.values(uniqueOrder);

        this.displayCartItems(this.cart);
    }

    //displays the items in the shopping cart
    displayCartItems(array) {
        //creates the html display for items added into cart
        array.forEach((item) => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('product-container');

            newDiv.innerHTML += item.category === "beverage" ? 
                newDiv.innerHTML += `
                <div class='product-name'>${item.temperature} ${item.name}</div>
                <div class='product-price'>Php ${item.price}</div>
                <div class='product-quantity-for-${item.id}'>
                <button id='${item.id}' class='dec-qty-btn'>-</button>
                ${item.quantity} 
                <button id='${item.id}' class='inc-qty-btn'>+</button>
                </div>`: 
                newDiv.innerHTML += `
                <div class='product-name'>${item.name}</div>
                <div class='product-price'>Php ${item.price}</div>
                <div class='product-quantity-for-${item.id}'>
                <button id='${item.id}' class='dec-qty-btn'>-</button>
                ${item.quantity} 
                <button id='${item.id}' class='inc-qty-btn'>+</button>
                </div>`
            cartList.appendChild(newDiv);
        });
    }

    //decrease quantity in the cart display and calculates the amount accordingly
    decQty(id) {
        const product = this.cart.find((item) => item.id === id);
        console.log(product);
        product.quantity -= 1;
        const tempProduct = this.temp.find((item) => item.id === id);
        tempProduct.quantity -= 1;
        
        const prodCount = document.querySelector(`.product-quantity-for-${id}`);
        prodCount.innerHTML = 
            `<button id='${id}' class='dec-qty-btn'>-</button>
             ${product.quantity} 
            <button id='${id}' class='inc-qty-btn'>+</button>`;
        //removes the item from cart and temporary array when the quantity is zero
        if(product.quantity === 0) {
            this.cart = this.cart.filter((item) => item.id !== id);
            this.temp = this.temp.filter((item) => item.id !== id);
            prodCount.parentElement.remove();
        }

        if(this.cart.length === 0) {
            cartList.innerHTML = `<h1>Your cart is currenty empty.</h1>`;
        }

        this.updateQtyDisplay();
        this.calculateTotal();
    }

    //increase quantity in the cart display and calculates the amount accordingly
    incQty(id) {
        const product = this.cart.find((item) => item.id === id);
        product.quantity += 1;
        const tempProduct = this.temp.find((item) => item.id === id);
        tempProduct.quantity += 1;

        const prodCount = document.querySelector(`.product-quantity-for-${id}`);
        prodCount.innerHTML = 
            `<button id='${id}' class='dec-qty-btn'>-</button>
             ${product.quantity} 
            <button id='${id}' class='inc-qty-btn'>+</button>`;

        this.updateQtyDisplay();
        this.calculateTotal();
    }

    //counts the total number of products added to the cart and updates the quantity counter accordingly
    updateQtyDisplay() {
        this.count = this.cart.reduce((acc, item) => acc + item.quantity, 0);
        quantity.innerHTML = this.count;
    }

    //calculates the total amount of products added to cart and updates the total amount display
    calculateTotal() {
        this.total = this.cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        total.textContent = this.total.toLocaleString();
    }

    //proceeds to payment review details for checking out
    //generates the order review for the checkout
    checkout() {
        this.cart.forEach((item) => {
            const newDiv = document.createElement('div');

            if(item.category === "beverage") {
                newDiv.innerHTML = `
                <p>Php ${item.price * item.quantity}</p>
                <p>${item.quantity}x ${item.temperature} ${item.name}</p>
            `;
            orderReview.appendChild(newDiv);
            } else {
                newDiv.innerHTML = `
                <p>Php ${item.price * item.quantity}</p>
                <p>${item.quantity}x ${item.name}</p>
            `;
            orderReview.appendChild(newDiv);
            }
        })
        orderReview.innerHTML += `<div>
        <h2>Amount to pay: <br><br>Php ${this.total.toLocaleString()}</h2>
        </div>`;
    }

     //clears cart
     emptyCart() {
        this.cart = [];
        this.temp = [];
        this.count = 0;
        this.total = 0;

        cartList.innerHTML = `<h1>Your cart is currenty empty.</h1>`;
        orderReview.innerHTML = "";
        quantity.innerHTML = this.count;
        total.textContent = this.total;
    }

    submit() {
        // Map orders to desired format
        const orders = this.cart.map(item => {
            if(item.category === "beverage") {
                return {
                    name: `${item.temperature} ${item.name}`,
                    quantity: item.quantity,
                    comment: item.comment
                }
            } else {
                return {
                    name: item.name,
                    quantity: item.quantity,
                    comment: item.comment
                }
            }
        });

        const timeStamp = Date.now().toString();
        const lastFive = timeStamp.substr(-5);

        // Create new order object
        const orderData = {
            id: `${customerName.value}-${lastFive}`,
            name: customerName.value,
            address: customerAddress.value,
            contact: customerNumber.value,
            orders,
            total: this.total
        };

        fetch('/submitOrders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(res => {
            if(!res.ok) {
                throw new Error("Failed to submit order");
            }
            return res.json();
        })
        .then(data => {
            console.log("Order submitted successfully: ", data);

            this.isCartEmpty();
        })
        .catch(error => {
            console.log("Error submitting orders: ", error);
        });
    }
}

const cart = new ShoppingCart();
//event handler for opening the order modal


//event handlers for closing the modal
overlay.addEventListener('click', () => {
    cart.closeModal();
});

modalBtn.addEventListener('click', () => {
    cart.closeModal();
});

//event handlers for the order modal functions
document.addEventListener('click', (event) => {
    if(event.target.closest('.add-to-cart-btn')) {
        cart.addItem();
        cart.closeModal();
        console.log(cart);
    } else if(event.target.closest('.modal-inc-btn')) {
        cart.modal_incQty();
    } else if(event.target.closest('.modal-dec-btn')) {
        cart.modal_decQty();
    }
});

//event handler for plus and minus button
document.addEventListener('click', (event) => {
    if(event.target.closest('.inc-qty-btn')) {
        cart.incQty(event.target.id);
    } else if(event.target.closest('.dec-qty-btn')) {
        cart.decQty(event.target.id);
        console.log(cart);
    }
});

//event handler for checking out
const proceedCheckOut = document.querySelector('.checkout');
proceedCheckOut.addEventListener('click', () => {
    if(!cart.isCartEmpty()) {
        cart.checkout();
        toggleContainerFlex(formContainer);
        toggleContainerHide(cartContainer);
        toggleContainerHide(itemsContainer);
        toggleContainerHide(openCart);
    } else {
        alert("Your cart is currently empty.");
    }
});

//event handler for editing orders before submiting order
const editBtn = document.querySelector('.edit-button');
editBtn.addEventListener('click', () => {
    toggleContainerFlex(cartContainer);
    toggleContainerHide(formContainer);
    toggleContainerBlock(itemsContainer);
    toggleContainerBlock(openCart);
    orderReview.innerHTML = "";
});

//empty shopping cart
const clearCart = document.querySelector('.clear-cart');
clearCart.addEventListener('click', () => {
    if(!cart.isCartEmpty()) {
        cart.emptyCart();
    } else {
        alert("Your cart is currently empty.");
    }   
});

//submit orders
const submit = document.querySelector('.submit-button');
submit.addEventListener('click', (event) => {
    cart.submit();
});