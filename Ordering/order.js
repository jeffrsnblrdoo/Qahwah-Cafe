
const openCart = document.querySelector('.shopping-cart');
const closeCart = document.querySelector('.closeShop');
const list = document.querySelector('.list');
const listCart = document.querySelector('.listCart');
const main = document.querySelector('main');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');

openCart.addEventListener('click', () => {
    main.classList.add('active');
});

closeCart.addEventListener('click', () =>{
    main.classList.remove('active');
});

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
        image: 'icedMatchaLatte',
        price: 125.00
    },
    {
        id: 5,
        name: 'Iced Mocha',
        image: 'icedMocha.png',
        price: 120.00
    }
]

const listCarts = [];
const initApp = () => {
    drinks.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
        <img src='image/${value.image}'/>
        <div class='title'>${value.name}</div>
        <div class='price'>Php ${value.price.toLocaleString()}</div>
        <button onclick='addToCart(${key})'>Add to cart</button>
        `;
        list.appendChild(newDiv);
    })
}

initApp();

const addToCart = (key) => {
    if(listCarts[key] == null) {
        listCarts[key] = drinks[key];
        listCarts[key].quantity = 1;
    }
    reloadCart();
    
}

