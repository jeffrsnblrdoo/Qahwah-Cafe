
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
const drinkList = document.querySelector('.drink-list');
const pastryList = document.querySelector('.pastry-list');
const total = document.querySelector('.amount-total');
const quantity = document.querySelector('.quantity');
const customerName = document.getElementById('fname');
const customerNumber = document.getElementById('contact-number');
const customerAddress = document.getElementById('address');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');
const modalBtn = document.querySelector('.modal-btn');

const products = [
    {
        id: 1, 
        name: 'Americano',
        image: 'IcedAmericano.png',
        description: 'Rich espresso paired with water for a bold, smooth taste.',
        price: 99.00,
        category: "beverage"
    },
    {
        id: 2,
        name: 'Caramel Macchiato',
        image: 'icedCaramelMacchiato.png',
        description: 'Velvety espresso balanced with creamy milk, topped with a decadent caramel drizzle.',
        price: 125.00,
        category: "beverage"
    },
    {
        id: 3,
        name: 'Caffe Latte',
        image: 'icedLatte.png',
        description: 'Smooth espresso combined with creamy milk, topped with a delicate foam.',
        price: 110.00,
        category: "beverage"
    }, 
    {
        id: 4,
        name: 'Matcha Latte',
        image: 'icedMatchaLatte.png',
        description: 'Vibrant matcha harmoniously blended with creamy milk.',
        price: 125.00,
        category: "beverage"
    },
    {
        id: 5,
        name: 'Caffe Mocha',
        image: 'icedMocha.png',
        description: 'Bold espresso, decadent chocolate, and creamy milk.',
        price: 120.00,
        category: "beverage"
    },
    {
        id: 6,
        name: "Butter Croissant",
        image: "ButterCroissant.png",
        description: 'Light, buttery pastry with a delicate flakiness.',
        price: 105.00,
        category: "pastry"
    },
    {
        id: 7,
        name: "Blueberry Bagel",
        image: "BlueberryBagel.png",
        description: 'Soft, chewy bagel infused with bursts of sweet blueberries.',
        price: 135.00,
        category: "pastry"
    },
    {
        id: 8,
        name: "Cheese Bacon Danish",
        image: "CheeseBaconDanish.png",
        description: 'Savory pastry filled with creamy cheese and crispy bacon.',
        price: 210.00,
        category: "pastry"
    },
    {
        id: 9,
        name: "Blueberry Muffin",
        image: "BlueberryMuffin.png",
        description: 'Moist muffin bursting with juicy blueberries.',
        price: 165.00,
        category: "pastry"
    },
    {
        id: 10,
        name: "Waffle",
        image: "Waffle.png",
        description: 'Crisp on the outside, fluffy on the inside, topped with whipped cream and syrup of choice.',
        price: 105.00,
        category: "pastry"
    }
]

//function for html display creation
const createDisplay = (value) => {
    let newDiv = document.createElement('div');
        newDiv.classList.add(value.category);
        newDiv.innerHTML = `
        <div class='flip-card'>
            <div class='flip-card-inner'>
                <div class='flip-card-front'>
                    <img loading='lazy' src='../Ordering/Pictures/${value.image}'/>
                </div>
                <div class='flip-card-back'>${value.description}</div>
            </div>
        </div>
        <div class='title'>${value.name}</div>
        <div class='price'>Php ${value.price.toLocaleString()}
        <button id='${value.id}' class='add-to-orders-btn'>+</button>
        </div>
        `;
        //<button id='${value.id}' class='add-to-cart-btn'>Add to cart</button>
        return newDiv;
}

//creates the display for the products array
products.forEach((value) => {
    const list = (value.category === "beverage") ? drinkList : pastryList;
    list.appendChild(createDisplay(value));
})

