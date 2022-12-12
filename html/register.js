import {MiniCrypt} from '../server/miniCrypt.js'
// userName VARCHAR UNIQUE NOT NULL, 
// userPass VARCHAR NOT NULL,
// userImg  VARCHAR,
// userLocation VARCHAR ( 50 ),
// about VARCHAR ( 256 ),
// pairs INTEGER,
// followers INTEGER,
// following INTEGER,
// favorites VARCHAR,
// owned VARCHAR,
// want VARCHAR

let users = {}
const mc = new MiniCrypt();
let userName = document.getElementById("username_input_reg").value
let userPass = document.getElementById("password_input_reg").value

document.getElementById("register").addEventListener('click', () => {
    (async function registerUser() {
        console.log('fetching user from DB');
        const response = await fetch('/createAccount?userName=' + userName + '&userPass=' + userPass + '&userImg=' + "none" + '&userLocation=' + "none" + '&about=' + "none" + '&pairs=' + 0 + '&followers=' + 0 + '&following=' + 0 + '&favorites=' + "none" + '&owned=' + "none" + '&want=' + "none", {method: 'POST'});
        if(response.ok){
            let userJSON = await response.json(); 
            let uName = userName; //userJSON.rows[0].username
            let uPass = userPass; //userJSON.rows[0].userpass
            let encryptedPassword = mc.hash(uPass);
            let salt = encryptedPassword[0];
            let hash = encryptedPassword[1];
            users.push([uName, salt, hash]);
            window.localStorage.setItem("users", JSON.stringify(users));
            alert("You have been registered successfully! Redirecting to the login page");
            }
            else{
                alert('error fetching user');
            }
    })();
});


