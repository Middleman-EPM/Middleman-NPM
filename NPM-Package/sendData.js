exports.default =  sendData = (path) => {

  const request = require('request');
  //determine path of file just created by our middleman function
  const readStream = request(path);

  readStream.pipe(request.post('OUR SERVER'));
  //listen for pip to finish
  request(requestOptions)
  .on('end', () => weAreDone());
}