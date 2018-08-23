const axios = require('axios');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const data = {}

let str = Date.now().toString();
bcrypt.hash(str, saltRounds, (err, hash) => {
  data.hash = hash;
})


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

    const writerStream = fs
      .createWriteStream(filePath + `/${str}-middleman.json`)
      .on('finish', () => {
        console.log('JSON file created. Please see for log of data.');
        data.routes = map;
        //axios will be used to send data to middleman's external database to display data visuals
        axios({ method: 'post', url: 'http://localhost:8000/test', data })
          .then(() => {
            console.log(`visit https://www.middleman.io/${data.hash}`)
            process.exit();
          })
      })
      .on('error', err => console.log(err.stack));

    writerStream.write(JSON.stringify(map), function () {
      // Now the data has been written.
      console.log('Write completed.');
    });

    writerStream.end();
  });
};
