/*jshint esversion: 6 */
angular.module('myModule')
  .component('childComponent', {
    bindings: {
      myChildBinding: '@',
      myTextForCallFromChild: '@'
    },
    controller: class {
      constructor($timeout) {
        let self = this;
        $timeout(function() {
          self.myChildTitle = 'Subtitle';
        });
      }
    },
    require: {
      masterComponent: '^masterComponent'
    },
    template: `
        <div style="border: 1px dashed red;">
        <h3>{{ $ctrl.myChildTitle }} - {{ $ctrl.myChildBinding }}</h3>
        <h4>{{ $ctrl.masterComponent.callFromChild($ctrl.myTextForCallFromChild) }}</h4>
        </div>
    `
  });
