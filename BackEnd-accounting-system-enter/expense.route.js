const express = require('express')
const expenseRouters = express.Router()
const { check, validationResult } = require('express-validator/check')
const Web3 = require('web3')
const ACCT_ADDRESS = '0x361a3aef620b1ff4662f88e039c4bce5773819c9'
const GAS_LIMIT = 1000000
const contract = require('truffle-contract')
const expenseJson = require('../BackEnd-accounting-system-enter/truffle/build/contracts/Expense.json')

// web3 connect etherium
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
let Expense = contract(expenseJson)
Expense.setProvider("http://localhost:8545")

// Create Expense
expenseRouters.route("/expense").post([
	check('date').not().isEmpty().withMessage('is required'),
	check('description').not().isEmpty().withMessage('is required'),
	check('amount').not().isEmpty().withMessage('is required'),
	check('total').not().isEmpty().withMessage('is required')
],async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array({onlyFirstError:true})})
    }else{
		console.log(req.body.isDelete)
        const result = await createExpense({
            date: req.body.date,
            selectedCategory: req.body.selectedCategory,
            description: req.body.description,
            amount: req.body.amount,
            total: req.body.total,
			selectedSource: req.body.selectedSource,
			isDelete: req.body.isDelete
        })
        console.log('Expense Create.');
        console.log(result);
        return res.send(result);
    }
})

// Update Data Expense.
expenseRouters.route("/expenseUpdate/").post([

],async(req,res) => {
	console.log(req.body)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array({onlyFirstError:true})})
    }else{
		console.log(req.body.isDelete)
        const result = await updateExpense({
			index: req.body.id,
            date: req.body.date,
            selectedCategory: req.body.selectedCategory,
            description: req.body.description,
            amount: req.body.amount,
            total: req.body.total,
			selectedSource: req.body.selectedSource,
			isDelete: req.body.isDelete
        })
        console.log('Expense Create.');
        // console.log(result);
        return res.send(result);
    }
})

const updateExpense = (req) => {
    const {
		index,
        date,
        selectedCategory,
        description,
        amount,
        total,
		selectedSource,
		isDelete
    } = req
    return new Promise((resolve, reject) => {
        Expense.deployed().then((instance) => {
			let data = instance
			resolve(data.update(
				index,
				date,
				selectedCategory,
				description,
				amount,
				total,
				selectedSource,
				isDelete,{
					from: ACCT_ADDRESS,
					gas: GAS_LIMIT
				}
			))
        })
    })
}

// Get Data Expense.
expenseRouters.route("/expense/:id").get(async (req,res) => {
	const result = await getExpense(req)
	var newResult = {}
	mergeResult(newResult,result)
	// console.log(newResult)
	res.send(newResult)
})

// Get All Data Expense.
expenseRouters.route('/expense').get(async (req, res) => {
	const result = await getAllExpense(req)
	console.log("get all data")
	var newResult = []
	resultToTable(newResult,result)
	// console.log(newResult)
	res.send(newResult)
})

const createExpense = (req) => {
    const {
        date,
        selectedCategory,
        description,
        amount,
        total,
		selectedSource,
		isDelete
    } = req
    return new Promise((resolve, reject) => {
        Expense.deployed().then((instance) => {
			let data = instance
			resolve(data.setData(
				date,
				selectedCategory,
				description,
				amount,
				total,
				selectedSource,
				isDelete,{
					from: ACCT_ADDRESS,
					gas: GAS_LIMIT
				}
			))
        })
    })
}

const getExpense = (req) => {
	const { id } = req.params
	console.log("test data")
	return new Promise((resolve, reject) => {
		Expense.deployed().then((instance) => {
			let data = instance
			resolve(data.getData(id,{
				from: ACCT_ADDRESS,
				gas: GAS_LIMIT
			}))
		})
	})
}

const getAllExpense = (req) => {
	const { id } = req.params
	return new Promise((resolve, reject) => {
		Expense.deployed().then((instance) => {
			let data = instance
			resolve(data.getAllData({
				from: ACCT_ADDRESS,
				gas: GAS_LIMIT
			}))
		})
	})
}


// ---------------------------------------------
const mergeResult = (newResult,data) => {
	for (var key in data) {
		if (isNaN(key)) {
			newResult[key] = data[key]
		}
	}
}

const resultToTable = (newResult,data) => {
	// var newResult = []
	for( i = 0 ; i < data.logs.length ; i++){
		var temp = {}
		for (var key in data.logs[i].args) {
			if (isNaN(key) && key != "length") {
				temp[key] = data.logs[i].args[key]
			}
		}
		newResult[i] = temp
	}
}

const hexToString = (data,k) => {
	if(Array.isArray(data)){
		// console.log('is Array')
		for (let i = 0 ; i < data.length ; i++) {
			for (var key in data[i]) {
				if (key == k) {
					for ( let j = 0 ; j < data[i][key].length ; j++){
						data[i][key][j] = web3.utils.hexToUtf8(data[i][key][j]);
					}
				}
			}
		}
	}else{
		// console.log('is object')
		for (var key in data) {
			if (key == k) {
				for ( let i = 0 ; i < data[key].length ; i++){
				data[key][i] = web3.utils.hexToUtf8(data[key][i]);
				}  
			}
		}
	}
}


module.exports = expenseRouters