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




 export class AccountDatabase {





  async removeAccount(userName) {
      const queryText = 'DELETE FROM userObject WHERE userName = $1 RETURNING *';
      const res = await this.client.query(queryText, [userName]);
      return res.rows;
  }
  
  async readAccount(userName) {
      const queryText =
        'SELECT * FROM userObject where userName = $1';
      const res = await this.client.query(queryText, [userName]);
      return res.rows;
  }

  async updateAccount(userName, followers, following) {
    const queryText =
      'UPDATE userObject SET followers = $2, following = $3 WHERE userName = $1 RETURNING *';
    const res = await this.client.query(queryText, [userName, followers, following]);
    return res.rows;
  }

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