const bcrypt = require('bcrypt');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const MongoContainer = require('./MongoContainer');

const users = new MongoContainer();

passport.use('register', new LocalStrategy( async (name, password, done) => {
    const user = await users.getByName(name);

    if (user) return done(null, false, { message: 'User already exists' });

    return bcrypt.hash(password, 10, async (err, hash) => {
        if (err) return done(err);

        const user = { name, password };
        await users.save({ ...user, password: hash });

        return done(null, user);
    });
}));

passport.use('login', new LocalStrategy((name, password, done) => {
    const user = users.getByName(name);
    console.log('User', name)
    if (!user) return done(null, false, { message: 'User not found' });

    return bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(err);
        if (!res) return done(null, false, { message: 'Wrong password' });

        return done(null, user);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await users.getById(id);
    done(null, user);
});