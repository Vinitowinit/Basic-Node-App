// Raising events

const EventEmmitter = require( 'events');


class Logger extends EventEmmitter {
//when function in a class, it becomes a method
log (message){
  console.log(message);
  this.emit('event', {id:1, codeName: 'hot'});
}

}
module.exports = Logger;
