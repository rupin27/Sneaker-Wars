//simple example get query from table id
export function processGET(id){
    return (`SELECT * FROM ${id}`);
}

//simple example post query from table id
//TODO: add object param to post actual data
export function processPOST(id){
    return (`CREATE TABLE ${id} (user_id VARCHAR ( 25 ) UNIQUE NOT NULL, user_pass VARCHAR ( 16 ) NOT NULL);`);
}