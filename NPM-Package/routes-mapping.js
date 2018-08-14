//cache
const map = {}
let mapped = false;

exports.default = mapApp = () => {
  for (let i = 0; i< app._router.stack.length; i++){
    const route = convertRegex(app._router.stack[i].regexp.toString());
    if (app._router.stack[i].route){
      //add route 
      const method = Object.keys(app._router.stack[i].route.methods)[0];
      map[app._router.stack[i].route.path] = {};
      //check to see if route exists
      map[app._router.stack[i].route.path][method] = []

      }
    }
}