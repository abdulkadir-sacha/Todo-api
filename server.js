var express = require('express')
var bodyParse = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var app = express()
var PORT = process.env.PORT || 3000;
var todos = []
var todoNextId = 1;

app.use(bodyParse.json());
app.get('/', function(req, res) {
  res.send('TODO Api Root ! Yo');
});

//GET /todos?completed=false&q=work
app.get('/todos', function(req, res) {
  var queryParams = req.query;
  var where = {};


  
  if (queryParams.hasOwnProperty("completed") && queryParams.completed === 'true') {

   where.completed=true;

  } else if (queryParams.hasOwnProperty("completed") && queryParams.completed === 'false') {

    where.completed=false;
  }



  if (queryParams.hasOwnProperty("q") && queryParams.q.length > 0) {

    where.description={
      $like:'%'+queryParams.q+'%'
    }
  }

db.todo.findAll({where:where}).then(function(todos) {

    if (todos) {

      res.json(todos);

    }else{
          res.status(404).send("Not found");
    }

  },function(e){
    res.status(500).send();
  });


});


//GET /todos/id
app.get('/todos/:id', function(req, res) {

  var reqTodo = parseInt(req.params.id, 10);
  db.todo.findById(reqTodo).then(function(todo) {

    if (!!todo) {
      res.json(todo);
    } else {
      res.status(404).send();
    }
  }, function(e) {
    res.status(500).send();
  });

});



// POST /todos

app.post('/todos', function(req, res) {

  var body = _.pick(req.body, 'description', 'completed');

  db.todo.create(body).then(function(todo) {

    res.status(200).json(todo);
  }, function(e) {

    res.status(400).json(e);

  }).catch(function(e) {

    res.status(400).json(e);

  });

  
});

// DELETE /todos/:id

app.delete('/todos/:id', function(req, res) {

  var reqTodo = parseInt(req.params.id, 10);
  var matchTodo = _.findWhere(todos, {
    id: reqTodo
  });

  if (matchTodo) {
    todos = _.without(todos, matchTodo)
    res.json(matchTodo);
  } else {
    res.status(404).json({
      "error": "this id is not exists"
    });
  }

});



// PUT /todos:id
app.put('/todos/:id', function(req, res) {

  var reqTodo = parseInt(req.params.id, 10);
  var matchTodo = _.findWhere(todos, {
    id: reqTodo
  });
  console.log(req.body);
  var body = _.pick(req.body, 'description', 'completed');
  var validAttrib = {};

  console.log(body);

  if (!matchTodo) {

    res.status(404).json({
      "error": "this id is not exists"
    });
  }


  if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {

    validAttrib.completed = body.completed;

  } else if (body.hasOwnProperty('completed')) {

    return res.status(400).send();
  } else {


  }


  if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {

    validAttrib.description = body.description;

  } else if (body.hasOwnProperty('description')) {
    return res.status(400).json({
      "error": "error"
    });
  }
  console.log(validAttrib);

  _.extend(matchTodo, validAttrib);
  res.json(matchTodo);

});

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {

    console.log('Server Started at port no ' + PORT);
  });
});