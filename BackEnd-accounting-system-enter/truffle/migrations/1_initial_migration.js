const Migrations = artifacts.require("Migrations");
const Expense = artifacts.require("Expense");
const Income = artifacts.require("Income");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Expense);
  deployer.deploy(Income);
};
