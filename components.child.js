/*jshint esversion: 6 */
angular.module('myModule')
  .component('childComponent', {
    bindings: {
      myChildBinding: '@',
      myTextForCallFromChild: '@',
      onParentLoaded: '&'
    },
    controller: class {
      constructor($scope) {
        let self = this;
        self.$scope = $scope;
        self.myChildTitle = 'Subtitle';
      }
    },
    require: {
      masterComponent: '^masterComponent'
    },
    template: `
        <div style="border: 1px dashed red;">
        <h3>Child Component</h3>
        <h4>{{ $ctrl.myChildTitle }} - {{ $ctrl.myChildBinding }}</h4>
        <p>{{ $ctrl.masterComponent.callFromChild($ctrl.myTextForCallFromChild) }}</p>
        </div>
    `
  });
