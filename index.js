const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const password = 'organicUser';

const uri = "mongodb+srv://organicUser:organicUser@cluster0.fvezj.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

client.connect(err => {
  const productCollection = client.db("organicdb").collection("products");

app.get('/products', (req, res) => {
    productCollection.find({}).limit(7)
    .toArray( (err, documents) => {
        res.send(documents);
    })
})

  app.post("/addProduct", (req, res) => {
    const product = req.body;
    productCollection.insertOne(product)
    .then(result => {
        console.log('data added successfully');
        res.send('success');
    })    
  })
  app.delete('/delete/:id', (req, res) => {
      productCollection.deleteOne({_id: ObjectID(req.params.id)})
      .then(result => {
          console.log(result);
      })
  })


});


app.listen(3000);