let loginAuth = {
    userName: String,
    userPass: String,
    userImg: Image,
    userLocation: String,
    about: String,
    pairs: Number,
    followers: Number,
    following: Number,
    owned: Object
}

let shoeObject = {
    ownerUserName: String,  
    ownerImage: Image,
    shoeName: String,
    shoeDesc: String,
    datePosted: Date
}

//sample json object 
let owned = [
    {
        id: 1,
        apiLink: 'xyz'
    },
    {
        id: 2,
        apiLink: 'abc'
    }
]