/*jshint esversion: 6 */
describe('Component', function() {
  beforeEach(angular.mock.module('myModule'));

  let element, controller;
  let scope, $rootScope, $q, $timeout;
  let deferred1, deferred2;
  let spy1, spy2;
  beforeEach(inject(function(_$rootScope_, _$compile_, _$q_, _$timeout_, _service1_, _service2_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    $timeout = _$timeout_;
    service1 = _service1_;
    service2 = _service2_;
    deferred1 = $q.defer();
    deferred2 = $q.defer();
    spyOn(service1, 'getServiceData').and.callThrough();
    spyOn(service2, 'getServiceData').and.callThrough();
    scope = $rootScope.$new();
    element = angular.element('<master-component my-binding="{{param1}}" my-text-for-call-from-child="{{param2}}"></master-component>');
    element = _$compile_(element)(scope);
    scope.param1 = '1.5';
    scope.param2 = 'First test';
    scope.$apply();
    controller = element.controller('masterComponent');
    spyOn(controller, 'callFromChild');
  }));

  beforeEach(function(done) {
    scope.$apply();
    service1.getServiceData().then(function(data) {
      scope.$apply();
      service2.getServiceData().then(function(data) {
        scope.$apply();
        done();
      });
    });
  });

  describe('masterComponent', function() {
    it('should render the text', function() {
      let h4 = angular.element(element.find('h4')[0]);
      expect(h4.text()).toBe('Unit Testing AngularJS - 1.5');
    });

    it('should expose my title', function() {
      expect(controller.myTitle).toBeDefined();
      expect(controller.myTitle).toBe('Unit Testing AngularJS');
    });

    it('should have my binding bound', function() {
      expect(controller.myBinding).toBeDefined();
      expect(controller.myBinding).toBe('1.5');
    });

    it('should have resolved all promises', function() {
      expect(service1.getServiceData).toHaveBeenCalledWith('Tester');
      expect(service2.getServiceData).toHaveBeenCalledWith('Mr. Tester');
    });
  });

  describe('childComponent', function() {
    let childElement, childController;
    beforeEach(function() {
      childElement = element.find('child-component');
      childController = childElement.controller('childComponent');
    });

    it('should render the text', function() {
      let h4 = angular.element(childElement.find('h4')[0]);
      expect(h4.text()).toBe('Subtitle - Child parameter');
    });

    it('should have child controller', function() {
      expect(childController.myChildBinding).toBeDefined();
      expect(childController.myChildBinding).toBe('Child parameter');
    });

    it('should expose myTextForCallFromChild', function() {
      expect(childController.myTextForCallFromChild).toBeDefined();
      expect(childController.myTextForCallFromChild).toBe('First test');
    });

    it('should have parent controller', function() {
      expect(childController.masterComponent).toBeDefined();
      expect(childController.masterComponent).toBe(controller);
    });

    it('should have called parent function', function() {
      expect(controller.callFromChild).toHaveBeenCalled();
      expect(controller.callFromChild).toHaveBeenCalledWith('First test');
    });
  });

});
