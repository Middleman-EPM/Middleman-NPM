const { performance, PerformanceObserver } = require('perf_hooks');

module.exports = wrap = (passedFunc, map) => {
  const fn = performance.timerify(passedFunc);
 

  let obs = new PerformanceObserver((list, observer) => {
    let obj = {};
    obj[list.getEntries()[0].name] = {
      duration: list.getEntries()[0].duration,
      start: list.getEntries()[0].startTime,
      end: list.getEntries()[0].startTime + list.getEntries()[0].duration
    };
    passedFunc.__proto__.routeData.data.push(obj);
    observer.disconnect();
    performance.clearFunctions();

    if (passedFunc.__proto__.lastFunc) {
      map[passedFunc.__proto__.routeData.route][
        passedFunc.__proto__.routeData.method
      ].push(passedFunc.__proto__.routeData.data);
    }
  });

  obs.observe({ entryTypes: ['function'] });

  return fn;
};
