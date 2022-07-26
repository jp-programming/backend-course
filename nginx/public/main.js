const socket = io.connect();

const logoutBtn = document.getElementById('logoutBtn');

const handleLogout = () => {
    location.href = '/app/logout';
}

logoutBtn.addEventListener('click', handleLogout);

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
        id: document.getElementById('email').value,
        name: document.getElementById('fname').value,
        surname: document.getElementById('surname').value,
        age: document.getElementById('age').value,
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value,
        text: document.getElementById('text').value,
        date: getFullDateHour()
    };

    document.getElementById('text').value = '';
    document.getElementById('text').focus();

    socket.emit('new-message', message);
};

document.getElementById('chat-form').addEventListener('submit', sendMessage);

const renderChat = messages => {
    if(!messages) return;

    const chatEl = document.getElementById('chat');

    const authorSchema = new normalizr.schema.Entity('authors');
    const messageSchema = new normalizr.schema.Entity('messages', {
        author: authorSchema
    });
    const chat = new normalizr.schema.Entity('chat', { 
        messages: [messageSchema]
    });
    
    const data = normalizr.denormalize(messages.result, chat, messages.entities);

    const reductionPercentage = (100 - ((JSON.stringify(data).length * 100) / 
        JSON.stringify(messages).length
    )).toFixed(2);

    document.getElementById('reducPer').innerText = 
        `Porcentaje de reducción: ${reductionPercentage}%`;

    const html = data.messages.map(msg =>
        `<div class="message">
            <img class="message-avatar" src=${msg.author.avatar}>
            <p class="message-date">${msg.date}</p>
            <p class="message-email">${msg.author.id}:</p>
            <p class="message-text">${msg.text}</p>
        </div>`
    ).join(" ");

    chatEl.innerHTML = html;
};

socket.on('messages', messages => renderChat(messages));