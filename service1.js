/*jshint esversion: 6 */
angular.module('myModule')
  .service('service1', class {
    getServiceData(param) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve('Mr. ' + param);
        }, 200);
      });
    }
  });
