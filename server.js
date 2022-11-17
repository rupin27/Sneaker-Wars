'use strict';
import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    console.log(__dirname + '\\index.html');
    res.sendFile(__dirname + '\\index.html');
    });
  
app.listen(port, () => {
        console.log('Listening on port ', port);
    });