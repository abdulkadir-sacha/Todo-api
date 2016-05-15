var express = require('express')
var bodyParse=require('body-parser');
var _ = require('underscore');

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
  var matchTodo=_.findWhere(todos,{id:reqTodo});

  if(matchTodo){
    res.json(matchTodo);
  }else{
    res.status(404).send();
    }
  
});

// POST /todos

app.post('/todos',function(req,res){

    var body=_.pick(req.body,'description','completed');
    

    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length===0){

        return res.status(400).send();
    }
    body.id=todoNextId++;
    
    body.description=body.description.trim();
    todos.push(body);
    res.json(body);
});

// DELETE /todos/:id

app.delete('/todos/:id',function (req, res) {
  
  var reqTodo=parseInt(req.params.id,10);
  var matchTodo=_.findWhere(todos,{id:reqTodo});

  if(matchTodo){
    todos=_.without(todos,matchTodo)
    res.json(matchTodo);
  }else{
    res.status(404).json({"error":"this id is not exists"});
    }
  
}); 



app.listen(PORT,function(){

    console.log('Server Started at port no '+PORT);
});