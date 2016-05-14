var express = require('express')
var app = express()
var PORT=process.env.PORT||3000;
var todos=[{

        id:1,
        desc:"Meet her",
        completed:false

},{

        id:2,
        desc:"Go to clg",
        completed:false

},{

        id:3,
        desc:"return home",
        completed:false

}] 
 

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



app.listen(PORT,function(){

    console.log('Server Started at port no '+PORT);
});