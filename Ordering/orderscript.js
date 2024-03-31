
const openCart = document.querySelector('.shopping-cart');
const closeCart = document.querySelector('.closeShop');
const cartList = document.querySelector('.cart-list');
const cartContainer = document.querySelector('.cart-container');
const drinkList = document.querySelector('.drink-list');
const pastryList = document.querySelector('.pastry-list');
const main = document.querySelector('main');
const total = document.querySelector('.grand-total');
const quantity = document.querySelector('.quantity');

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

const shoppingCart = [];
const orderList = [];

const displayProducts = () => {
    products.forEach((value) => {
        if(value.category === "beverage") {
            let newDiv = document.createElement('div');
            newDiv.classList.add('beverage');
            newDiv.innerHTML = `
            <img src='../Ordering/Pictures/${value.image}'/>
            <div class='title'>${value.name}</div>
            <div class='price'>Php ${value.price.toLocaleString()}</div>
            <button onClick='addToCart(${value.id})'>Add to cart</button>
            `;
            drinkList.appendChild(newDiv);
        } else {
            let newDiv = document.createElement('div');
            newDiv.classList.add('pastry');
            newDiv.innerHTML = `
            <img src='../Ordering/Pictures/${value.image}'/>
            <div class='title'>${value.name}</div>
            <div class='price'>Php ${value.price.toLocaleString()}</div>
            <button onClick='addToCart(${value.id})'>Add to cart</button>
            `;
            pastryList.appendChild(newDiv);
        }
    })
}
displayProducts();

openCart.addEventListener('click', () => {
    cartContainer.style.display === "none" ? 
    cartContainer.style.display = "flex" : 
    cartContainer.style.display = "none";
});

const addToCart = (id) => {

     //adds the product to the cart list via the add to cart button
    const product = products.find((item) => item.id === id);
    const { name,price } = product;
    shoppingCart.push(product);

    //quantity counter for products added to cart
    let countPerProduct = {};
    shoppingCart.forEach((item) => {
        countPerProduct[item.id] = (countPerProduct[item.id] || 0) + 1;
    })
    const currentCount = countPerProduct[product.id];

    //creates a new array which adds and edits a quantity property to duplicated products in the shopping cart array 
    if(orderList.includes(product)) {
        product.quantity = currentCount;
    } else {
        product.quantity = 1;
        orderList.push(product);
    }

    // creates the html display for items added into cart
    const prodCount = document.querySelector(`.product-quantity-for-${id}`);
    currentCount > 1 ? prodCount.textContent = `${currentCount}` :
    cartList.innerHTML += `
        <div class='product-container'>
        <div class='product-name'>${name}</div>
        <div class='product-price'>Php ${price}</div>
        <div class='product-quantity-for-${id}'>${currentCount}</div>
        </div>`;
    
    updateQtyDisplay(orderList);
    calculateTotal(orderList);

    /*
    !USE THIS TO SEE WHAT HAPPENS TO THE DATA
    console.log(shoppingCart);
    console.log(countPerProduct);
    console.log(currentCount);
    console.log(orderList);
    */
}

//counts the total number of products added to the cart and updates the quantity counter accordingly
const updateQtyDisplay = (Array) => {
    let totalCount = 0;
    for(const prodCount in orderList) {
        totalCount += orderList[prodCount].quantity;
    }
    
    quantity.innerHTML = totalCount;
}

//calculates the total amount of products added to cart and updates the total amount display
const calculateTotal = (Array) => {
    let grandTotal = 0;
    for(let i = 0; i < Array.length; i++) {
        grandTotal += (Array[i].price * Array[i].quantity);
    }

    total.textContent = "Total: Php " + grandTotal;
}