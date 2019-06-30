#!/usr/bin/env nodejs
const express = require('express')
const API_PORT = 3001
const bodyParser = require('body-parser')
const app = express()

const expenseRouters = require('./expense.route')
const incomeRouters = require('./income.route')


//launch port
app.listen(API_PORT,() => console.log("Show port already"+API_PORT))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//web3 connect etherium
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// Allow Cross Domain
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}
app.use(allowCrossDomain)

// Routing
app.use("/api/expense",expenseRouters)
app.use("/api/income",incomeRouters)

app.get('/test', function (req, res) {
    res.send('hello world')
  })