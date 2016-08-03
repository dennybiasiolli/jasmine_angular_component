/*jshint esversion: 6 */
angular.module('myModule')
  .component('masterComponent', {
    bindings: {
      myBinding: '@',
      myTextForCallFromChild: '@'
    },
    controller: class {
      constructor($q) {
        this.$q = $q;
        this.myTitle = 'Unit Testing AngularJS';
        this.myChildParameter = 'Child parameter';
      }
      callFromChild(param) {
        // console.log('callFromChild', param);
        return 'returnCallFromChild(\'' + param + '\')';
      }

      promise1(param) {
        return Promise.resolve('Hi' + param + '!');
      }

      promise2(param) {
        return Promise.resolve('Hi' + param + '!');
      }
    },
    template: `
        <div style="border: 1px dashed black;">
        <h3>Master Component</h3>
        <h4>{{ $ctrl.myTitle }} - {{ $ctrl.myBinding }}</h4>
        <child-component
            my-child-binding="{{$ctrl.myChildParameter}}"
            my-text-for-call-from-child="{{$ctrl.myTextForCallFromChild}}">
        </child-component>
        </div>
    `
  });
