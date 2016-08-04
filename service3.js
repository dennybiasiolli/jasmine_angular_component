/*jshint esversion: 6 */
angular.module('myModule')
  .service('service3', class {
    getServiceData(param) {
      return new Promise(function(resolve, reject) {
        // if (!param) {
        //   reject();
        // }
        setTimeout(function() {
          resolve('Resolved ' + param);
        }, 500);
      });
    }
  });
