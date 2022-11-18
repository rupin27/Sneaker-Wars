/**
 * 'use strict';
import express from 'express';
import fs from 'fs'; 
const app = express();
const port = process.env.PORT || 8080;
app.use(express.static('public'))
app.use(express.static('.'))
app.use(express.static('images'))
*/
import express from 'express';
import path from 'path';
const app = express();
const PORT = process.env.PORT || 5000
app.use('/', express.static('./html'));

app.get('/', (req, res) => {  //send index.html at root
    res.sendFile("index");
  });

app.listen(process.env.PORT || 5000, function(){//listen at process' port
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });