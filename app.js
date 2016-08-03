/*jshint esversion: 6 */
angular.module('myModule', [])
  .component('myApp', {
    controller: function() {
      this.param1 = '1.5';
      this.param2 = 'First test';
    },
    template: `
        <div style="margin: 10px 0;">
        <master-component my-binding="{{$ctrl.param1}}" my-text-for-call-from-child="{{$ctrl.param2}}">
        </master-component>
        </div>
    `
  });