//toggles the display for cart
openCart.addEventListener('click', () => {
    orderContainer.style.display = orderContainer.style.display === "none" ? "flex" : "none";
});

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
      this.orders = [];
      this.cart = [];
      this.quantity = 0;
      this.count = 0;
      this.total = 0;
    }

    isCartEmpty() {
        return this.cart.length === 0;
    }
  
    //add items into cart
    showModal(id) {
        const product = products.find((item) => item.id === id);
        const { name, price, description } = product;

        //creates a new array which adds and edits a quantity property to duplicated products in the shopping cart array 
        const existingProduct = this.orders.find((item) => item.id === id);
        if(existingProduct) {
            existingProduct.quantity++;
        } else {
            product.quantity = 1;
            this.orders.push(product);
        }
        this.quantity = product.quantity;

        const newDiv = document.createElement('div');
        newDiv.classList.add('order-details');
        newDiv.innerHTML = 
        `<div>
            <div class='description-div'>${description}</div>
            <div class='title-div'>${name}</div>
            <div class='price-div'>Php ${price}</div>
        </div>
        <div class='modal-footer'>
            <div class='product-quantity-for-${id}'>
                <button id='${id}' class='dec-qty-btn'>-</button>
                ${this.quantity}
                <button id='${id}' class='inc-qty-btn'>+</button>
            </div>
            <button id='${id}' class='add-to-cart-btn'>Add to cart</button>
        </div>`
        modalContent.append(newDiv);

        if(this.quantity === 1) {
            const decQtyBtn = document.querySelector('.dec-qty-btn');
            decQtyBtn.style.cursor = "not-allowed";
            decQtyBtn.disabled = true;
            decQtyBtn.style.backgroundColor = "#815E5B";
        }
        body.classList.add('disabled-body');

        this.updateQtyDisplay();
        this.calculateTotal();
    }

    closeModal() {
        toggleContainerHide(overlay);
        toggleContainerHide(modalContainer);
        body.classList.remove('disabled-body');
        modalContent.innerHTML = "";
    }

    addItem(id) {
        this.cart.push(...this.orders);
        const product = this.cart.find((item) => item.id === id);
        const {name, price, quantity} = product;

        // creates the html display for items added into cart
        //const prodCount = document.querySelector(`.product-quantity-for-${id}`);
        const newDiv = document.createElement('div');
        newDiv.classList.add('product-container');
        var h1El = cartList.querySelector('h1');

        h1El.textContent = "";
        
        newDiv.innerHTML += `
            <div class='product-name'>${name}</div>
            <div class='product-price'>Php ${price}</div>
            <div class='product-quantity-for-${id}'>
                <button id='${id}' class='dec-qty-btn'>-</button>
                ${quantity}
                <button id='${id}' class='inc-qty-btn'>+</button>
            </div>`;
        cartList.appendChild(newDiv); 
        this.updateQtyDisplay();
        this.calculateTotal();
    }



    

    incQty(id) {
        const product = this.orders.find((item) => item.id === id);
        this.quantity = product.quantity += 1;

        const prodCount = document.querySelector(`.product-quantity-for-${id}`);
        prodCount.innerHTML = 
            `<button id='${id}' class='dec-qty-btn'>-</button>
             ${this.quantity} 
            <button id='${id}' class='inc-qty-btn'>+</button>`;
        
        this.updateQtyDisplay();
        this.calculateTotal();
    }

    //decrease quantity and calculates the amount accordingly
    decQty(id) {
        const product = this.orders.find((item) => item.id === id);
        this.quantity = product.quantity -= 1;
        
        const prodCount = document.querySelector(`.product-quantity-for-${id}`);
        prodCount.innerHTML = 
            `<button id='${id}' class='dec-qty-btn'>-</button>
             ${this.quantity} 
            <button id='${id}' class='inc-qty-btn'>+</button>`;
        
        //removes the item from cart list and orders array when the quantity is zero
        if(this.quantity === 0) {
            this.orders = this.orders.filter((item) => item.id !== id);
            prodCount.parentElement.remove();
        } else if(this.quantity === 1) {
            const decQtyBtn = document.querySelector('.dec-qty-btn');
            decQtyBtn.style.cursor = "not-allowed";
            decQtyBtn.disabled = true;
            decQtyBtn.style.backgroundColor = "#815E5B";
        }
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

    resetOrders() {
        this.orders = [];
        this.quantity = 0;
        this.count = 0;
        this.total = 0;
    }

    //clears cart
    emptyCart() {
        this.cart = [];
        this.quantity = 0;
        this.count = 0;
        this.total = 0;

        cartList.innerHTML = `<h1>Your cart is currenty empty.</h1>`;
        orderReview.innerHTML = "";
        quantity.innerHTML = this.count;
        total.textContent = this.total;
    }

    checkout() {
        this.orders.forEach((item) => {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = `
                <p>Php ${item.price * item.quantity}</p>
                <p>${item.quantity}x ${item.name}</p>
            `;
            orderReview.appendChild(newDiv);
        })
        orderReview.innerHTML += `<div>
        <h2>Amount to pay: <br><br>Php ${this.total.toLocaleString()}</h2>
        </div>`;
    }

    /*submit() {
        // Get existing orders from local storage
        const onlineOrders = JSON.parse(localStorage.getItem("order")) || [];

        //get values from input fields
        const csName = customerName.value;
        const csNum = customerNumber.value;
        const lastThree = csNum.substring(csNum.length - 3);
        const csAdd = customerAddress.value;

        // Map orders to desired format
        const orders = this.orders.map(item => `${item.name}: ${item.quantity}`);

        // Create new order object
        const orderList = {
            id: `${csName}-${lastThree}-${Date.now()}`,
            order: orders,
            price: this.total,
            address: csAdd
        };

        //push the order to the array that will be stored in local storage
        onlineOrders.push(orderList);
        localStorage.setItem('order', JSON.stringify(onlineOrders));
        this.emptyCart();
    }*/
}


