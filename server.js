const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://semerjiankrantschenda:Test123@auth.qpdes.mongodb.net/personalExpressApp?retryWrites=true&w=majority&appName=auth";
const dbName = "auth";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))


// Retrieve data
app.get('/', (req, res) => {
  db.collection('intoleranceList')
    .find()
    .toArray((err, result) => {
      if (err) return console.error(err);
      res.render('index.ejs', { intolerances: result });
    });
});

// Add new intolerance
app.post('/intolerances', (req, res) => {
  db.collection('intoleranceList').insertOne({ item: req.body.item }, (err, result) => {
    if (err) return console.error(err);
    console.log('Saved to database');
    res.redirect('/');
  });
});

app.put('/intolerances', (req, res) => {
  db.collection('intoleranceList').findOneAndUpdate(
    { item: req.body.oldItem }, // Find the old item
    { $set: { item: req.body.newItem } }, // Update it with the new item
    { returnDocument: 'after' }, // Optional: return the updated document
    (err, result) => {
      if (err) return res.status(500).send(err);
      console.log('Updated item:', req.body.newItem);
      res.send('Item updated');
    }
  );
});

// Delete an intolerance
app.delete('/intolerances', (req, res) => {
  db.collection('intoleranceList').findOneAndDelete({ item: req.body.item }, (err, result) => {
    if (err) return res.status(500).send(err);
    console.log('Deleted from database');
    res.send('Item deleted');
  });
});