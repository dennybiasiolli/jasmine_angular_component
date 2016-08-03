angular.module('myModule')
  .component('masterComponent', {
    bindings: {
      myBinding: '@',
      myTextForCallFromChild: '@'
    },
    controller: function($q) {
      this.myTitle = 'Unit Testing AngularJS';
      this.myChildParameter = 'Child parameter';
      this.callFromChild = function(param) {
        // console.log('callFromChild', param);
        return 'returnCallFromChild(' + param + ')';
      };

      function promise1() {
        return Promise.resolve('ciao!');
      }
    },
    template: '<h1>{{ $ctrl.myTitle }} - {{ $ctrl.myBinding }}</h1>{{$ctrl.myTextForCallFromChild}}<child-component my-child-binding="{{$ctrl.myChildParameter}}" my-text-for-call-from-child="{{$ctrl.myTextForCallFromChild}}"></child-component>'
  });
