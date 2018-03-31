// object restructuring
const {MongoClient, ObjectIdD} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
if(err){
	return console.log('Unable to connect to the database server');
}
console.log('Connected to mongodb server');
const db = client.db('TodoApp');

// db.collection('Todos').insertOne({
// text : 'Something to do',
// completed : false
// }, (err, result) => {
// if(err){
// 	return console.log('Unable to insert todo', err);
// }
// console.log(JSON.stringify(result.ops, undefined, 2));

db.collection('Users').insertOne({
name :'Siddharth',
age : 26,
location : 'Meerut'
}, (err, result) => {
if(err){
	return console.log('Unable to insert todo', err);
}
console.log(JSON.stringify(result.ops, undefined, 2));
console.log(result.ops[0]._id);

});
client.close();
});