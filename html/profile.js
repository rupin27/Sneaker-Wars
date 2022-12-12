//if user is logged in, show their profile and genereate info from DB
//if not logged in, make modal directing to register/login page
let user = window.localStorage.getItem("username");
let pass = window.localStorage.getItem("password");
(async function render(){
    console.log('fetching user from DB');
    const response = await fetch('/readAccount?userName=' + user + '&userPass=' + pass);
    if(response.ok){
        console.log("response ok");
        let userJSON = await response.json();
        console.log(userJSON)
        document.getElementById('username').innerText = userJSON.username;
        document.getElementById('location').innerText = userJSON.userlocation;
        document.getElementById('profilePicture').setAttribute('src', 'https://' + userJSON.userimg);
        document.getElementById('about').innerText = userJSON.about;
        document.getElementById('followers').innerText = userJSON.followers;
        document.getElementById('following').innerText = userJSON.following;


        let favList = JSON.parse(userJSON.favorites);
        for(let i = 0; i < favList.length; i++){
            const sneaker = await fetch('/search?shoeName='+ favList[i]);
            if(response.ok){
                let sneakerJSON = await sneaker.json();
                let child = document.createElement("div");
                child.setAttribute("id", favList[i]);
                child.innerHTML = `<a href="sneakerview.html"><img src = ${sneakerJSON.thumbnail} width="75"></a>`;
                child.addEventListener('click', ()=>{window.localStorage.setItem("search", favList[i])})
                document.getElementById('favoritesGrid').appendChild(child);
            }else{
                console.log("error fetching sneaker");
            }
        }


        let ownList = JSON.parse(userJSON.owned);
        for(let i = 0; i < ownList.length; i++){
            const sneaker = await fetch('/search?shoeName='+ ownList[i]);
            if(response.ok){
                let sneakerJSON = await sneaker.json();
                let child = document.createElement("div");
                child.setAttribute("id", "own" + i);
                child.innerHTML = `<a href="sneakerview.html"><img src = ${sneakerJSON.thumbnail} width="75"></a>`;
                child.addEventListener('click', ()=>{window.localStorage.setItem("search", ownList[i])})
                document.getElementById('ownedGrid').appendChild(child);
            }else{
                console.log("error fetching sneaker");
            }
        }


        let wantList = JSON.parse(userJSON.want);
        for(let i = 0; i < wantList.length; i++){
            const sneaker = await fetch('/search?shoeName='+ wantList[i]);
            if(response.ok){
                let sneakerJSON = await sneaker.json();
                let child = document.createElement("div");
                child.setAttribute("id", "want" + i);
                child.innerHTML = `<a href="sneakerview.html"><img src = ${sneakerJSON.thumbnail} width="75"></a>`;
                child.addEventListener('click', ()=>{window.localStorage.setItem("search", wantList[i])})
                document.getElementById('wantGrid').appendChild(child);
            }else{
                console.log("error fetching sneaker");
            }
        }


        console.log("viewing " + user + '\'s profile');
    }
    else{
        alert('error fetching user');
    }

})();