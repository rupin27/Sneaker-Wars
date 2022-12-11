document.getElementById("register").addEventListener('click', () => {
    try {
        window.localStorage.setItem("username_for_reg", document.getElementById("username_input_reg").value);
        window.localStorage.setItem("password_for_reg", document.getElementById("password_input_reg").value);
        alert("You have been registered successfully! Redirecting to the login page");
    }
    catch(err) {
        adddlert("Please try again");
    }
});



