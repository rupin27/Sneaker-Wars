'use strict';
import express from 'express';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 8080;
app.use(express.static('public'))
app.use(express.static('.'))
app.use(express.static('images'))

app.get('/', (req, res) => {
        //res.sendFile('index.html', { root: '.' })
        console.log('get index.html request received');
        res.send("working");
    });
  
app.listen(port, () => {
        console.log('Listening on port ', port);
    });