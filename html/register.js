document.getElementById("register").addEventListener('click', () => {
    try {
        window.localStorage.setItem("username_for_reg", document.getElementById("username_input_reg").value);
        window.localStorage.setItem("password_for_reg", document.getElementById("password_input_reg").value);
        alert("You have been registered successfully! Redirecting to the login page");
    }
    catch(err) {
        alert("Please try again");
    }
});

// document.getElementById("register").addEventListener('click', () => {
//     crud.createAccount(document.getElementById("username_input_reg").value, document.getElementById("password_input_reg").value, "none", "none", "none", "none", 0, 0, "none", "none", "none");
//  //                                    userName                                       userPass                                userImg userLocation about pairs followers, following, favorites, owned, want
//  });

 (async function render(){
    console.log('fetching user from DB');
    const response = await fetch('/createAccount?userName=' + document.getElementById("username_input_reg").value + '&userPass=' + document.getElementById("password_input_reg").value + '&userImg=' + "none" + '&userLocation=' + "none" + '&about=' + "none" + '&pairs=' + "none" + '&followers=' + 0 + '&following=' + 0 + '&favorites=' + "none" + '&owned=' + "none" + '&want=' + "none");
    if (response.ok) {
        console.log("response ok");
        let userJSON = await response.json();
        console.log(userJSON)
        alert("You have been registered successfully! Redirecting to the login page");
    }
    else{
        alert('error fetching user');
    }

})();