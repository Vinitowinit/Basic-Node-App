

function log(req,res, next) {
  console.log('Time to Load....');
  next ();
};

module.exports = log;
