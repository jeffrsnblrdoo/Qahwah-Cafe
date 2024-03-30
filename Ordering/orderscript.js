
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
    
    const product = products.find((item) => item.id === id);
    const { name,price } = product;
    shoppingCart.push(product);

    const countPerProduct = {};
    shoppingCart.forEach((item) => {
        countPerProduct[item.id] = (countPerProduct[item.id] || 0) + 1;
    })

    const currentCount = countPerProduct[product.id];
    const prodCount = document.querySelector(`.product-quantity-for-${id}`);
    currentCount > 1 ? prodCount.textContent = `${currentCount}` : 
    cartList.innerHTML += `
        <div class='product-container'>
        <div class='product-name'>${name}</div>
        <div class='product-price'>${price}</div>
        <div class='product-quantity-for-${id}'>1</div>
        </div>`;
    
    let totalCount = 0;
    for (const productId in countPerProduct) {
        totalCount += countPerProduct[productId];
    }
    quantity.innerHTML = totalCount;
     
    calculateTotal();

    console.log(shoppingCart);
    console.log(countPerProduct);
    console.log(currentCount);
}

const calculateTotal = () => {
    
}