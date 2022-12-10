import { query } from "express";

//constant to use for creating new tables
const TABLE_NAME = 'userTable';

//simple get query from userObject table
export function processGET(){
    return (`SELECT * FROM ${TABLE_NAME}`);
}

//create userObject table for our database to use for storinng all user information (only call this once and use the table for all DB functions)
export function processPOST(){
    return (`CREATE TABLE ${TABLE_NAME} (
    userName VARCHAR ( 25 ) UNIQUE NOT NULL, 
    userPass VARCHAR ( 16 ) NOT NULL,
    userImg  VARCHAR ( 100 ),
    userLocation VARCHAR ( 50 ),
    about VARCHAR ( 256 ),
    pairs INTEGER,
    followers INTEGER,
    following INTEGER,
    favorites VARCHAR,
    owned VARCHAR,
    want VARCHAR
    );`);
}

//test function to create a row in table for one input
export function createEntry(input) {
  const queryText =
    `INSERT INTO ${TABLE_NAME} (userName) VALUES ('${input}') RETURNING *;`;
  console.log(queryText);
  return queryText;
}



//construct a string representing a sql query for server.js to use in its createAccount function
export function createAccount(userName, userPass, userImg, userLocation, about, pairs, followers, following, favorites, owned, want) {
  const queryText =
    `INSERT INTO ${TABLE_NAME} (userName, userPass, userImg, userLocation, about, pairs, followers, following, favorites, owned, want) 
    VALUES ('${userName}', '${userPass}', '${userImg}', '${userLocation}', '${about}', ${pairs}, ${followers}, ${following}, '${favorites}', '${owned}', '${want}') RETURNING *;`;
  return queryText;
}

export function updateAccount(user, paramArray) {
  let queryText = 'UPDATE ' + TABLE_NAME + ' SET ';
  let comma = '';
  console.log(queryText);
  if('userName' in paramArray){
    queryText = queryText + comma + 'userName = \'' + paramArray.userName + '\'';
    comma = ', ';
  }
  if('userPass' in paramArray){
    queryText = queryText + comma + 'userPass = \'' + paramArray.userPass + '\'';
    comma = ', ';
  }
  if('userImg' in paramArray){
    queryText = queryText + comma + 'userImg = \'' + paramArray.userImg + '\'';
    comma = ', ';
  }
  if('userLocation' in paramArray){
    queryText = queryText + comma + 'userLocation = \'' + paramArray.userLocation + '\'';
    comma = ', ';
  }
  if('about' in paramArray){
    queryText = queryText + comma + 'about = \'' + paramArray.about + '\'';
    comma = ', ';
  }
  if('pairs' in paramArray){
    queryText = queryText + comma + 'pairs = ' + paramArray.pairs;
    comma = ', ';
  }
  if('followers' in paramArray){
    queryText = queryText + comma + 'followers = ' + paramArray.followers;
    comma = ', ';
  }
  if('following' in paramArray){
    queryText = queryText + comma + 'following = ' + paramArray.following;
    comma = ', ';
  }
  if('favorites' in paramArray){
    queryText = queryText + comma + 'favorites = \'' + paramArray.favorites + '\'';
    comma = ', ';
  }
  if('owned' in paramArray){
    queryText = queryText + comma + 'owned = \'' + paramArray.owned + '\'';
    comma = ', ';
  }
  if('want' in paramArray){
    queryText = queryText + comma + 'want = \'' + paramArray.want + '\'';
    comma = ', ';
  }
  console.log(queryText);

  queryText = queryText + ' WHERE userName = \'' + user + '\' RETURNING *;';
  return queryText;
}

//create string representation of remove query to use in server.js removeAccount function
export function removeAccount(userName) {
  const queryText = 
  'DELETE FROM ' + TABLE_NAME + ' WHERE userName = \'' + userName + '\' RETURNING *;';
  return queryText;
}


export function readAccount(userName) {
  console.log('un: ' + userName);
  const queryText =
    'SELECT * FROM ' + TABLE_NAME + ' WHERE userName = \'' + userName + '\'';
  return queryText;
}

 export class AccountDatabase {



  async postProduct(ownerUserName, ownerImage, shoeName, shoeDesc, datePosted){
    let date = new Date();
    const queryText = 
      'INSERT INTO shoeObject (ownerUserName, ownerImage, shoeName, shoeDesc, datePosted) VALUES ($1, $2, $3, $4) RETURNING *';
    const res = await this.client.query(queryText, [ownerUserName, ownerImage, shoeName, shoeDesc, datePosted]);
    return res.rows;
  }

  async getProduct(ownerUserName, shoeName, datePosted){//
    const queryText = 
      'SELECT * FROM shoeObject WHERE ownerUserName = $1, shoeName = $2, datePosted = $3 ';
    const res = await this.client.query(queryText, [ownerUserName, shoeName, datePosted]);
    return res.rows;
  }
}