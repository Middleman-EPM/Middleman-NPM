//cache
// const convertRegex = require ("./routes-Regexp-Handler")
module.exports = mapApp = (req, map) => {
  for (let i = 0; i < req.app._router.stack.length; i++) {
    // const route = convertRegex(req.app._router.stack[i].regexp.toString());
    if (req.app._router.stack[i].route) {
      //add route
      const method = Object.keys(req.app._router.stack[i].route.methods)[0];
      if (!map[req.app._router.stack[i].route.path])
        map[req.app._router.stack[i].route.path] = {};
      //check to see if route exists

      map[req.app._router.stack[i].route.path][method] = [];
      map[req.app._router.stack[i].route.path][method + '_functions'] = [];

      //array of middleware found on route
      req.app._router.stack[i].route.stack.forEach((element, index) => {
        let name = element.handle.name;
        map[req.app._router.stack[i].route.path][method + '_functions'].push(
          name.length > 0 ? name : 'anonymous'
        );
      });
    }
  }
  return map;
};

/*
for (let i = 0; i< app._router.stack.length; i++){
  const route = convertRegex(app._router.stack[i].regexp.toString());
   if (app._router.stack[i].route){
    //add route
    const method = Object.keys(app._router.stack[i].route.methods)[0];
   if (!map[app._router.stack[i].route.path]) map[app._router.stack[i].route.path] = {};
    //check to see if route exists

    map[app._router.stack[i].route.path][method] =[];
    map[app._router.stack[i].route.path][method+'_functions'] = []

    //array of middleware found on route

      app._router.stack[i].route.stack.forEach((element, index)=>{
        let name = element.handle.name
        map[app._router.stack[i].route.path][method+'_functions'].push(name.length > 0 ? name: "anonymous" )


     });

    }

}

*/
