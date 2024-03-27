
const openCart = document.querySelector('.shopping-cart');
const closeCart = document.querySelector('.closeShop');
const cartContainer = document.querySelector('.cart-container');
const drinkList = document.querySelector('.drink-list');
const pastryList = document.querySelector('.pastry-list');
const main = document.querySelector('main');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');

const drinks = [
    {
        id: 1,
        name: 'Iced Americano',
        image: 'IcedAmericano.png',
        price: 99.00
    },
    {
        id: 2,
        name: 'Iced Caramel Macchiato',
        image: 'icedCaramelMacchiato.png',
        price: 125.00
    },
    {
        id: 3,
        name: 'Iced Latte',
        image: 'icedLatte.png',
        price: 110.00
    }, 
    {
        id: 4,
        name: 'Iced Matcha Latte',
        image: 'icedMatchaLatte.png',
        price: 125.00
    },
    {
        id: 5,
        name: 'Iced Mocha',
        image: 'icedMocha.png',
        price: 120.00
    }
]

const pastries = [
    {
        id: 1,
        name: "Butter Croissant",
        image: "ButterCroissant.png",
        price: 105.00
    },
    {
        id: 2,
        name: "Blueberry Bagel",
        image: "BlueberryBagel.png",
        price: 135.00
    },
    {
        id: 3,
        name: "Cheese Bacon Danish",
        image: "CheeseBaconDanish.png",
        price: 210.00
    },
    {
        id: 4,
        name: "Blueberry Muffin",
        image: "BlueberryMuffin.png",
        price: 165.00
    },
    {
        id: 5,
        name: "Waffle",
        image: "Waffle.png",
        price: 105.00
    }
]


const displayProducts = () => {
    drinks.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('beverage');
        newDiv.innerHTML = `
        <img src='../Ordering/Pictures/${value.image}'/>
        <div class='title'>${value.name}</div>
        <div class='price'>Php ${value.price.toLocaleString()}</div>
        <button onclick='addToCart(${key})'>Add to cart</button>
        `;
        drinkList.appendChild(newDiv);
    })

    pastries.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('pastry');
        newDiv.innerHTML = `
        <img src='../Ordering/Pictures/${value.image}'/>
        <div class='title'>${value.name}</div>
        <div class='price'>Php ${value.price.toLocaleString()}</div>
        <button onclick='addToCart(${key})'>Add to cart</button>
        `;
        pastryList.appendChild(newDiv);
    })
}

displayProducts();

openCart.addEventListener('click', () => {
    cartContainer.style.display === "none" ? 
    cartContainer.style.display = "flex" : 
    cartContainer.style.display = "none";
});

