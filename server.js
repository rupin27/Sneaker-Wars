'use strict';
import express from 'express';
import fs from 'fs';

const app = express();
const port = 8080;
app.use(express.static('public'))
app.use(express.static('.'))
app.use(express.static('images'))

app.get('/', (req, res) => {
        //res.sendFile('index.html', { root: '.' })
        res.send("working");
    });
  
app.listen(port, () => {
        console.log('Listening on port ', port);
    });