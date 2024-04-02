
const openCart = document.querySelector('.shopping-cart');
const closeCart = document.querySelector('.closeShop');
const cartList = document.querySelector('.cart-list');
const cartContainer = document.querySelector('.cart-container');
const orderDetails = document.querySelector('.order-details');
const drinkList = document.querySelector('.drink-list');
const pastryList = document.querySelector('.pastry-list');
const total = document.querySelector('.grand-total');
const quantity = document.querySelector('.quantity');

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

products.forEach((value) => {
    if(value.category === "beverage") {
        let newDiv = document.createElement('div');
        newDiv.classList.add('beverage');
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
        <div class='price'>Php ${value.price.toLocaleString()}</div>
        <button id='${value.id}' class='add-to-cart-btn'>Add to cart</button>`;

        drinkList.appendChild(newDiv);
    } else {
        let newDiv = document.createElement('div');
        newDiv.classList.add('pastry');
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
        <div class='price'>Php ${value.price.toLocaleString()}</div>
        <button id='${value.id}' class='add-to-cart-btn'>Add to cart</button>`;
        
        pastryList.appendChild(newDiv);
    }
});


openCart.addEventListener('click', () => {
    cartContainer.style.display === "none" ? 
    cartContainer.style.display = "flex" : 
    cartContainer.style.display = "none";
});

class ShoppingCart {
    constructor() {
      this.orders = [];
      this.quantity;
      this.count;
      this.total;
    }
  
    addItem(id) {
        const product = products.find((item) => item.id === id);
        const { name, price } = product;
    
        //creates a new array which adds and edits a quantity property to duplicated products in the shopping cart array 
        const existingProduct = this.orders.find((item) => item.id === id);
        if(existingProduct) {
            existingProduct.quantity++;
        } else {
            product.quantity = 1;
            this.orders.push(product);
        }
        this.quantity = product.quantity;

        // creates the html display for items added into cart
        const prodCount = document.querySelector(`.product-quantity-for-${id}`);
        const newDiv = document.createElement('div');
        newDiv.classList.add('product-container');

        if (this.quantity > 1) {
            prodCount.innerHTML = 
            `<button id='${id}' class='dec-qty-btn'>-</button>
             ${this.quantity} 
            <button id='${id}' class='inc-qty-btn'>+</button>`
        } else {
            newDiv.innerHTML += `
            <div class='product-name'>${name}</div>
            <div class='product-price'>Php ${price}</div>
            <div class='product-quantity-for-${id}'>
            <button id='${id}' class='dec-qty-btn'>-</button>
             ${this.quantity} 
             <button id='${id}' class='inc-qty-btn'>+</button>
            </div>`;
        cartList.appendChild(newDiv); 
        }
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
        }
        this.calculateTotal();
    }

    //counts the total number of products added to the cart and updates the quantity counter accordingly
    updateQtyDisplay() {
        let totalCount = 0;
        for(let i = 0; i < this.orders.length; i++) {
            totalCount += this.orders[i].quantity;
        }
        this.count = totalCount;
        quantity.innerHTML = this.count;
    }

    //calculates the total amount of products added to cart and updates the total amount display
    calculateTotal() {
        let grandTotal = 0;
        for(let i = 0; i < this.orders.length; i++) {
            grandTotal += (this.orders[i].quantity * this.orders[i].price);
        }
        this.total = grandTotal;
        total.textContent = "Total: Php " + this.total.toLocaleString();
    }

    emptyCart() {
        this.orders = [];
        this.quantity;
        this.count;
        this.total;

        cartList.innerHTML = "";
        quantity.innerHTML = 0;
        total.textContent = "Total: Php 0";
    }

    /*
    //MIGHT USE THIS IN THE FUTURE
    checkout() {
        for(let i = 0; i < this.orders.length; i++) {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = `
            <div>item: ${this.orders[i].name}</div>
            <div>price: ${this.orders[i].price}</div>
            <div>quantity: ${this.orders[i].quantity}</div>
            `;
            orderDetails.appendChild(newDiv);
        }
        orderDetails.innerHTML += `<div>total: Php ${this.total}</div>`;
    }*/




    //stores the orders into local storage for clients to access and expedite in real life
    checkout() {
        const orderList = JSON.parse(localStorage.getItem("orders")) || [];
        //creates an array that stores the destructured properties of orders to later store into local storage
        const descriptions = [];
        this.orders.forEach(({name, price, quantity}) => {
            const descriptionObj = {
                name: name,
                price: price,
                quantity: quantity
            }
            descriptions.push(descriptionObj);  
        })

        //construct the details of orders to be readable by client and customer upon confirming orders
        const orderObj = {
            id: `${Date.now()}`,
            descrption: descriptions,
            total: this.total
        }
        orderList.push(orderObj);
        localStorage.setItem('orders', JSON.stringify(orderList));
    }
}


const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

//event handler for add to cart button
[...addToCartBtns].forEach((btn) => {
    btn.addEventListener("click", (event) => {
        cart.addItem(Number(event.target.id));
        cart.updateQtyDisplay();
        cart.calculateTotal();
        console.log(cart);
    })
});

//event handler for plus button
document.addEventListener('click', (event) => {
    if(event.target.closest('.inc-qty-btn')) {
        cart.addItem(Number(event.target.id));
        cart.updateQtyDisplay();
        cart.calculateTotal();
        console.log(cart);
    }
});

//event handler for minus button
document.addEventListener('click', (event) => {
    if(event.target.closest('.dec-qty-btn')) {
        cart.decQty(Number(event.target.id));
        cart.updateQtyDisplay();
        cart.calculateTotal();
        console.log(cart);
    }
});

const clearCart = document.querySelector('.clear-cart');
clearCart.addEventListener('click', () => {
        cart.emptyCart();
});

const proceedCheckOut = document.querySelector('.checkout');
proceedCheckOut.addEventListener('click', () => {
    cart.checkout();
})