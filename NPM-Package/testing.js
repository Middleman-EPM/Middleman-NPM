let data = require('./output.json')

for (const prop in data){
   for (const method in data[prop] ){

    data[prop][method].data = new Set(...data[prop][method].data)
    data[prop][method].data.forEach((element)=>console.log(element))
   }
  }
