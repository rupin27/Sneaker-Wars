import express from 'express';
import SneaksAPI from 'sneaks-api';
const app = express();
const router = express.Router();
const sneaks = new SneaksAPI();
const PORT = process.env.PORT || 5000
app.use('/', express.static('./html'));


app.get('/', (req, res) => {  //send index.html at root
  res.sendFile("index");
  });

app.get('/search', (req, res) => { 
    //getProducts(keyword, limit, callback) takes in a keyword and limit and returns a product array 
    sneaks.getProducts(req.query.shoeName, 1, function(err, products){
    res.send(products[0]);
  });
    
});

//add searchN to search more than 1


app.listen(PORT || 5000, function(){//listen at process' port
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });