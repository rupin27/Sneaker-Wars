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

document.getElementById("register").addEventListener('click', () => {
    (async function registerUser() {
        console.log('fetching user from DB');
        const response = await fetch('/createAccount?userName=' + document.getElementById("username_input_reg").value + '&userPass=' + document.getElementById("password_input_reg").value + '&userImg=' + "none" + '&userLocation=' + "none" + '&about=' + "none" + '&pairs=' + 0 + '&followers=' + 0 + '&following=' + 0 + '&favorites=' + "none" + '&owned=' + "none" + '&want=' + "none", {method: 'POST'});
        if(response.ok){
            let userJSON = await response.json(); 
            alert("You have been registered successfully! Redirecting to the login page");
            }
            else{
                alert('error fetching user');
            }
    })();
});


