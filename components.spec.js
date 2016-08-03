describe('Component: masterComponent', function() {
  beforeEach(angular.mock.module('myModule'));

  var element;
  var childElement;
  var scope;
  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<master-component my-binding="{{param1}}" my-text-for-call-from-child="{{param2}}"></master-component>');
    element = $compile(element)(scope);
    scope.param1 = '1.5';
    scope.param2 = 'Primo test';
    scope.$apply();
  }));

  var controller;
  var childController;
  beforeEach(function() {
    controller = element.controller('masterComponent');
    spyOn(controller, 'callFromChild');
    childElement = element.find('child-component');
    childController = childElement.controller('childComponent');
  });

  beforeEach(inject(function($timeout) {
    $timeout.flush();
  }));

  describe('main component', function() {
    it('should render the text', function() {
      var h1 = element.find('h1');
      expect(h1.text()).toBe('Unit Testing AngularJS - 1.5');
    });

    it('should expose my title', function() {
      expect(controller.myTitle).toBeDefined();
      expect(controller.myTitle).toBe('Unit Testing AngularJS');
    });

    it('should have my binding bound', function() {
      expect(controller.myBinding).toBeDefined();
      expect(controller.myBinding).toBe('1.5');
    });
  });

  describe('child component', function() {
    it('should have child controller', function() {
      expect(childController.myChildBinding).toBeDefined();
      expect(childController.myChildBinding).toBe('Child parameter');
    });

    it('should expose myTextForCallFromChild', function() {
      expect(childController.myTextForCallFromChild).toBeDefined();
      expect(childController.myTextForCallFromChild).toBe('Primo test');
    });

    it('should have parent controller', function() {
      expect(childController.masterComponent).toBeDefined();
      expect(childController.masterComponent).toBe(controller);
    });

    it('should have called parent function', function() {
      expect(controller.callFromChild).toHaveBeenCalled();
      expect(controller.callFromChild).toHaveBeenCalledWith('Primo test');
    });
  });

});
