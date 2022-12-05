//simple example get query from table id
export function processGET(id){
    return (`SELECT * FROM ${id}`);
}

//simple example post query from table id
export function processPOST(id){
    return (`CREATE TABLE ${id} (
    userName VARCHAR ( 25 ) UNIQUE NOT NULL, 
    userPass VARCHAR ( 16 ) NOT NULL,
    userImg  VARCHAR ( 100 ),
    userLocation VARCHAR ( 50 ),
    about VARCHAR ( 256 ),
    pairs INTEGER,
    followers INTEGER,
    following INTEGER,
    favorites INTEGER[],
    owned INTEGER[],
    want INTEGER[]
    );`);
}


 export class AccountDatabase {

  async createAccount(userName, userPass, userImg, userLocation, about, pairs, followers, following) {
    const queryText =
      'INSERT INTO userObject (userName, userPass, userImg, userLocation, about, pairs, followers, following) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const res = await this.client.query(queryText, [userName, userPass, userImg, userLocation, about, pairs, followers, following]);
    return res.rows;
  }

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