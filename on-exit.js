const axios = require('axios');
const server = 'http://localhost:8000/';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = onExit = map => {
  for (const prop in map) {
    for (const method in map[prop]) {
      if (!method.includes('_functions'))
        map[prop][method] = [...new Set(map[prop][method])];
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
    let filename;
    bcrypt.hash(Date.now(), saltRounds, (err, hash) => {
      filename = hash;
    })
    map.hash = filename;
    const writerStream = fs
      .createWriteStream(filePath + `/${Date.now()}-middleman.json`)
      .on('finish', () => {
        console.log('Write Finish.');
        console.log(filename);
        map.routes = map;
        axios.post(server, JSON.stringify(map))
                        .then(response => console.log(response))
                        .catch(error => console.log(error));
        process.exit();
      })
      .on('error', err => console.log(err.stack));

    writerStream.write(JSON.stringify(map), function() {
      // Now the data has been written.
      console.log(JSON.stringify(map));
      console.log('Write completed.');
    });

    writerStream.end();
  });
};
