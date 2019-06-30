import * as firebase from 'firebase';
import { Modal } from 'antd';
import { saveAccount } from './firebaseDatabase';

function success() {
    Modal.success({
        title: 'Success',
        content: 'Please check your email',
        onOk: () => window.location.assign('/')
    });
}

function errorMessage1() {
    Modal.error({
        title: 'Error',
        content: 'Wrong your email',
    });
}

function errorMessage2() {
    Modal.error({
        title: 'Error',
        content: 'Email not found in system',
    });
}


function errorMessagePassword() {
    Modal.error({
        title: 'Error',
        content: 'Password is wrong',
    });
}

function errorMessageEmail() {
    Modal.error({
        title: 'Error',
        content: 'Email is wrong',
    });
}

function errorMessageNotVerify() {
    Modal.error({
        title: 'Error',
        content: 'Email is not verified',
    });
}

function errorMessagePasswordLessThanSix() {
    Modal.warning({
        title: 'Warning',
        content: 'Please input password more than 6 digits',
    });
}


export const handleSignUp = (email, password, firstname, lastname) => {
    if(password.length < 6){
        errorMessagePasswordLessThanSix();
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        const errorCode = error.errorCode
        const errorMessage = error.message
        console.log(error)
    }).then((sendEmailVerify) => {
        if (sendEmailVerify) {
            console.log(sendEmailVerify)
            if (sendEmailVerify === false) {
                return false;
            } else {
                saveAccount(email, firstname, lastname).then((res) => {
                    // console.log(res)
                    window.location.assign('/');
                }).catch((error) => {
                    console.log(error)
                });
                firebase.auth().currentUser.sendEmailVerification();
                firebase.auth().signOut();
                return true;
            }
        }
    })
}

export const toggleSignIn = function (email, password) {
    console.log("toggleSignin")
    return new Promise((resolve, reject) => {
        if (firebase.auth().currentUser) {
            // console.log(firebase.auth().currentUser)
            firebase.auth().signOut();
            window.location.assign('/');
        } else {
            // console.log("else toggleSignin")
            // if (email.length < 4) {
            //     console.log('please input your email address')
            //     reject()
            // }
            // if (password.length < 6) {
            //     console.log('please input your')
            //     reject()
            // }
            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch((error) => {
                    console.log("error toggleSignin")
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        console.log(error)
                        errorMessagePassword();
                        reject(1)

                    } else {
                        console.log(error)
                        errorMessageEmail();
                        reject(2)
                    }
                }).then((checkVerify) => {
                    console.log("then toggleSignin")
                    const user = firebase.auth().currentUser
                    firebase.auth().onAuthStateChanged(firebaseUser => {
                        if (firebaseUser) {
                            console.log(firebaseUser)
                            if (firebaseUser.emailVerified) {
                                console.log('Email is verified')
                                if (user != null) {
                                    const name = user.displayName
                                    const email = user.email
                                    const photoUrl = user.photoURL
                                    const emailVerified = user.emailVerified
                                    const uid = user.uid
                                    resolve()
                                }
                            } else {
                                console.log('Email is not verified')
                                firebase.auth().currentUser.sendEmailVerification();
                                firebase.auth().signOut();
                                window.location.assign('/');
                                reject()
                                errorMessageNotVerify();
                            }
                        }
                    })
                });
        }
    })
}

export const retrieveID = () => {
    firebase.auth().currentUser.getIdToken(true).then((idToken) => {
        // console.log(idToken)
    }).catch((error) => {
        console.log(error)
    })
}

export const forgotPassword = (email) => {
    console.log(email)
	firebase.auth().sendPasswordResetEmail(email).then(() => {
        success();
	}).catch((error) => {
		const errorCode = error.code
        if(errorCode === 'auth/invalid-email'){
            errorMessage2();
        } else if(errorCode === 'auth/user-not-found'){
            errorMessage1();
        }
		console.log(error)
	})
}