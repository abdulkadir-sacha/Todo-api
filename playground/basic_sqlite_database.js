var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic_sqlite_database.sqlite'

});

var Todo = sequelize.define('todo', {
	description: {

		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len:[1,250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue:false

	}
});
sequelize.sync({
	force: true
}).then(function() {

	console.log('Synced');

	return Todo.findById(2).then(function(todo){

		if(todo){
			console.log(todo.toJSON());
		}else{
			console.log("Not Found");
		}
	});

	/*Todo.create({
		description: "Goto School",
		completed:true
	}).then(function(todo) {
		
 		return Todo.create({
		description: "Goto office"
	}).then(function(todo) {
		
		//return Todo.findById(1);

		return Todo.findAll({

			where:{
				description:{
					$like:'%school%'
				}
			}
		});
 
	}).then(function(todos){

		if(todos){
			

			todos.forEach(function(todo){
			console.log(todo.toJSON());
			});
		}
	}).catch(function (e){

			console.log(e);
	});

	});
*/
	});