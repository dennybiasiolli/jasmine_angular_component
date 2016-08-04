/*jshint esversion: 6 */
angular.module('myModule')
  .service('service2', class {
    getServiceData(param) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve('Welcome ' + param + '!');
        }, 200);
      });
    }
  });
