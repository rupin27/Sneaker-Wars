document.getElementById("sign_in").addEventListener('click', () => {
    
    window.localStorage.setItem("username", document.getElementById("username_input").value);
    window.localStorage.setItem("password", document.getElementById("password_input").value);
});

document.getElementById("register").addEventListener('click', () => {
    
    window.localStorage.setItem("username", document.getElementById("username_input").value);
    window.localStorage.setItem("password", document.getElementById("password_input").value);
});