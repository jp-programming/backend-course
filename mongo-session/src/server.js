require('dotenv').config();
const { pd } = require('./script');
const { createProducts } = require('./lib/fakerProducts');
const FirebaseContainer = require('./lib/FirebaseContainer.js');
const { auth } = require('./middlewares/auth');
const { login } = require('./middlewares/login');
const { logout } = require('./middlewares/logout');

const express = require('express');
const session = require('express-session');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const MongoStore = require('connect-mongo');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        mongoOptions: advancedOptions,
        ttl: 600
    }),
    secret: 'secretNotSecret',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');

app.get('/', auth, (req, res) => {
    res.render('main', { user: req.session.user });
});

app.get('/login', (req, res) => {
    if( req.session.user ) res.redirect('/');
    else res.render('login');
});

app.post('/loginAuth', login);
app.post('/logoutAuth', logout);

app.get('/products-test', (req, res) => {
    res.render('productsTest')
});

const chat = new FirebaseContainer('messages');

io.on('connection', async socket => {
    console.log('Client connected');

    socket.emit('products', await pd.getAll());
    socket.emit('messages', await chat.getAll());
    socket.emit('productsTest', createProducts());

    socket.on('new-product', async product => {
        await pd.insert(product);
        io.sockets.emit('products', await pd.getAll());
    });

    socket.on('new-message', async message => {
        await chat.save(message);
        io.sockets.emit('messages', await chat.getAll());
    });
});

const PORT = 8080;
const server = httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
server.on('error', (err) => console.log(err));