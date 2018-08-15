const wrap = require('./perf-hooks');
const mapApp = require('./routes-mapping');
const onExit = require('./on-exit');
let map = {};
let mapped = false;
const convertRegex = require('./routes-Regexp-Handler');

module.exports = function middleman(req, res, next) {
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

  for (let i = 0; i < globalExpress.stack.length; i += 1) {
    if (!globalExpress.stack[i].route) {
      if (
        globalExpress.stack[i].name &&
        globalExpress.stack[i].name !== '<anonymous>'
      ) {
        const funcName = globalExpress.stack[i].name;
        globalExpress.stack[i].handle = wrap(globalExpress.stack[i].handle);
        globalExpress.stack[i].handle.__proto__.func =
          funcName.length > 0 ? funcName : 'middleware First loop';
        globalExpress.stack[i].handle.__proto__.route = route; //redundant
        globalExpress.stack[i].handle.__proto__.method = method; //redudnant
        globalExpress.stack[i].handle.__proto__.routeData = routeData;
      }
    }
    //check for proper route
    if (convertRegex(globalExpress.stack[i].regexp.toString()) === route) {
      //check to confirm method is correct
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

          if (index === length - 1) {
            globalExpress.stack[i].route.stack[
              index
            ].handle.__proto__.lastFunc = true;
          }

          globalExpress.stack[i].route.stack[index].handle = wrap(
            globalExpress.stack[i].route.stack[index].handle
          );
        });
        break;
      }
    }
  }
  onExit(map);
  next();
};
