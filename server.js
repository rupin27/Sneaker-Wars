'use strict';

import express from 'express';
import SneaksAPI from 'sneaks-api';
import pkgp from 'passport-local';
const LocalStrategy = pkgp.Strategy;
import passport from 'passport';

import {MiniCrypt} from './server/miniCrypt.js'
const mc = new MiniCrypt();
const app = express();
const router = express.Router();
const sneaks = new SneaksAPI();
const PORT = process.env.PORT || 8080
app.use('/', express.static('./html'));

//database===========================================================================
import { processGET, processPOST, createAccount, updateAccount, removeAccount, readAccount, findAccount } from './database.js';
import pkg from "pg";
import { config } from 'dotenv';
const { Pool } = pkg;
const { Client } = pkg;

config();
const port = parseInt(process.env.PGPORT, 10) || 8080;
const name = process.env.PGUSER || "team-beta";
console.log(name, " using ", port);


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

//database==========================================================================

// Passport configuration

const strategy = new LocalStrategy(
  async (username, password, done) => {
  if (!findUser(username)) {
  // no such user
    await new Promise((r) => setTimeout(r, 2000)); // two second delay
    return done(null, false, { 'message' : 'Wrong username' });
  }
  if (!validatePassword(username, password)) {
    // invalid password
    // should disable logins after N messages
    // delay return to rate-limit brute-force attacks
    await new Promise((r) => setTimeout(r, 2000)); // two second delay
    return done(null, false, { 'message' : 'Wrong password' });
  }
  // success!
  // should create a user object here, associated with a unique identifier
  return done(null, username);
  });

  let users = {}; // name : [salt, hash]
  // Sample test
  // const exampleSalt = '541818e33fa6e21a35b718bbd94d1c7f';
  // const exampleHash = '902f945dc114cdf04bb1b2bbcc2ccdef6e416fdb1dce93ed8f34dc6aac02eefaaaf5d65c657dec6e405efa977a26c8e41ff4eb3f46722fbd88779a25d1a22c5b';
  // console.log(mc.check('compsci326', exampleSalt, exampleHash)); // true
  // console.log(mc.check('nope', exampleSalt, exampleHash)); // false

  // Returns true iff the user exists.
  function findUser(username) {
    if (!users[username]) {
      return false;
    } 
    else {
      return true;
    }
  }

  // Returns true iff the password is the one we have stored.
  function validatePassword(name, pwd) {
    if (!findUser(name)) {
      return false;
    }
    if (mc.check(pwd, users[name][0], users[name][1])) {
      return true;
    }
    return false;
  }

  // Add a user to the "database".
  function addUser(name, pwd) {
    if (findUser(name)) {
      return false;
    }
    const [salt, hash] = mc.hash(pwd);
    users[name] = [salt, hash];
    // Now print the user database
    console.log(users);
    return true;
  }
    
  // Routes
  function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
    // If we are authenticated, run the next route.
      next();
    } 
    else {
    // Otherwise, redirect to the login page.
      res.redirect('/login');
    }
  }


//routing================================================================================================


app.get('/', (req, res) => {  //send index.html at root
	checkLoggedIn,
	(req, res) => {
    res.sendFile("index");
	}});

// Handle post data from the login.html form.
app.post('/login',
	 passport.authenticate('local' , {     // use username/password authentication
	     'successRedirect' : '/index',   // when we login, go to /private 
	     'failureRedirect' : '/login'      // otherwise, back to login
	 }));

// Handle the URL /login (just output the index.html file).
app.get('/login',
	(req, res) => res.sendFile('html/index.html',
				   { 'root' : __dirname }));

// Handle logging out (takes us back to the login page).
app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/index'); // back to login
});

// Like login, but add a new user and password IFF one doesn't exist already.
app.post('/register',
	 (req, res) => {
	     const username = req.body['username'];
	     const password = req.body['password'];
	     if (addUser(username, password)) {
		 res.redirect('/index'); //send them to now login and check if the account was created properly 
	     } else {
		 res.redirect('/register');  //register again 
	     }
	 });

