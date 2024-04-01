
const openCart = document.querySelector('.shopping-cart');
const closeCart = document.querySelector('.closeShop');
const cartList = document.querySelector('.cart-list');
const cartContainer = document.querySelector('.cart-container');
const drinkList = document.querySelector('.drink-list');
const pastryList = document.querySelector('.pastry-list');
const main = document.querySelector('main');
const total = document.querySelector('.grand-total');
const quantity = document.querySelector('.quantity');

isCartEmpty = true;

const products = [
    {
        id: 1,
        name: 'Iced Americano',
        image: 'IcedAmericano.png',
        price: 99.00,
        category: "beverage"
    },
    {
        id: 2,
        name: 'Iced Caramel Macchiato',
        image: 'icedCaramelMacchiato.png',
        price: 125.00,
        category: "beverage"
    },
    {
        id: 3,
        name: 'Iced Latte',
        image: 'icedLatte.png',
        price: 110.00,
        category: "beverage"
    }, 
    {
        id: 4,
        name: 'Iced Matcha Latte',
        image: 'icedMatchaLatte.png',
        price: 125.00,
        category: "beverage"
    },
    {
        id: 5,
        name: 'Iced Mocha',
        image: 'icedMocha.png',
        price: 120.00,
        category: "beverage"
    },
    {
        id: 6,
        name: "Butter Croissant",
        image: "ButterCroissant.png",
        price: 105.00,
        category: "pastry"
    },
    {
        id: 7,
        name: "Blueberry Bagel",
        image: "BlueberryBagel.png",
        price: 135.00,
        category: "pastry"
    },
    {
        id: 8,
        name: "Cheese Bacon Danish",
        image: "CheeseBaconDanish.png",
        price: 210.00,
        category: "pastry"
    },
    {
        id: 9,
        name: "Blueberry Muffin",
        image: "BlueberryMuffin.png",
        price: 165.00,
        category: "pastry"
    },
    {
        id: 10,
        name: "Waffle",
        image: "Waffle.png",
        price: 105.00,
        category: "pastry"
    }
]

products.forEach((value) => {
    if(value.category === "beverage") {
        let newDiv = document.createElement('div');
        newDiv.classList.add('beverage');
        newDiv.innerHTML = `
        <img src='../Ordering/Pictures/${value.image}'/>
        <div class='title'>${value.name}</div>
        <div class='price'>Php ${value.price.toLocaleString()}</div>
        <button id='${value.id}' class='add-to-cart-btn'>Add to cart</button>`;

        drinkList.appendChild(newDiv);
    } else {
        let newDiv = document.createElement('div');
        newDiv.classList.add('pastry');
        newDiv.innerHTML = `
        <img src='../Ordering/Pictures/${value.image}'/>
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
        isCartEmpty = false;
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
        
        if(this.quantity === 0) {
            this.orders = this.orders.filter((item) => item.id !== id);
            prodCount.parentElement.remove();
            this.calculateTotal();
        }
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
        total.textContent = "Total: Php " + this.total;
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
        console.log(isCartEmpty);
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
    window.confirm("Are you sure you want to empty cart?");
    if(window.confirm) {
        cart.emptyCart();
        isCartEmpty = true;
    }
});