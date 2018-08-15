const wrap = require('./perf-hooks');
const mapApp = require('./routes-mapping');
const onExit = require('./on-exit');
let map = {};
let mapped = false;
const convertRegex = require('./routes-Regexp-Handler');

exports.middleman = function middleman(req, res, next) {
  if (!mapped) {
    mapped = true;
    map = mapApp(req, map);
  }
  const route = req.originalUrl;
  const method = req.method;
  const globalExpress = req.app._router ? req.app._router : req.Router;
  let routeData = { data: [], method: method.toLowerCase(), route: route };

  if (!map[route]) {
    map[route] = {};
    map[route][method.toLowerCase()] = [];
  }

  if (!map[route][method]) {
    map[route][method.toLowerCase()] = [];
  }
  // console.log(globalExpress.stack);
  for (let i = 0; i < globalExpress.stack.length; i += 1) {
    if (!globalExpress.stack[i].route) {
      if (
        globalExpress.stack[i].name &&
        globalExpress.stack[i].name !== '<anonymous>' && globalExpress.stack[i].name !== 'middleman'
      ) {
        const funcName = globalExpress.stack[i].name;


        globalExpress.stack[i].handle = wrap(globalExpress.stack[i].handle, map);
        globalExpress.stack[i].handle.__proto__.func =
          funcName.length > 0 ? funcName : 'middleware First loop';
        globalExpress.stack[i].handle.__proto__.route = route; //redundant
        globalExpress.stack[i].handle.__proto__.method = method; //redudnant
        globalExpress.stack[i].handle.__proto__.routeData = routeData;
      }
    }
    //check for proper route
    let arr = route.split('/')
    let result = [];
    for (let i = 0; i < arr.length - 1; i++) {
      result.push(arr[i] + '/')
    }

    // console.log(result)
    let str = ''
    if (globalExpress.stack[i].keys.length > 0) {
      if (globalExpress.stack[i].route) {

        let split = globalExpress.stack[i].route.path.split('/')
        for (let i = 0; i < split.length - 1; i++) {
          str += split[i] + '/'
        }

      }
    }
    // console.log(globalExpress.stack[i].regexp.toString());
    // console.log('that was converRegex');
    // console.log(route + "    this is the route :::::::")
    // console.log(globalExpress.stack[i]);
    if (globalExpress.stack[i].keys.length > 0) {
      if (globalExpress.stack[i].route) {
        // console.log(globalExpress.stack[i].route.path);
        let split = globalExpress.stack[i].route.path.split('/')
        for (let i = 0; i < split.length - 1; i++) {
          str += split[i] + '/'
        }
        if (route.includes(str)) {
          x();
        }
      }
    }
    // console.log(route)
    // console.log(convertRegex(globalExpress.stack[i].regexp.toString()));
    // console.log('this is routeeeeeee:::::::',route)
    // console.log(globalExpress.stack[i].regexp.toString().replace(/\\/g, ''));
    if (globalExpress.stack[i].regexp.toString().replace(/\\/g, '').includes(route)) {
      x();
    }

    //console.log(route + ":::this is route");
    // if (globalExpress.stack[i].regexp.toString().includes(route)) {
    //check to confirm method is correct
    // console.log('its working?')
    x = () => {
      if (
        method ===
        Object.keys(globalExpress.stack[i].route.methods)[0].toUpperCase()
      ) {
        let length = globalExpress.stack[i].route.stack.length;

        globalExpress.stack[i].route.stack.forEach((element, index) => {

          const funcName =
            globalExpress.stack[i].route.stack[index].handle.name;

          globalExpress.stack[i].route.stack[index].handle.__proto__.func =
            funcName.length > 0 ? funcName : 'middleware';
          globalExpress.stack[i].route.stack[
            index
          ].handle.__proto__.route = route;
          globalExpress.stack[i].route.stack[
            index
          ].handle.__proto__.method = method;
          globalExpress.stack[i].handle.__proto__.method = routeData;

          // console.log('this is the length::::::' + length)
          if (index === length - 1) {
            // console.log('hihi::::::' + globalExpress.stack[i].route.stack[index]);
            globalExpress.stack[i].route.stack[
              index
            ].handle.__proto__.lastFunc = true;
          }

          globalExpress.stack[i].route.stack[index].handle = wrap(
            globalExpress.stack[i].route.stack[index].handle, map
          );
        });
        // break;
      }
      // }
    }
  }
  onExit(map);
  next();
};
exports.map = map;
