//cache
module.exports = mapApp = () => {
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
}

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