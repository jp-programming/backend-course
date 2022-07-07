const { pd } = require('./script');
const { createProducts } = require('./lib/fakerProducts');
const FirebaseContainer = require('./lib/FirebaseContainer');
const { auth } = require('./middlewares/auth');
require('./lib/passport');

const express = require('express');
const session = require('express-session');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const passport = require('passport');

const app = express();
const MongoStore = require('connect-mongo');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const mongoURL = 'mongodb+srv://root:root@cluster0.pxkve3d.mongodb.net/sessions?retryWrites=true&w=majority';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));
app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoURL,
        mongoOptions: advancedOptions,
        ttl: 600
    }),
    secret: 'secretNotSecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/', auth, (req, res) => {
    res.render('main', { user: req.user.name });
});

app.get('/register', (req, res) => {
    if( req.isAuthenticated() ) res.redirect('/');
    else res.render('register');
});

app.post('/registerAuth', passport.authenticate('register', 
    { failureRedirect: '/register-error', successRedirect: '/login' }
));

app.get('/register-error', (req, res) => {
    res.render('register-error');
});

app.get('/login', (req, res) => {
    if( req.isAuthenticated() ) res.redirect('/');
    else res.render('login');
});

app.post('/loginAuth', passport.authenticate('login', 
    { failureRedirect: '/login-error', successRedirect: '/' }
));

app.get('/login-error', (req, res) => {
    res.render('login-error');
});

app.get('/logoutAuth', (req, res) => {
    req.logout(err => {
        res.redirect('/login')
    });
});

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