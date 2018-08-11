//this file may be redundant since middleware is run as soon as server is started

let map = {middleware:[], MiddleWare:{}};

for (let i = 0; i< app._router.stack.length; i++){
    const route = convertRegex(app._router.stack[i].regexp.toString());
    
  
    if ((!(app._router.stack[i].route)) ){
      if (app._router.stack[i].name && app._router.stack[i].name !== '<anonymous>') {
        
      map.middleware.push(app._router.stack[i].name);
      map.MiddleWare[app._router.stack[i].name] = [];
      
      const funcName = app._router.stack[i].name;
      app._router.stack[i].handle = wrap(app._router.stack[i].handle);
      app._router.stack[i].handle.__proto__.func = funcName.length > 0 ? funcName: 'middleware First loop';  
      app._router.stack[i].handle.__proto__.route = 'Global';
      app._router.stack[i].handle.__proto__.method = 'Global Execution';
      
      }
    }
    else if (app._router.stack[i].route){
  
      //add route 
      const method = Object.keys(app._router.stack[i].route.methods)[0];
      map[app._router.stack[i].route.path] = {};
      //check to see if route exists
      map[app._router.stack[i].route.path][method] = {}
      //array of middleware found on route
      //console.log(app._router.stack[i]);
      app._router.stack[i].handle = wrap(app._router.stack[i].handle);
  
        app._router.stack[i].route.stack.forEach((element, index)=>{
  
        //map[app._router.stack[i].route.path][method][element.name] = element.handle;
        map[app._router.stack[i].route.path][method][element.name] = {};
        map[app._router.stack[i].route.path][method][element.name].funcName = element.handle;
        map[app._router.stack[i].route.path][method][element.name].times = []
        
         const funcName = app._router.stack[i].route.stack[index].handle.name;
  
        app._router.stack[i].route.stack[index].handle.__proto__.func = funcName.length > 0 ? funcName: 'middleware';
        app._router.stack[i].route.stack[index].handle.__proto__.route = route;
        app._router.stack[i].route.stack[index].handle.__proto__.method = method;
  
        app._router.stack[i].route.stack[index].handle = wrap(app._router.stack[i].route.stack[index].handle); 
        //console.log(app._router.stack[i].route.stack[index].handle.__proto__.func);
       });
       console.log(app._router.stack[i].route.stack)
  
      }
    }      