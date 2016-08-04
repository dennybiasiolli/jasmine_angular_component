/*jshint esversion: 6 */
angular.module('myModule')
  .component('masterComponent', {
    bindings: {
      myBinding: '@',
      myTextForCallFromChild: '@'
    },
    controller: class {
      constructor($q, service1, service2) {
        let self = this;
        self.$q = $q;
        self.service1 = service1;
        self.service2 = service2;
        self.myTitle = 'Unit Testing AngularJS';
        self.myChildParameter = 'Child parameter';
        self.promiseLoad = $q.defer();
        self.promiseLoadCompleted = self.promiseLoad.promise;
      }
      $onInit() {
        let self = this;
        self.$q.when(self.service1.getServiceData('Tester'))
          .then(function(retVal) {
            self.$q.when(self.service2.getServiceData(retVal))
              .then(function(retVal2) {
                self.promiseVal = retVal2;
                self.canLoadChildren = true;
                self.promiseLoad.resolve(true);
              });
          });
      }
      callFromChild(param) {
        return 'returnCallFromChild(\'' + param + '\')';
      }

      promise1(param) {
        let deferred = this.$q.defer();
        setTimeout(function() {
          deferred.resolve('Mr. ' + param);
        }, 100);
        return deferred.promise;
      }

      promise2(param) {
        return Promise.resolve('Welcome ' + param + '!');
      }
    },
    template: `
        <div style="border: 1px dashed black;">
        <h3>Master Component</h3>
        <h4>{{ $ctrl.myTitle }} - {{ $ctrl.myBinding }}</h4>
        <p>{{$ctrl.promiseVal}}</p>
        <child-component
            ng-if="$ctrl.canLoadChildren"
            my-child-binding="{{$ctrl.myChildParameter}}"
            my-text-for-call-from-child="{{$ctrl.myTextForCallFromChild}}">
        </child-component>
        </div>
    `
  });
