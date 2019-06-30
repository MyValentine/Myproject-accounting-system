import { Modal } from "antd";
import 'antd/dist/antd.css';
const firebase = require("firebase");
// const $ = require("jquery");

require("firebase/firestore");
require("./firebaseConfig.js");

const db = firebase.firestore();
const expenseRef = db.collection('category-expense');
const userRef = db.collection('user');

function error() {
    Modal.error({
        title: 'Duplicated',
        content: 'This is duplicated data',
    });
}

{/* ------------------- User ------------------------- */}

export const saveAccount = (email,firstName,lastName) => {
    return new Promise((resolve, reject) => {
        console.log(firstName + " "+lastName)
        let temp = [];
        userRef.get().then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                // if(email === doc.data()){
                //     resolve();
                //     return;
                // }
                temp.push(doc.data().firstName+" "+doc.data().lastName);
            });
            userRef.add({
                email,
                firstName,
                lastName
            }).then(() => resolve())
            .catch(() => reject());
        });
    })
}

export const getAccount = () => {
    return new Promise((resolve, reject) => {
        userRef.get().then((querySnapshot) => {
            let data = [];
            querySnapshot.forEach(function (doc) {
                data.push(doc.data());
            })
            resolve(data);
        }).catch(() => reject());
    });
}


export const deleteAccount = (email) => {
    const currentUser = firebase.auth().currentUser;
    const dataQuery = userRef.where('email','==',email)
    return new Promise((resolve, reject) => {
        dataQuery.get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                doc.ref.delete();
            })
        }).then(function () {
            currentUser.delete().then(function () {
                // User deleted.
                console.log("user deleted");
                resolve();
            }).catch(function (error) {
                // An error happened.
                reject(error);
            });
        }).catch(() => reject());
    })
}

{/* ------------------- Expense Category ------------------------- */}

export const addExpenseCategory = (name) => {
    return new Promise((resolve, reject) => {
        expenseRef.get().then((querySnapshot) => {
            let temp = [];
            querySnapshot.forEach(function (doc) {
                console.log(doc.data().name)
                temp.push(doc.data().name);
                // if(name === doc.data().name){
                //     console.log("duplicate")
                //     reject("duplicated category");
                //     return;
                // }
            });
            console.log(temp.includes(name))
            if(temp.includes(name)){
                reject("duplicated");
                error();
                return;
            }else{
                expenseRef.add({
                    name
                }).then(() => resolve())
                .catch(() => reject());
            }
        });
    })
}

export const getExpenseCategory = () => {
    return new Promise((resolve, reject) => {
        expenseRef.get().then((querySnapshot) => {
            let category = [];
            querySnapshot.forEach(function (doc) {
                // console.log(doc.id," => ", doc.data());
                category.push(doc.data());
            });
            resolve(category);
        }).catch(() => reject());
    });
}

export const deleteExpenseCategory = (name) => {
    const dataQuery = expenseRef.where('name','==',name)
    return new Promise((resolve, reject) => {
        dataQuery.get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                doc.ref.delete();
            })
            resolve();
        }).catch(() => reject());
    })
}


{/* ------------------- Income Category ------------------------- */}

const incomeRef = db.collection('category-income');

export const addIncomeCategory = (name) => {
    return new Promise((resolve, reject) => {
        incomeRef.get().then((querySnapshot) => {
            let temp = [];
            querySnapshot.forEach(function (doc) {
                temp.push(doc.data().name)
                // if(name === doc.data().name){
                //     reject();
                //     return;
                // }
            });
            if(temp.includes(name)){
                reject("duplicated");
                error();
                return;
            }else{
                incomeRef.add({
                    name
                }).then(() => resolve())
                .catch(() => reject());
            }
        });
    })
}

export const getIncomeCategory = () => {
    return new Promise((resolve, reject) => {
        incomeRef.get().then((querySnapshot) => {
            let category = [];
            querySnapshot.forEach(function (doc) {
                // console.log(doc.id," => ", doc.data());
                category.push(doc.data());
            });
            resolve(category);
        }).catch(() => reject());
    });
}

export const deleteIncomeCategory = (name) => {
    const dataQuery = incomeRef.where('name','==',name)
    return new Promise((resolve, reject) => {
        dataQuery.get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                doc.ref.delete();
            })
            resolve();
        }).catch(() => reject());
    })
}

{/* -------------------------- Source ------------------------- */}

const sourceRef = db.collection('source');

export const addSource = (name) => {
    return new Promise((resolve, reject) => {
        sourceRef.get().then((querySnapshot) => {
            let temp = [];
            querySnapshot.forEach(function (doc) {
                temp.push(doc.data().name);
                // if(name === doc.data().name){
                //     reject("duplicated");
                //     return;
                // }
            });
            if(temp.includes(name)){
                reject("duplicated");
                error();
                return;
            }else{
                sourceRef.add({
                    name
                }).then(() => resolve())
                .catch(() => reject());
            }
        });
    })
}

export const getSource = () => {
    return new Promise((resolve, reject) => {
        sourceRef.get().then((querySnapshot) => {
            let source = [];
            querySnapshot.forEach(function (doc) {
                // console.log(doc.id," => ", doc.data());
                source.push(doc.data());
            });
            resolve(source);
        }).catch(() => reject());
    });
}

export const deleteSource = (name) => {
    const dataQuery = sourceRef.where('name','==',name)
    return new Promise((resolve, reject) => {
        dataQuery.get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                doc.ref.delete();
            })
            resolve();
        }).catch(() => reject());
    })
}








