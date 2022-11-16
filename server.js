'use strict';
import express from 'express';
import fs from 'fs';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
        res.send('Home');
    });
  
app.listen(port, () => {
        console.log('Listening on port ', port);
    });