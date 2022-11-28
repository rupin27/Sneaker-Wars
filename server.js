import express from 'express';
import SneaksAPI from 'sneaks-api';
const app = express();
const router = express.Router();
const sneaks = new SneaksAPI();
const PORT = process.env.PORT || 5000
app.use('/', express.static('./html'));

//database===========================================================================
import {processGET} from "./database.js";
import {processPOST} from "./database.js";
import pkg from "pg";
import { config } from 'dotenv';
const { Pool } = pkg;
const { Client } = pkg;


config();
const port = parseInt(process.env.PGPORT, 10) || 5000;
const name = process.env.PGUSER || "Sean";
console.log(name, " using ", port);


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

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

const self = this;
this.app.post('/createAccount', async (req, res) => {
  try {
    const { userName, userPass, userImg, userLocation, about, pairs, followers, following } = req.query;
    const entry = await self.db.createAccount(userName, userPass, userImg, userLocation, about, pairs, followers, following);
    res.send(entry);
  } catch (err) {
    res.status(500).send(err);
  }
});

this.app.get('/readAccount', async (req, res) => {
  try {
    const { userName} = req.query;
    const entry = await self.db.readAccount(userName);
    res.send(entry);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

this.app.delete('/removeAccount', async (req, res) => {
  try {
    const { userName } = req.query;
    const entry = await self.db.removeAccount(userName);
    res.send(entry);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

this.app.post('/updateAccount', async (req, res) => {
  try {
    const { userName, followers, following } = req.query;
    const entry = await self.db.updateAccount(userName, followers, following);
    res.send(entry);
  } catch (err) {
    res.status(500).send(err);
  }
});

this.app.post('/postProduct', async (req, res) => {
  try {
    const { ownerUserName, ownerImage, shoeName, shoeDesc, datePosted } = req.query;
    const entry = await self.db.postProduct(ownerUserName, ownerImage, shoeName, shoeDesc, datePosted);
    res.send(entry);
  } catch (err) {
    res.status(500).send(err);
  }
});

this.app.get('/getProduct', async (req, res) => {
  try {
    const { ownerUserName, shoeName, datePosted } = req.query;
    const entry = await self.db.getProduct(ownerUserName, shoeName, datePosted);//
    res.send(entry);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.listen(PORT || 5000, function(){//listen at process' port
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });