// Illustration of how salts and hashes look and work
const exampleSalt = "541818e33fa6e21a35b718bbd94d1c7f";
const exampleHash =
    "902f945dc114cdf04bb1b2bbcc2ccdef6e416fdb1dce93ed8f34dc6aac02eefaaaf5d65c657dec6e405efa977a26c8e41ff4eb3f46722fbd88779a25d1a22c5b";
console.log(mc.check("compsci326", exampleSalt, exampleHash)); // true
console.log(mc.check("nope", exampleSalt, exampleHash)); // false

// Returns true iff the user exists.
async function findUser(username) {
    const result = await new Promise((resolve, reject) => {
        axios
            .post("http://localhost:" + port + "/api/findUser", {
                username,
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
    console.log("result:");
    console.log(result);
    return result;

    // if (!users[username]) {
    //     return false;
    // } else {
    //     return true;
    // }
}

// Returns true iff the password is the one we have stored.
async function validatePassword(name, pwd) {
    const result = await findUser(name);
    console.log("VALIDATING");
    console.log(result);
    console.log(result.exists);
    if (!result.exists) {
        console.log("exiting");
        return false;
    }
    if (mc.check(pwd, result.salt_hash[0], result.salt_hash[1])) {
        return true;
    }
    return false;
}

// Add a user to the "database".
async function addUser(username, pwd, email, name) {
    console.log("TESTING TESTING");
    const result = await findUser(username);
    console.log("ADDING USER");
    console.log(result);
    console.log(result["exists"]);
    if (result["exists"]) {
        return false;
    }
    console.log("HASHING PASSWORD");
    const salt_hash = mc.hash(pwd);
    console.log(salt_hash);
    const userData = { username, email, salt_hash, name };
    console.log("userData");
    console.log(userData);
    request.debug = true;
    const registered = await new Promise((resolve, reject) => {
        axios.post("http://localhost:" + port + "/api/registerUser", userData);
    });
    // Now print the user database
    console.log("User Created");
    return true;
}