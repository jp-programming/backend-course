const { pd, chat } = require('./script');

const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('main');
});

io.on('connection', async socket => {
    console.log('Client connected');

    socket.emit('products', await pd.getAll());
    socket.emit('messages', await chat.getAll());

    socket.on('new-product', async product => {
        await pd.insert(product);
        io.sockets.emit('products', await pd.getAll());
    });

    socket.on('new-message', async message => {
        await chat.insert(message);
        io.sockets.emit('messages', await chat.getAll());
    });
});

const PORT = 8080;
const server = httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
server.on('error', (err) => console.log(err));