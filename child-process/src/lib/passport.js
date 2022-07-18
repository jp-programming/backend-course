const bcrypt = require('bcrypt');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const MongoContainer = require('./MongoContainer');

const users = new MongoContainer();

passport.use('register', new LocalStrategy(
    { usernameField: 'name', passwordField: 'password' },
    async (name, password, done) => {
        const user = await users.getByName(name);

        if (user) return done(null, false, { message: 'User already exists' });

        return bcrypt.hash(password, 10, async (err, hash) => {
            if (err) return done(err);

            const _id = await users.save({ name, password: hash });
            const user = { _id, name, password };

            return done(null, user);
        });
    }
));

passport.use('login', new LocalStrategy(
    { usernameField: 'name', passwordField: 'password' },
    async (name, password, done) => {
        const user = await users.getByName(name);
        
        if (!user) return done(null, false, { message: 'User not found' });

        return bcrypt.compare(password, user.password, (err, res) => {
            if (err) return done(err);
            if (!res) return done(null, false, { message: 'Wrong password' });

            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    const user = await users.getById(_id);
    done(null, user);
});

