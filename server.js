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

app.get('/', (req, res) => {
  db.collection('intolerances').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {intolerances: result})
  })
})

app.post('/intolerances', async (req, res) => {
  const intolerance = new intolerance(req.body);
  await intolerance.save();
  res.send(intolerance);
});
app.get('/intolerances', async (req, res) => {
  const intolerances = await intolerances.find();
  res.send(intolerances);
});
app.get('/intolerances/:id', async (req, res) => {
  const intolerance = await intolerance.findById(req.params.id);
  res.send(intolerance);
});

app.put('/intolerances/:id', async (req, res) => {
  const intolerance = await intolerance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(intolerance);
});

app.delete('/intolerances/:id', async (req, res) => {
  await Intolerance.findByIdAndDelete(req.params.id);
  res.send({ message: 'Intolerance deleted' });
});

// app.post('/messages', (req, res) => {
//   db.collection('messages').insertOne({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
//     if (err) return console.log(err)
//     console.log('saved to database')
//     res.redirect('/')
//   })
// })

// app.put('/messages', (req, res) => {
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbUp:req.body.thumbUp + 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

// app.delete('/messages', (req, res) => {
//   db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('Message deleted!')
//   })
// })
