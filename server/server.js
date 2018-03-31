var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
// from filesystem
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
//configuring middleware - library
//with this middleware we can send JSON to our express application
app.use(bodyParser.json());
// Resource creation endpoint
app.post('/todos/addtodo', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});
// Listing resources endpoint
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});
// GET/todos/{The id that needs to be fetched} - fetch the value from url
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send('ObjectID is Invalid');
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
       res.status(404).send('Document Not Found');
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send('Bad Request');
  });
});

// DELETE API
app.get('/todos/remove/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send('ObjectID is invalid');
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
       res.status(404).send('Document Not Found');
    }
    res.send(todo);
  }).catch((e) => {
    res.status(400).send('Bad Request');
  });
});
app.listen(port, () => {
  console.log('Started on port : '+port);
});
// Implementation of pagination
app.get('/todos/paginate/:page', (req, res) =>{
    var perPage = 2;
    var page = req.params.page || 1;
   if(!checkForNumericVal(page)){
		res.status(400).send('Bad Request');
   }
    Todo.find({}).skip((perPage * page) - perPage).limit(perPage).then((todos) =>{
               res.send(todos);          
        }).catch((e) => {
    res.status(400).send('Bad Request');
  });
});
 function checkForNumericVal (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
module.exports = {app};