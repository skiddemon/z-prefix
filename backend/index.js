const express = require("express");
const app = express();
const knex = require("knex")(require("./knexfile.js")["development"]);
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const { auth } = require('./auth.js');

app.use(express.json())
app.use(cors())

const port = 8080

app.get('/', (req, res) => {
    res.send('Application is up and running')
})

app.get('/items', (req, res) => {
    knex.select('*').from('items')
        .then(data => res.status(201).json(data))
})

app.post('/user/:manager', (req, res) => {
    console.log(req.body)
    let { username, password } = req.body
    let { manager } = req.params

    knex('users').select('username').where({ username: username })
        .then(data => {
            console.log(data[0])
            if (data[0].username === username) {
                console.log('username found')
                knex('users').select('hash').where({ username: manager })
                    .then(data => data[0].hash)
                    .then(hashedPass => {
                        bcrypt.compare(password, hashedPass).then(function (result) {
                            if (result === true) {
                                knex('users').where({ username: manager })
                                    .then(data => {
                                        res.cookie('authToken', 'test');
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
    //console.log(JSON.stringify(req.body))
    const { username, password } = req.body;
    console.log(username)
    bcrypt.hash(password, saltRounds, (err, hash) => {
        knex('users').insert({ username: username, hash: hash })
            .then(() => {
                knex.select().from('users').then((users) => res.send(users))
            })
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