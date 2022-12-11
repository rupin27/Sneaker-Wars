//constant to use for creating new tables
const TABLE_NAME = 'userTable';

//simple get query from every row in the user table
export function processGET(){
    return (`SELECT * FROM ${TABLE_NAME}`);
}

//create user table for our database to use for storinng all user information (only call this once and use the table for all DB functions)
export function processPOST(){
    return (`CREATE TABLE ${TABLE_NAME} (
    userName VARCHAR UNIQUE NOT NULL, 
    userPass VARCHAR NOT NULL,
    userImg  VARCHAR,
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

//create a string representing an insert query for server.js to use in its createAccount function
export function createAccount(userName, userPass, userImg, userLocation, about, pairs, followers, following, favorites, owned, want) {
  const queryText =
    `INSERT INTO ${TABLE_NAME} (userName, userPass, userImg, userLocation, about, pairs, followers, following, favorites, owned, want) 
    VALUES ('${userName}', '${userPass}', '${userImg}', '${userLocation}', '${about}', ${pairs}, ${followers}, ${following}, '${favorites}', '${owned}', '${want}') RETURNING *;`;
  return queryText;
}


//create a string representation of update query to use in server.js updateAccount function
export function updateAccount(user, pass, paramArray) {
  let queryText = 'UPDATE ' + TABLE_NAME + ' SET ';
  let comma = '';
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

  queryText = queryText + ' WHERE userName = \'' + user + '\' AND userPass = \'' + pass + '\' RETURNING *;';
  return queryText;
}

//create string representation of remove query to use in server.js removeAccount function
export function removeAccount(userName, userPass) {
  const queryText = 
  'DELETE FROM ' + TABLE_NAME + ' WHERE userName = \'' + userName + '\' AND userPass = \'' + userPass + '\' RETURNING *;';
  return queryText;
}

//create string representation of read query to use in server.js readAccount function
export function readAccount(userName, userPass) {
  const queryText =
    'SELECT * FROM ' + TABLE_NAME + ' WHERE userName = \'' + userName + '\' AND userPass = \'' + userPass + '\';';
  return queryText;
}

