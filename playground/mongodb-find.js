const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
if(err){
	return console.log('Unable to connect to the database server');
}
console.log('Connected to mongodb server');
const db = client.db('TodoApp');
db.collection('Todos').find().count().then((count)=>{
console.log('Todos Count : ' + count);
console.log(JSON.stringify(docs, undefined, 2));
}, (err) =>{
console.log('Unable to fetch document', err);
});
client.close();
});