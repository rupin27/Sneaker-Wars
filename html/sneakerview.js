let url = window.location.search;
url = url.slice(url.indexOf('=') + 1);//get shoe name from query
url = url.replaceAll('+', ' ')
let input = window.localStorage.getItem("search") ?? url;
window.localStorage.removeItem("search");
(async function render(){
    const response = await fetch('/search?shoeName='+ input);
    if(response.ok){
        let sneakerJSON = await response.json();
        document.getElementById('sneaker').setAttribute('src', sneakerJSON.thumbnail);
        document.getElementById('sneaker').setAttribute('alt', sneakerJSON.shoeName);
        document.getElementById('shoeName').innerText = sneakerJSON.shoeName;
        document.getElementById('releaseDate').innerText = sneakerJSON.releaseDate;
        document.getElementById('retail').innerText = '$' + sneakerJSON.retailPrice;
        document.getElementById('description').innerText = sneakerJSON.description;
        document.getElementById('styleID').innerText = sneakerJSON.styleID;
        document.getElementById('stockx').innerText = sneakerJSON.resellLinks["stockX"];
        document.getElementById('stockx').setAttribute("href",sneakerJSON.resellLinks["stockX"]);
        document.getElementById('goat').innerText = sneakerJSON.resellLinks["goat"];
        document.getElementById('goat').setAttribute("href",sneakerJSON.resellLinks["goat"]);
        document.getElementById('flightClub').innerText = sneakerJSON.resellLinks["flightClub"];
        document.getElementById('flightClub').setAttribute("href",sneakerJSON.resellLinks["flightClub"]);

        console.log("viewing " + sneakerJSON.shoeName);
    }else{
        alert('error fetching sneaker');
    }

})();

document.getElementById("addFav").addEventListener('click', ()=>{
    (async function postToList(){



        //get favorites from user account
        let favList = [];
        (async function getFavs(){
            console.log('fetching user from DB');
            const response = await fetch('/readAccount?userName=' + window.localStorage.getItem('username') + '&userPass=' + window.localStorage.getItem('password'));
            if(response.ok){
                let userJSON = await response.json(); 
        
                //get old favorites list
                favList = JSON.parse(userJSON.favorites);


                 //push style id to favorites list
                favList.push(document.getElementById('styleID').innerText);

            }else{
                alert('error fetching user');
            }


            //update user account with new favorites list
            const res2 = await fetch('/updateAccount?user=' + window.localStorage.getItem('username') + '&pass=' + window.localStorage.getItem('password') + '&favorites=' + 
            JSON.stringify(favList), {method: 'POST'});
            if(res2.ok){
                console.log("Added " + document.getElementById('styleID').innerText + " to favorites");
            }else{
                alert('error adding sneaker');
            }


        })();
    })();
});