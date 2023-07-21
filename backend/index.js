const express = require("express");
const app = express();
const knex = require("knex")(require("./knexfile.js")["development"]);
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const { auth } = require('./auth.js');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,withcredentials');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json())
app.use(cookieParser())

const port = 8080


app.get('/', (req, res) => {
    res.send('Application is up and running')
})

app.get('/items', (req, res) => {
    knex.select('*').from('items')
        .then(data => res.status(201).json(data))
})

app.post('/items', (req, res) => {
    const {userid, itemname, description, quantity} = req.body
    console.log(typeof userid, userid)
    console.log(typeof itemname, itemname)
    console.log(typeof description, description)
    console.log(typeof quantity, quantity)
  
    knex('items').insert({
        userid: userid,
        itemname: itemname,
        description: description,
        quantity: quantity
    })
    res.send('Well it got here')
})


app.get('/items/:manager', (req, res) => {
    const user = req.params.manager
    knex.select("id").from('users').where({ username: user })
        .then(id => {
            console.log('bigdick test',id)
            return id[0].id
        })
        .then(id => {
            console.log('id before knex', id)
            if (id !== undefined) {
                knex.select('*').from('items').where({ userid: id })
                    .then(data => res.status(201).send(data))
            } else {
                res.status(401).send("Action not permitted")
            }
        })
})

app.post('/user/:manager', (req, res) => {
    console.log(req.cookies.authToken)
})

app.post('/signup', (req, res) => {
    console.log('it made it here')
    const { firstname, lastname, username, password } = req.body
    bcrypt.hash(password, saltRounds, (err, hash) => {
        knex('users').insert({
            firstname: firstname,
            lastname: lastname,
            username: username,
            hash: hash
        })
            .then(() => {
                knex.select().from('users').where({ username: username })
                    .then(newUser => res.status(200).send(newUser))
            })
    })
})

app.get('/login', (req, res) => {
    knex.select().from('users')
        .then(data => {
            res.status(201).json(data);
        })
})


app.post('/login', (req, res) => {
    let { username, password } = req.body
    knex('users').select('id', 'username').where({ username: username })
        .then(data => {
            console.log('SELECT', data[0].id)
            if (data[0].username === username) {
                console.log(`Username: ${username} found`)
                knex('users').select('hash').where({ username: username })
                    .then(data => data[0].hash)
                    .then(hashedPass => {
                        bcrypt.compare(password, hashedPass).then(function (result) {
                            if (result === true) {
                                knex('users').where({ username: username })
                                    .then(data => {
                                        var opts = {
                                            maxAge: 600000,
                                            sameSite: 'strict'
                                        };
                                        res.cookie('authToken', username, opts);
                                        res.cookie('userID', data[0].id)
                                        res.status(201).send(data);
                                    })
                                console.log(`Auth sucessful for ${username}`)
                            } else {
                                console.log(`Auth failed for ${username}`)
                                res.status(401).send('Authentication failed')
                            }
                        })
                    })
            } else {
                console.log('username not found')
                res.status(400).send('Username not found')
            }
        })
})

// function setUser(req, res, next) {
//     const userID = req.body.userID
//     if (userID) {
//         req.user = users.find(user => user.id === userID)
//     }
//     next()
// }

app.listen(port, () => {
    console.log(`Application running on ${port}.`)
})