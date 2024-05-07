const orderContent = document.querySelector('.order-content');
const orderSpan = document.querySelector('.order-span');

const toggleHidden = (container) => {
    container.style.display = "none";
}

const toggleFlex= (container) => {
    container.style.display = "flex";
}

class Orders {
    constructor() {
        this.pendingOrders = [];
        this.ordersCount = 0;
        this.fetchOrders();
        this.pollInterval = setInterval(() => {
            this.fetchOrders();
        }, 10000);
    }

    //fetch orders in the data base
    fetchOrders() {
        fetch('/submitOrders')
        .then(res => res.json())
        .then(data => {
            this.pendingOrders = data;

            this.displayOrders(this.pendingOrders);

            this.ordersCount = this.pendingOrders.length;

            this.getOrdersCount();
        })
        .catch(error => {
            console.log(error);
        });
    }

    //display the orders in the container
    displayOrders(array) {
        orderContent.innerHTML = "";

        //iterates over all submited orders in the database and creates html for each
        array.forEach(value => {
            const { _id, name, contact, address, orders, total, orderedAt } = value;
            const date = new Date(orderedAt).toLocaleString();
        
            const newDiv = document.createElement('div');
            newDiv.classList.add('order-box');
            newDiv.innerHTML = `
                <div class='content-info'>
                    <div class='cs-name'>Date: ${date}</div>
                    <div class='cs-name'>Name: ${name}</div>
                    <div class='cs-contact'>Contact: ${contact}</div>
                    <div class='cs-address'>Address: ${address}</div>
                    <div class='cs-total'>Total Amount: Php ${total}</div>
                    <div class='cs-orders'>Orders: </div>
                </div>
                <div class='content-btns'>
                    <button data-order-id=${_id} class='reject-done-btn'>REJECT</button>
                    <button data-order-id=${_id} class='reject-done-btn'>DONE</button>
                </div>
            `;
            orderContent.appendChild(newDiv);
        
            const csOrders = newDiv.querySelector('.cs-orders');

            //creates an html display for each item in the orders
            orders.forEach(order => {
                const { name, quantity, comment } = order;
        
                const newDiv = document.createElement('div');
                newDiv.classList.add('order-div');
                newDiv.innerHTML += comment 
                ? `<div>${name}: ${quantity}</div>
                    <div>Comment: ${comment}</div>` 
                    : `<div>${name}: ${quantity}</div>`;
                csOrders.appendChild(newDiv);
            });
        });

         // Select all buttons with class 'reject-done-btn'
         const rejectDoneBtns = document.querySelectorAll('.reject-done-btn');
         // Iterate over each button and attach click event listener
         rejectDoneBtns.forEach(button => {
             button.addEventListener('click', event => {
                const orderId = event.target.dataset.orderId;
                const action = event.target.textContent.trim(); // Get the text content of the button ('Reject' or 'Done')
                this.markAsDoneOrReject(orderId, action);
                alert("Order has been removed from queue.");
             });
         });
    }

    markAsDoneOrReject(orderId, action) {
        fetch(`/submitOrders/${orderId}`, {
            method: 'DELETE'
        })
        .then(res => {
            if(!res.ok) {
                throw new Error('Failed to delete order.');
            }
            return res.json();
        })
        .then(data => {
            console.log(`Order with ID: ${orderId} has been ${action}`);

            this.fetchOrders();
        })
        .catch(error => {
            console.log('Error deleting order: ', error);
        });
    }

    getOrdersCount() {
        orderSpan.textContent = this.ordersCount;
        this.ordersCount === 0 ? toggleHidden(orderSpan) : toggleFlex(orderSpan);
    }

    // Clear the polling interval when the page is unloaded
    destroy() {
        clearInterval(this.pollInterval);
    }
}

//creates a new instance of the Orders class
const orders = new Orders();
console.log(orders);

// When the page is unloaded (e.g., when the user navigates away)
window.addEventListener('unload', () => {
    orders.destroy();
});