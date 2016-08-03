angular.module('myModule')
  .component('childComponent', {
    bindings: {
      myChildBinding: '@',
      myTextForCallFromChild: '@'
    },
    controller: function($timeout) {
      var self = this;
      $timeout(function() {
        self.myChildTitle = 'Subtitle';
      });
    },
    require: {
      masterComponent: '^masterComponent'
    },
    template: '<h2>{{ $ctrl.myChildTitle }} - {{ $ctrl.myChildBinding }}</h2><h3>{{ $ctrl.masterComponent.callFromChild($ctrl.myTextForCallFromChild) }}</h3>'
  });
