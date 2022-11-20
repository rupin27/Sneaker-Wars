//update the search field in local storage to use with sneakerview
const search = document.getElementById("searchbar");
search.addEventListener('keyup', () =>{window.localStorage.setItem("search",search.value);});
