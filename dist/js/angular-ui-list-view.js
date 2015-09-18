'use strict';

angular.module('ngUIListView', [])
.constant('ngUIListViewConfig', {
  stepper: {
    min: 0,
    max: 1000000,
    stepSize: 1,
    iconMinus: 'glyphicon glyphicon-minus',
    iconPlus: 'glyphicon glyphicon-plus'
  }
})
.directive('listItem', function() {
  return {
    restrict: 'E',
    scope: {},
    controller: ['$scope', '$element', function($scope, $element) {
      this.scope = $scope;
      this.element = $element;

      $scope.$watch('disabled', function(value) {
        value ? $element.addClass('item-disabled') : $element.removeClass('item-disabled');
      });

      $scope.$watch('selected', function(value) {
        value ? $element.addClass('item-selected') : $element.removeClass('item-selected');
      });
    }],
    compile: function($element) {
      var listItemContent = ($element.hasClass('item-checkbox') || $element.hasClass('item-radio')) ?
        angular.element('<label class="item-content"></label>') :
        angular.element('<div class="item-content"></div>');

      listItemContent.append($element.contents());
      $element.append(listItemContent);
      $element.addClass('item');
    }
  };
})
.directive('itemOption', function() {
  return {
    restrict: 'E',
    require: '^listItem',
    compile: function() {
      return function($scope, $element, $attrs, $ctrl) {
        if(!$ctrl.options) {
          $ctrl.options = angular.element('<div class="item-options"></div>');
          $ctrl.element.prepend($ctrl.options);
        }

        $ctrl.options.append($element);
      };
    }
  };
})
.directive('itemInput', function() {
  return {
    restrict: 'E',
    require: '^listItem',
    transclude: true,
    replace: true,
    scope: {
      type: '@',
      value: '=ngModel',
      name: '@',
      disabled: '=ngDisabled',
      pattern: '@',
      placeholder: '@'
    },
    template: '<div>' +
                '<label ng-class="{\'has-input\': value, \'has-input-focus\': focus}" class="floating-label">' +
                  '<div>' +
                    '<div ng-bind="placeholder" class="label"></div>' +
                    '<input type="{{type ? type : \'text\'}}" ng-model="value" name="{{name}}" ng-disabled="disabled" ng-pattern="pattern" class="input">' +
                  '</div>' +
                '</label>' +
              '</div>',
    link: function($scope, $element, $attrs, $ctrl) {
      $scope.$watch('disabled', function(value) {
        $ctrl.scope.disabled = value;
      });
    }
  };
})
.directive('itemCheckbox', function() {
  return {
    restrict: 'E',
    require: '^listItem',
    transclude: true,
    replace: true,
    scope: {
      label: '@',
      ngModel: '=',
      value: '=',
      multiple: '=ngMultiple',
      disabled: '=ngDisabled',
      handle: '@'
    },
    template: function($element, $attrs) {
      var isMultiple = 'ngMultiple' in $attrs;

      var template = '<div>' +
                       '<div>' +
                         '<div ng-if="label" ng-bind="label" class="label"></div>' +
                         '<div ng-transclude></div>' +
                       '</div>';

      if(isMultiple) {
        template += '<input type="checkbox" ng-model="ngModel" ng-value="value" ng-disabled="disabled" class="checkbox">';
      } else {
        template += '<div class="switch">' +
                      '<input type="checkbox" ng-model="ngModel" ng-value="value" ng-disabled="disabled" class="checkbox" id="{{handle}}">' +
                      '<label for="{{handle}}"></label>' +
                    '</div>';
      }

      template += '</div>';

      return template;
    },
    link: function($scope, $element, $attrs, $ctrl) {
      $scope.$watch('disabled', function(value) {
        $ctrl.scope.disabled = value;
      });

      var handler = function(selected) {
        var checked = $element.find('input').prop('checked');

        if($scope.multiple) {
          var index = $scope.multiple.indexOf($scope.value);

          if(checked && index === -1) {
            selected ? $element.find('input').prop('checked', false) : $scope.multiple.push($scope.value);
          } else if(!checked && index !== -1) {
            selected ? $element.find('input').prop('checked', true) : $scope.multiple.splice(index, 1);
          }
        }

        $ctrl.scope.selected = $element.find('input').prop('checked');
      };

      if($scope.multiple) {
        var defaultHandler = angular.bind(self, handler, true),
          changeHandler = angular.bind(self, handler, false);

        $scope.$watch('ngModel', function(value) {
          if(value !== undefined) {
            angular.element($element[0]).triggerHandler('change');
          }
        });

        $element.on('change', function() {
          changeHandler();
        });

        $scope.$watch('multiple', defaultHandler);
      }
    }
  };
})
.directive('itemRadio', function() {
  return {
    restrict: 'E',
    require: '^listItem',
    transclude: true,
    replace: true,
    scope: {
      label: '@',
      ngModel: '=',
      value: '=',
      disabled: '=ngDisabled',
      name: '@'
    },
    template: '<div>' +
                '<div ng-if="label" ng-bind="label" class="label"></div>' +
                '<div ng-transclude></div>' +
                '<input type="radio" ng-model="ngModel" ng-value="value" ng-disabled="disabled" ng-checked="ngModel == value" name="{{name}}" class="radio">' +
              '</div>',
    link: function($scope, $element, $attrs, $ctrl) {
      $scope.$watch('disabled', function(value) {
        $ctrl.scope.disabled = value;
      });
    }
  };
})
.directive('itemStepper', ['ngUIListViewConfig', function(ngUIListViewConfig) {
  return {
    restrict: 'E',
    require: '^listItem',
    transclude: true,
    replace: true,
    scope: {
      value: '=ngModel',
      disabled: '=ngDisabled',
      placeholder: '@',
      options: '='
    },
    template: '<label ng-class="{\'has-input\': isNumber(value) || value, \'has-input-focus\': focus}" class="floating-label">' +
                '<div>' +
                  '<div ng-bind="placeholder" class="label"></div>' +
                  '<input type="number" ng-model="value" ng-disabled="disabled" min="{{config.min}}" max="{{config.max}}" step="{{config.stepSize}}" class="input">' +
                '</div>' +
                '<div class="btn-group stepper">' +
                  '<a class="btn" ng-click="decrement()">' +
                    '<i ng-class="config.iconMinus"></i>' +
                  '</a>' +
                  '<a class="btn" ng-click="increment()">' +
                    '<i ng-class="config.iconPlus"></i>' +
                  '</a>' +
                '</div>' +
              '</label>',
    link: function($scope, $element, $attrs, $ctrl) {
      $scope.config = angular.extend({}, ngUIListViewConfig.stepper, $scope.options);
      $scope.isNumber = angular.isNumber;

      $scope.$watch('disabled', function(value) {
        $ctrl.scope.disabled = value;
      });

      $element.find('input').bind('keypress', function(e) {
        var key = e.which;

        if(!/[0-9]/.test(String.fromCharCode(key)) && !(key === 0 || key === 8)) {
          e.preventDefault();

          return false;
        }
      });

      $scope.decrement = function() {
        if($scope.isNumber($scope.value)) {
          $scope.value = $scope.value - $scope.config.stepSize;

          if($scope.value < $scope.config.min) $scope.value = $scope.config.min;
        }
      };

      $scope.increment = function() {
        $scope.value = $scope.value || 0;

        if($scope.isNumber($scope.value)) {
          $scope.value = $scope.value + $scope.config.stepSize;

          if($scope.value > $scope.config.max) $scope.value = $scope.config.max;
        }
      };
    }
  };
}])
.directive('floatingLabel', function() {
  return {
    restrict: 'C',
    link: function($scope, $element) {
      $element.find('input').bind('focus', function() {
        $scope.$apply(function() {
          $scope.focus = true;
        });
      });

      $element.find('input').bind('blur', function() {
        $scope.$apply(function() {
          $scope.focus = false;
        });
      });
    }
  };
});