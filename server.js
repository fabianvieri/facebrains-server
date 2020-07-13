const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'fabianvieri',
        password: '***',
        database: 'facebrains'
    }
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res, next) => {
    res.send(db.users);
});

app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', image.handleApi);

console.log(process.env.PORT);

app.listen(process.env.PORT || 3001, () => {
    console.log(`running server on port ${process.env.PORT}`);
});
