const express = require("express")
const app = express()
const knex = require("knex")(require("./knexfile.js")["development"])
const cors = require("cors")

const port = 8080

app.get('/', cors(), (req,res) => {
    res.send('Application is up and running')
})

app.listen(port, () => {
    console.log(`Application running on ${port}.`)
})