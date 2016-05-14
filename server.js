var express = require('express')
var bodyParse=require('body-parser');
var app = express()
var PORT=process.env.PORT||3000;
var todos=[]
var todoNextId=1; 
 
app.use(bodyParse.json());
app.get('/',function (req, res) {
  res.send('TODO Api Root ! Yo');
});

//GET /todos
app.get('/todos',function (req, res) {
  res.json(todos);
});

//GET /todos/id
app.get('/todos/:id',function (req, res) {
  
  var reqTodo=parseInt(req.params.id,10);
  var matchTodo;
console.log(reqTodo);
  todos.forEach(function(todo){

          if(reqTodo === todo.id){
          matchTodo = todo;
        }
  });

console.log(matchTodo);


  if(matchTodo){
    res.json(matchTodo);
  }else{
    res.status(404).send();
    }
  
});

// POST /todos

app.post('/todos',function(req,res){

    var body=req.body;

    body.id=todoNextId++;

    todos.push(body);
    res.json(body);
});
app.listen(PORT,function(){

    console.log('Server Started at port no '+PORT);
});