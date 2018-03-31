const {ObjectID} = require('mongodb');

const mongoose = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo'); 
const {User} = require('./../server/models/user'); 

var id = '5abf6b124e18a06aabe97052';

User.findById(id).then((user)=>{
	if(!user){
console.log('Not Found');

	}
	else{
console.log(user);
}
}, (e)=>{

}).catch((e)=>{
console.log('Not found')
});