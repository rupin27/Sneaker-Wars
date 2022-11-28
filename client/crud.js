// let loginAuth = {
//     userName: String,
//     userPass: String,
//     userImg: Image,
//     userLocation: String,
//     about: String,
//     pairs: Number,
//     followers: Number,
//     following: Number,
// }
// , rent, income, postProduct, saving

// let shoeObject = {
//     ownerUserName: String,  
//     ownerImage: Image,
//     shoeName: String,
//     shoeDesc: String,
//     datePosted: Date
// }

//function to create new account
export async function createAccount(userName, userPass, userImg, userLocation, about, pairs, followers, following) {
    const response = await fetch(
      `/createAccount?userName=${userName}&userPass=${userPass}&userImg=${userImg}&userLocation=${userLocation}&about=${about}&pairs=${pairs}&followers=${followers}&following=${following}`,
      {
        method: 'POST',
      }
    );
    const data = await response.json();
    return data;
  }
  
  //function to remove account using userName
  export async function removeAccount(userName) {
    const response = await fetch(`/removeAccount?userName=${userName}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }
  
  //function to read user information from userName
  export async function readAccount(userName) {
    const response = await fetch(`/readAccount?userName=${userName}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }
  
  //function to handle updates to account on follow request/ vice verca 
  export async function updateAccount(userName, followers, following) {
    const response = await fetch(
      `/updateAccount?userName=${userName}&followers=${followers}&following=${following}`,
      {
        method: 'POST',
      }
    );
    const data = await response.json();
    return data;
  }

  //function to post a shoe
  export async function postProduct(ownerUserName, ownerImage, shoeName, shoeDesc, datePosted) {
    const response = await fetch(
      `/postProduct?ownerUserName=${ownerUserName}&ownerImage=${ownerImage}&shoeName=${shoeName}&shoeDesc=${shoeDesc}&datePosted=${datePosted}`,
      {
        method: 'POST',
      }
    );
    const data = await response.json();
    return data;
  }

  //function to get information for shoe
  export async function getProduct(ownerUserName, shoeName, datePosted) {
    const response = await fetch(
      `/getProduct?ownerUserName=${ownerUserName}&shoeName=${shoeName}&datePosted=${datePosted}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    return data;
  }