//if user is logged in, show their profile and genereate info from DB
//if not logged in, make modal directing to register/login page
let user = window.localStorage.getItem("userName");
let pass = window.localStorage.getItem("userPass");
(async function render(){
    const response = await fetch('/readAccount?userName=' + user + '&userPass=' + pass);
    if(response.ok){
        let sneakerJSON = await response.json();
        document.getElementById('sneaker').setAttribute('src', sneakerJSON.thumbnail);

        console.log("viewing " + user + '\'s profile');
    }else{
        alert('error fetching user');
    }

})();