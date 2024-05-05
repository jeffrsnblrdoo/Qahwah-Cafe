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

module.exports = createDisplay;