const EventEmmitter = require( 'events');



//Raising an event
const Log = require('./testideas.js');
const Vlog = new Log();
//Call the Listener first before you handle the event

Vlog.on('event', (e)=> {
  console.log('event', e);
});

Vlog.log("Who the fook is that guy");
