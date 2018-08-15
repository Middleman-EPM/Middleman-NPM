const axios = require('axios');
module.exports = onExit = map => {
  for (const prop in map) {
    for (const method in map[prop]) {
      if (!method.includes('_functions'))
        map[prop][method] = [...new Set(map[prop][method])];
      //console.log(map[prop][method])
    }
  }
  if (process.platform === 'win32') {
    const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.on('SIGINT', () => {
      process.emit('SIGINT');
    });
  }

  let filePath = __dirname;
  filePath = filePath.split('node_modules')[0];

  process.on('SIGINT', code => {
    let buffer = new Buffer('some content\n');
    const fs = require('fs');
    // Create a writable stream &  Write the data to stream with encoding to be utf8
    const writerStream = fs
      .createWriteStream(filePath + '/output.json')
      .on('finish', function() {
        console.log('Write Finish.');
        console.log(filePath);
        process.exit();
      })
      .on('error', function(err) {
        console.log(err.stack);
      });

    writerStream.write(JSON.stringify(map), function() {
      // Now the data has been written.
      console.log(JSON.stringify(map));
      console.log('Write completed.');
    });

    writerStream.end();
  });
  axios.post('http://localhost:8000/', JSON.stringify(map));
};
