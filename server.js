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
import {AccountDatabase} from './database.js'
import { processGET, processPOST } from './database.js';
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


//database==========================================================================

app.get('/', (req, res) => {  //send index.html at root
  res.sendFile("index");
  });

app.get('/search', (req, res) => { 
    //getProducts(keyword, limit, callback) takes in a keyword and limit and returns a product array 
    sneaks.getProducts(req.query.shoeName, 1, function(err, products){
    res.send(products[0]);
  });
    
});

//add searchN to search more than 1

app.get('/getTable', async (req, res) => {//database get request
  try {
    const client = await pool.connect();
    const result = await client.query(processGET(req.query.table));
    console.log("RESULTS: ", result);
    res.send(result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});


app.post('/postTable', async (req, res) => {//database post request
  try {
    const client = await pool.connect();
    const result = await client.query(processPOST(req.query.table));
    console.log("RESULTS: ", result);
    res.send(result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});


//crud functionality ==========================================================================

app.post('/createAccount', async (req, res) => {
  try {
    const { userName, userPass, userImg, userLocation, about, pairs, followers, following, favorites, owned, want } = req.query;
    const entry = await AccountDatabase.createAccount(userName, userPass, userImg, userLocation, about, pairs, followers, following, favorites, owned, want);
    res.send(entry);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/readAccount', async (req, res) => {
  try {
    const { userName} = req.query;
    const entry = await AccountDatabase.readAccount(userName);
    res.send(entry);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.delete('/removeAccount', async (req, res) => {
  try {
    const { userName } = req.query;
    const entry = await AccountDatabase.removeAccount(userName);
    res.send(entry);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post('/updateAccount', async (req, res) => {
  try {
    const { userName, followers, following } = req.query;
    const entry = await AccountDatabase.updateAccount(userName, followers, following);
    res.send(entry);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/postProduct', async (req, res) => {
  try {
    const { ownerUserName, ownerImage, shoeName, shoeDesc, datePosted } = req.query;
    const entry = await AccountDatabase.postProduct(ownerUserName, ownerImage, shoeName, shoeDesc, datePosted);
    res.send(entry);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/getProduct', async (req, res) => {
  try {
    const { ownerUserName, shoeName, datePosted } = req.query;
    const entry = await AccountDatabase.getProduct(ownerUserName, shoeName, datePosted);
    res.send(entry);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.listen(PORT || 8080, function() {//listen at process' port
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });