// //simple example get query from table id
// export function processGET(id){
//     return (`SELECT * FROM ${id}`);
// }

// //simple example post query from table id
// //TODO: add object param to post actual data
// export function processPOST(id){
//     return (`CREATE TABLE ${id} (user_id VARCHAR ( 25 ) UNIQUE NOT NULL, user_pass VARCHAR ( 16 ) NOT NULL);`);
// }

import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

export class AccountDatabase {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: { rejectUnauthorized: false }, 
    });

    this.client = await this.pool.connect();

    await this.init();
  }

  async init() {
    const queryText = `
      create table if not exists shoeObject(
          ownerUserName varchar(30),
          ownerImage VARBINARY(MAX),
          shoeName varchar(50),
          shoeDesc varchar(30),
          datePosted varchar(30),
      );

      create table if not exists userObject(
        userName varchar(30),
        userPass varchar(50),
        userImg VARBINARY(MAX),
        userLocation varchar(30),
        about varchar(30),
        pairs varchar(30),
        followers varchar(30),
        following varchar(30),
    );
    `;
    const res = await this.client.query(queryText);//
  }

  async close() {
    this.client.release();
    await this.pool.end();
  }
  
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

  async getSpending(ownerUserName, shoeName, datePosted){//
    const queryText = 
      'SELECT * FROM shoeObject WHERE ownerUserName = $1, shoeName = $2, datePosted = $3 ';
    const res = await this.client.query(queryText, [ownerUserName, shoeName, datePosted]);
    return res.rows;
  }
}