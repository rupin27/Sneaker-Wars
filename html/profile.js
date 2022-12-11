//if user is logged in, show their profile and genereate info from DB
//if not logged in, make modal directing to register/login page
// (async function render(){
//     const response = await fetch('/readAccount'+ input);
//     if(response.ok){
//         let sneakerJSON = await response.json();
//         document.getElementById('sneaker').setAttribute('src', sneakerJSON.thumbnail);
//         document.getElementById('sneaker').setAttribute('alt', sneakerJSON.shoeName);
//         document.getElementById('shoeName').innerText = sneakerJSON.shoeName;
//         document.getElementById('releaseDate').innerText = sneakerJSON.releaseDate;
//         document.getElementById('retail').innerText = '$' + sneakerJSON.retailPrice;
//         document.getElementById('description').innerText = sneakerJSON.description;
//         document.getElementById('stockx').innerText = sneakerJSON.resellLinks["stockX"];
//         document.getElementById('stockx').setAttribute("href",sneakerJSON.resellLinks["stockX"]);
//         document.getElementById('goat').innerText = sneakerJSON.resellLinks["goat"];
//         document.getElementById('goat').setAttribute("href",sneakerJSON.resellLinks["goat"]);
//         document.getElementById('flightClub').innerText = sneakerJSON.resellLinks["flightClub"];
//         document.getElementById('flightClub').setAttribute("href",sneakerJSON.resellLinks["flightClub"]);

//         console.log("viewing " + sneakerJSON.shoeName);
//     }else{
//         alert('error fetching sneaker');
//     }

// })();