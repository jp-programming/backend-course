require('dotenv').config();
const { pd } = require('./script');
const { createProducts } = require('./lib/fakerProducts');
const FirebaseContainer = require('./lib/FirebaseContainer');
const appRouter = require('./routers/appRouter');
const randomRouter = require('./routers/randomRouter');
const { infoRouter, cpus} = require('./routers/infoRouter');

const parseArgs = require('minimist');
const express = require('express');
const session = require('express-session');
const cluster = require('cluster');
const passport = require('passport');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
require('./lib/passport');  
const MongoStore = require('connect-mongo');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const options = { alias: { p: "PORT", mode: "MODE"}, default: { PORT: 8080, MODE: "FORK" } };
const { PORT, MODE } = parseArgs(process.argv.slice(2), options);


if(MODE === 'CLUSTER' && cluster.isPrimary) {
    const numCpus = cpus().length;
    
    console.log(`Cluster mode: ${numCpus} CPUs`);

    cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    for(let i = 0; i < numCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        console.log(`Worker ${process.pid} terminado`);
        cluster.fork();
    });
} else {
    const advancedOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('../public'));
    app.use(session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            mongoOptions: advancedOptions,
            ttl: 600
        }),
        secret: 'secretNotSecret',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/api/randoms', randomRouter);
    app.use('/info', infoRouter);

    app.set('view engine', 'ejs');
    app.use('/app', appRouter);

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

    const server = httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    server.on('error', (err) => console.log(err));
}