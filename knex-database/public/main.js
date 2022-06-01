const socket = io.connect();

const addProduct = e => {
    e.preventDefault();

    const product = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };

    e.target.reset();

    socket.emit('new-product', product);
};

document.getElementById('product-form').addEventListener('submit', addProduct);

const renderProducts = products => {
    const productList = document.getElementById('products');

    if(!products) {
        productList.innerHTML = '<p>No se encontraron productos</p>';
        return;
    }

    const html = products.map(product => 
        `<div class="product">
            <p>${product.name}</p>
            <p>${product.price}</p>
            <img src="${product.thumbnail}" alt="${product.name}">
        </div>`
    ).join(" ");

    productList.innerHTML = html;
};

socket.on('products', products => renderProducts(products));

const getFullDateHour = () => {
    const date = new Date();
    
    const fullDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const fullHour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    
    return `[${fullDate} ${fullHour}]`;
};

const sendMessage = e => {
    e.preventDefault();

    const message = {
        email: document.getElementById('email').value,
        text: document.getElementById('text').value,
        date: getFullDateHour()
    };

    document.getElementById('text').value = '';
    document.getElementById('text').focus();

    socket.emit('new-message', message);
};

document.getElementById('chat-form').addEventListener('submit', sendMessage);

const renderChat = messages => {
    const chat = document.getElementById('chat');

    if(!messages) return;

    const html = messages.map(msg =>
        `<div class="message">
            <p class="message-date">${msg.date}</p>
            <p class="message-email">${msg.email}:</p>
            <p class="message-text">${msg.text}</p>
        </div>`
    ).join(" ");

    chat.innerHTML = html;
};

socket.on('messages', messages => renderChat(messages));