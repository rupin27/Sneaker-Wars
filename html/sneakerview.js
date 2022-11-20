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