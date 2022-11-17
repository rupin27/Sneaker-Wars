
/**
 * 'use strict';
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

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080
**/
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, '.'))
  .set('view engine', 'html')
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))