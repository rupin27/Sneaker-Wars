// document.getElementById("register").addEventListener('click', () => {
//     crud.createAccount(document.getElementById("username_input_reg").value, document.getElementById("password_input_reg").value, "none", "none", "none", "none", 0, 0, "none", "none", "none");
//  //                                    userName                                       userPass                                userImg userLocation about pairs followers, following, favorites, owned, want
//  });

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

// async function postUser() {
//     console.log('fetching user from DB');
//     const response = await fetch('/createAccount?userName=' + document.getElementById("username_input_reg").value + '&userPass=' + document.getElementById("password_input_reg").value + '&userImg=' + "none" + '&userLocation=' + "none" + '&about=' + "none" + '&pairs=' + 0 + '&followers=' + 0 + '&following=' + 0 + '&favorites=' + "none" + '&owned=' + "none" + '&want=' + "none");
//     if (response.ok) {
//         console.log("response ok");
//         let userJSON = await response.json();
//         console.log(userJSON)
//         alert("You have been registered successfully! Redirecting to the login page");
//     }
//     else {
//         alert('error fetching user');
//     }
// }
// document.getElementById("register").addEventListener('click', postUser);

// document.getElementById("register").addEventListener('click', () => {
//     try {
//         window.localStorage.setItem("username_for_reg", document.getElementById("username_input_reg").value);
//         window.localStorage.setItem("password_for_reg", document.getElementById("password_input_reg").value);
//         alert("You have been registered successfully! Redirecting to the login page");
//     }
//     catch(err) {
//         alert("Please try again");
//     }
// });

const response = await fetch('/createAccount', { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ userName: document.getElementById("username_input_reg").value, userPass: document.getElementById("password_input_reg").value, userImg: "none", userLocation: "none", about: "none", pairs: 0, followers: 0, following: 0, favorites: "none", owned: "none", want: "none" })
});
if (response.ok){ 
    console.log("response ok");
    let userJSON = await response.json();
} else { // error occurred
    alert('error fetching user');
}