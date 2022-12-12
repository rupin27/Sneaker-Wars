import MiniCrypt from '../server/miniCrypt.js'

let users = {}
const mc = new MiniCrypt();

let userName = document.getElementById("username_input").value
let userPass = document.getElementById("password_input").value

document.getElementById("sign_in").addEventListener('click', () => {
    let users = JSON.parse(window.localStorage.getItem("users"));
    let currUser = '';
    for (let i = 0; i < users.length; i++) {
        if (users[i][0] == userName) {
            currUser = users[i];
        }
        else {
            alert("Create an account first!")
        }
    }
    if (mc.check(userPass, currUser[1], currUser[2]) == true) {
        window.localStorage.setItem("username", userName);
        window.localStorage.setItem("password", userPass);
    }
});