const cart = new ShoppingCart();

const addToOrdersBtns = document.getElementsByClassName("add-to-orders-btn");
[...addToOrdersBtns].forEach((btn) => {
    btn.addEventListener("click", (event) => {
        cart.showModal(Number(event.target.id));
        toggleContainerFlex(modalContainer);
        toggleContainerBlock(overlay);
        console.log(cart);
        return;
    })
})

document.addEventListener("click", (event) => {
    if(event.target.closest('.add-to-cart-btn')) {
        cart.addItem(Number(event.target.id));
        cart.closeModal();
        cart.resetOrders();
        console.log(cart);
        return;
    }
})

overlay.addEventListener('click', () => {
    cart.closeModal();
})

modalBtn.addEventListener('click', () => {
    cart.closeModal();
})

//event handler for plus and minus button
document.addEventListener('click', (event) => {
    if(event.target.closest('.inc-qty-btn')) {
        cart.incQty(Number(event.target.id));
        console.log(cart);
    } else if(event.target.closest('.dec-qty-btn')) {
        cart.decQty(Number(event.target.id));
        console.log(cart);
    }
    return;
});

//empty shopping cart
const clearCart = document.querySelector('.clear-cart');
clearCart.addEventListener('click', () => {
    if(!cart.isCartEmpty()) {
        cart.emptyCart();
    } else {
        alert("Your cart is currently empty.");
    }
    return;  
});

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
    return;
});

const editBtn = document.querySelector('.edit-button');
editBtn.addEventListener('click', () => {
    toggleContainerFlex(cartContainer);
    toggleContainerHide(formContainer);
    toggleContainerBlock(itemsContainer);
    toggleContainerBlock(openCart);
    orderReview.innerHTML = "";
    return;
});

const submit = document.querySelector('.submit-button');
submit.addEventListener('click', () => {
    cart.submit();
    cart.emptyCart();
    window.location.href = "../Ordering/orderpage.html";
    return;
});

const order = this.order;
        const product = products.find((item) => item.id === order.id);
        const {name, price} = product;

        const existingProduct = this.cart.find((item) => item.id === product.id);
        if(product.quantity > 0) {
            if(existingProduct) {
                existingProduct.quantity++;
            } else {
                this.cart.push(product);
            }
        }
        
         // creates the html display for items added into cart
         const prodCount = document.querySelector(`.product-quantity-for-${id}`);
         const newDiv = document.createElement('div');
         newDiv.classList.add('product-container');
         var h1El = cartList.querySelector('h1');
 
         h1El.textContent = "";
 
         if (product.quantity > 1) {
             prodCount.innerHTML = 
             `<button id='${id}' class='dec-qty-btn'>-</button>
              ${product.quantity} 
             <button id='${id}' class='inc-qty-btn'>+</button>`
         } else {
             newDiv.innerHTML += `
             <div class='product-name'>${name}</div>
             <div class='product-price'>Php ${price}</div>
             <div class='product-quantity-for-${id}'>
             <button id='${id}' class='dec-qty-btn'>-</button>
              ${product.quantity} 
              <button id='${id}' class='inc-qty-btn'>+</button>
             </div>`;
         cartList.appendChild(newDiv); 
         }