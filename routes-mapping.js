
module.exports = mapApp = (req, map) => {
  for (let i = 0; i < req.app._router.stack.length; i++) {
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
