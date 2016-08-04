/*jshint esversion: 6 */
angular.module('myModule')
  .component('childComponent', {
    bindings: {
      myChildBinding: '@',
      myTextForCallFromChild: '@'
    },
    controller: class {
      constructor($q, service3) {
        let self = this;
        self.$q = $q;
        self.service3 = service3;
        self.myChildTitle = 'Subtitle';
      }
      $postLink() {
        let self = this;
        self.$q.when(self.service3.getServiceData('mumble mumble'))
          .then(function(retVal) {
            self.canShowComponent = true;
          });
      }
    },
    require: {
      masterComponent: '^masterComponent'
    },
    template: `
        <div ng-if="$ctrl.canShowComponent" style="border: 1px dashed red;">
        <h3>Child Component</h3>
        <h4>{{ $ctrl.myChildTitle }} - {{ $ctrl.myChildBinding }}</h4>
        <p>{{ $ctrl.masterComponent.callFromChild($ctrl.myTextForCallFromChild) }}</p>
        </div>
    `
  });
