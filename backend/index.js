const express = require("express");
const app = express();
const knex = require("knex")(require("./knexfile.js")["development"]);
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { auth } = require('./auth.js');


app.use(express.json())
app.use(setUser)
app.use(cors())

const port = 8080

app.get('/', (req, res) => {
    res.send('Application is up and running')
})

app.get('/manager', auth, (req, res) => {
    res.send('username adder tester')
    // res.cookie('cookie test for manager', {key: 'value', bitch: 'ass'})
    // knex.insert({username: 'testusername'}, {password: 'testpassword}'}).into('login')
})
//////////////////////////////////////////////////////////////////////////////
app.get('/login', (req, res) => {
    knex.select('*').from('login')
        .then(data => res.status(201).json(data))

})

app.post('/login', (req, res) => {
    //console.log(JSON.stringify(req.body))
    const { username, password } = req.body;
    console.log(username)
    bcrypt.hash(password, saltRounds, (err, hash) => {
        knex('login').insert({ username: username, hash: hash })
            .then(() => {
                knex.select().from('login').then((users) => res.send(users))
            })
    })
})

//////////////////////////////////////////////////////////////////////////////
function setUser(req, res, next) {
    const userID = req.body.userID
    if (userID) {
        req.user = users.find(user => user.id === userID)
    }
    next()

}

app.listen(port, () => {
    console.log(`Application running on ${port}.`)

})