// Register URL
app.get('/register',
	(req, res) => res.sendFile('html/register.html',
				   { 'root' : __dirname }));


//search for a sneaker by shoe name with the sneaks API and send a sneaker object
app.get('/search', (req, res) => { 
    //getProducts(keyword, limit, callback) takes in a keyword and limit and returns a product array 
    sneaks.getProducts(req.query.shoeName, 1, function(err, products){
    res.send(products[0]);
  });
    
});


//TODO: add searchN to show search results for more than 1 sneaker


//get the user table containing all user data for every account
app.get('/getTable', async (req, res) => {//database get request
  try {
    const client = await pool.connect();
    const result = await client.query(processGET());
    console.log("RESULTS: ", result);
    res.send(result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});


//create the user table
//note: this should only have to be called once since we use the same table for all the users
app.post('/postTable', async (req, res) => {//database post request to call one time to create our userObject table
  try {
    const client = await pool.connect();
    const result = await client.query(processPOST());
    console.log("RESULTS: ", result);
    res.send(result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});


//crud functionality ==========================================================================


// insert row in the user table for a new user account containing the given parameters
// userName:     string unique display name for user (max 25 chars)
// userPass:     string password to log in with (max 16 chars)
// userImg:      string link to an image for a user profile picture (max 100 chars)
// userLocation: string user's location (max 50 chars)
// about:        string representing information the user wishes to share about themself (max 256 chars)
// pairs:        int representing number of pairs of sneakers user owns
// followers:    int representing number of users following the user
// following:    int representing number of other users the user is following
// favorites:    string which is a stringified JSON of a list containing sneaker IDs of the user's favorite sneakers
// owned:        string which is a stringified JSON of a list containing sneaker IDS of the user's sneaker collection
// want:         string which is a stringified JSON of a list containing sneaker IDS of sneakers the user wants
app.post('/createAccount', async (req, res) => {
  try {
    const client = await pool.connect();
    const { userName, userPass, userImg, userLocation, about, pairs, followers, following, favorites, owned, want } = req.query;
    const entry = createAccount(userName, userPass, userImg, userLocation, about, pairs, followers, following, favorites, owned, want);
    const result = await client.query(entry);
    res.send(result);
    client.release();
  } catch (err) {
    res.status(500).send(err);
  }
});

//updates specified fields in account provided in user param
//params:
//user: specifies the userName of the row to update
//pass: password for user
//userName, userPass, userImg, userLocation, about, pairs, followers, following, favorites, owned, want:
//may provide up to 11 paramaters in this order to update their fields in the specified row
app.post('/updateAccount', async (req, res) => {
  try {
    const client = await pool.connect();
    const queryArray = req.query;
    const user = req.query.user;//specify which row by the userName (user is a separate param from userName so we are able to update that column if the user wants to change userName)
    const pass = req.query.pass;//password to make sure only the user can update their own account
    const entry = updateAccount(user, pass, queryArray);
    const result = await client.query(entry);
    res.send(result);
    client.release();
  } catch (err) {
    res.status(500).send(err);
  }
});


//remove row in user table containing specified userName and userPass
//params:
//userName
//userPass
app.delete('/removeAccount', async (req, res) => {
  try {
    const client = await pool.connect();
    const user = req.query.userName;
    const entry = removeAccount(user);
    const result = await client.query(entry);
    res.send(result);
    client.release();
  } catch (err) {
    res.status(500).send(err);
  }
});


//read row specified containing specified userName and userPass
//params:
//userName
//userPass
//NOTE: this sends all fields (INCLUDING PASSWORD) and should not be available to any other users
//TODO: create another endpoint for other users to view information that does not send password
app.get('/readAccount', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(readAccount(req.query.userName, req.query.userPass));
    console.log("RESULTS: ", result.rows[0]);
    res.send(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//find a user based on userName from the database
app.get('/findAccount', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(findAccount(req.query.userName));
    console.log("RESULTS: ", result.rows[0]);
    res.send(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});


//server listens at process' port or default
app.listen(PORT || 8080, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });