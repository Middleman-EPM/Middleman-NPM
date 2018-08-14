import wrap from './perf-hooks'
exports.middlewareTracker = (req, res, next) => {
    const route = req.originalUrl
    const method = req.method
  
    const globalExpress = req.app._router ? req.app._router : req.Router;
    let routeData = {data: [], 'method': method.toLowerCase(), 'route': route}
    if (!map[route]) {
      
      map[route] = {}
      map[route][method.toLowerCase()] = []
    }
  
    if (!map[route][method]){
      map[route][method.toLowerCase()] = []
    }
  
    for (let i = 0; i < app._router.stack.length; i += 1){
     
      if ((!(app._router.stack[i].route)) ){
        if (app._router.stack[i].name && app._router.stack[i].name !== '<anonymous>') {
                
        const funcName = app._router.stack[i].name;
        app._router.stack[i].handle = wrap(app._router.stack[i].handle);
        app._router.stack[i].handle.__proto__.func = funcName.length > 0 ? funcName: 'middleware First loop';  
        app._router.stack[i].handle.__proto__.route = route; //redundant
        app._router.stack[i].handle.__proto__.method = method; //redudnant
        app._router.stack[i].handle.__proto__.routeData = routeData;
        }
      }
      //check for proper route
      if (convertRegex(app._router.stack[i].regexp.toString()) === route) {
       //check to confirm method is correct
       if( method === Object.keys(app._router.stack[i].route.methods)[0].toUpperCase()){
  
       let length = app._router.stack[i].route.stack.length;
  
        app._router.stack[i].route.stack.forEach((element, index)=>{   
          const funcName = app._router.stack[i].route.stack[index].handle.name;
    
          app._router.stack[i].route.stack[index].handle.__proto__.func = funcName.length > 0 ? funcName: 'middleware';
          app._router.stack[i].route.stack[index].handle.__proto__.route = route;
          app._router.stack[i].route.stack[index].handle.__proto__.method = method;
          app._router.stack[i].handle.__proto__.method = routeData;
  
  
  
          if (index === length - 1){
            app._router.stack[i].route.stack[index].handle.__proto__.lastFunc = true;
          }
  
          app._router.stack[i].route.stack[index].handle = wrap(app._router.stack[i].route.stack[index].handle); 
         });
        break;
      }
    }
    }
    next();
  }

