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
  .directive('listItem', function () {
    return {
      restrict: 'E',
      controller: ['$scope', '$element', function ($scope, $element) {
        this.scope = $scope;
        this.element = $element;

        $scope.$watch('disabled', function (value) {
          value ? $element.addClass('item-disabled') : $element.removeClass('item-disabled');
        });

        $scope.$watch('selected', function (value) {
          value ? $element.addClass('item-selected') : $element.removeClass('item-selected');
        });
      }],
      compile: function ($element, $attrs) {
        var isAnchor = angular.isDefined($attrs.href) || angular.isDefined($attrs.ngHref) || angular.isDefined($attrs.uiSref);
        var isLabel = $element.hasClass('item-checkbox') || $element.hasClass('item-radio');

        var listItemContent = angular.element(isAnchor ? '<a></a>' : (isLabel ? '<label></label>' : '<div></div>'));

        if (isAnchor) {
          if (angular.isDefined($attrs.href) || angular.isDefined($attrs.ngHref)) {
            listItemContent.attr('ng-href', $attrs.href || $attrs.ngHref);

            if (angular.isDefined($attrs.target)) {
              listItemContent.attr('target', $attrs.target);
            }
          } else if (angular.isDefined($attrs.uiSref)) {
            listItemContent.attr('ui-sref', $attrs.uiSref);
          }
        }

        listItemContent.addClass('item-content');
        listItemContent.append($element.contents());

        $element.append(listItemContent);
        $element.addClass('item');
      }
    };
  })
  .directive('itemPrefix', function () {
    return {
      restrict: 'E',
      require: '^listItem',
      transclude: true,
      replace: true,
      template: '<div ng-transclude class="item-prefix"></div>'
    }
  })
  .directive('itemOption', function () {
    return {
      restrict: 'E',
      require: '^listItem',
      compile: function () {
        return function ($scope, $element, $attrs, $ctrl) {
          if (!$ctrl.options) {
            $ctrl.options = angular.element('<div class="item-options"></div>');
            $ctrl.element.prepend($ctrl.options);
          }

          $ctrl.options.append($element);
        };
      }
    };
  })
  .directive('itemInput', function () {
    return {
      restrict: 'E',
      require: '^listItem',
      transclude: true,
      replace: true,
      scope: {
        type: '@',
        value: '=ngModel',
        id: '@',
        name: '@',
        disabled: '=ngDisabled',
        pattern: '@',
        placeholder: '@',
        maxLength: '@'
      },
      template: '<div>' +
                  '<label ng-class="{\'has-input\': value, \'has-input-focus\': focus}" class="floating-label">' +
                    '<div>' +
                      '<div ng-if="placeholder" ng-bind="placeholder" class="label"></div>' +
                      '<input type="{{type ? type : \'text\'}}" ng-model="value" ng-disabled="disabled" ng-pattern="pattern" class="input" ng-attr-id="{{id}}" ng-attr-name="{{name}}" ng-attr-maxlength="{{maxLength}}">' +
                    '</div>' +
                  '</label>' +
                '</div>',
      link: function ($scope, $element, $attrs, $ctrl) {
        $element.removeAttr('id');

        $scope.$watch('disabled', function (value) {
          $ctrl.scope.disabled = value;
        });
      }
    };
  })
  .directive('itemTextarea', function () {
    return {
      restrict: 'E',
      require: '^listItem',
      transclude: true,
      replace: true,
      scope: {
        value: '=ngModel',
        id: '@',
        name: '@',
        disabled: '=ngDisabled',
        pattern: '@',
        placeholder: '@',
        maxLength: '@'
      },
      template: '<div>' +
                  '<label ng-class="{\'has-input\': value, \'has-input-focus\': focus}" class="floating-label">' +
                    '<div>' +
                      '<div ng-if="placeholder" ng-bind="placeholder" class="label"></div>' +
                      '<textarea ng-model="value" ng-disabled="disabled" ng-pattern="pattern" class="input" ng-attr-id="{{id}}" ng-attr-name="{{name}}" ng-attr-maxlength="{{maxLength}}"></textarea>' +
                    '</div>' +
                  '</label>' +
                '</div>',
      link: function ($scope, $element, $attrs, $ctrl) {
        $element.removeAttr('id');

        $scope.$watch('disabled', function (value) {
          $ctrl.scope.disabled = value;
        });
      }
    }
  })
  .directive('itemCheckbox', function () {
    return {
      restrict: 'E',
      require: '^listItem',
      transclude: true,
      replace: true,
      scope: {
        label: '@',
        ngModel: '=',
        value: '=',
        id: '@',
        name: '@',
        multiple: '=ngMultiple',
        disabled: '=ngDisabled',
        handle: '@'
      },
      template: function ($element, $attrs) {
        var isMultiple = 'ngMultiple' in $attrs;

        var template = '<div>' +
                         '<div>' +
                           '<div ng-if="label" ng-bind="label" class="label"></div>' +
                           '<div ng-transclude></div>' +
                         '</div>';

        if (isMultiple) {
          template += '<input type="checkbox" ng-model="ngModel" ng-value="value" ng-disabled="disabled" class="checkbox" ng-attr-id="{{id}}" ng-attr-name="{{name}}">';
        } else {
          template += '<div class="switch">' +
                        '<input type="checkbox" ng-model="ngModel" ng-value="value" ng-disabled="disabled" class="checkbox" ng-attr-id="{{handle}}" ng-attr-name="{{name}}">' +
                        '<label ng-attr-for="{{handle}}"></label>' +
                      '</div>';
        }

        template += '</div>';

        return template;
      },
      link: function ($scope, $element, $attrs, $ctrl) {
        $scope.$watch(function () {
          return $element.attr('id');
        }, function () {
          $element.removeAttr('id');
        });

        $scope.$watch('disabled', function (value) {
          $ctrl.scope.disabled = value;
        });

        var handler = function (selected) {
          var checked = $element.find('input').prop('checked');

          if ($scope.multiple) {
            var index = $scope.multiple.indexOf($scope.value);

            if (checked && index === -1) {
              selected ? $element.find('input').prop('checked', false) : $scope.multiple.push($scope.value);
            } else if (!checked && index !== -1) {
              selected ? $element.find('input').prop('checked', true) : $scope.multiple.splice(index, 1);
            }
          }

          $ctrl.scope.selected = $element.find('input').prop('checked');
        };

        if ($scope.multiple) {
          var defaultHandler = angular.bind(self, handler, true),
            changeHandler = angular.bind(self, handler, false);

          $scope.$watch('ngModel', function (value) {
            if (value !== undefined) {
              $element.triggerHandler('change');
            }
          });

          $element.on('change', function () {
            changeHandler();
          });

          $scope.$watch('multiple', defaultHandler);
        }
      }
    };
  })
  .directive('itemRadio', function () {
    return {
      restrict: 'E',
      require: '^listItem',
      transclude: true,
      replace: true,
      scope: {
        label: '@',
        ngModel: '=',
        value: '=',
        id: '@',
        name: '@',
        disabled: '=ngDisabled'
      },
      template: '<div>' +
                  '<div ng-if="label" ng-bind="label" class="label"></div>' +
                  '<div ng-transclude></div>' +
                  '<input type="radio" ng-model="ngModel" ng-value="value" ng-disabled="disabled" ng-checked="ngModel == value" class="radio" ng-attr-id="{{id}}" ng-attr-name="{{name}}">' +
                '</div>',
      link: function ($scope, $element, $attrs, $ctrl) {
        $scope.$watch(function () {
          return $element.attr('id');
        }, function () {
          $element.removeAttr('id');
        });

        $scope.$watch('disabled', function (value) {
          $ctrl.scope.disabled = value;
        });
      }
    };
  })
  .directive('itemStepper', ['ngUIListViewConfig', function (ngUIListViewConfig) {
    return {
      restrict: 'E',
      require: '^listItem',
      transclude: true,
      replace: true,
      scope: {
        value: '=ngModel',
        id: '@',
        name: '@',
        disabled: '=ngDisabled',
        placeholder: '@',
        options: '='
      },
      template: '<label ng-class="{\'has-input\': isNumber(value) || value, \'has-input-focus\': focus}" class="floating-label">' +
                  '<div>' +
                    '<div ng-bind="placeholder" class="label"></div>' +
                    '<input type="number" ng-model="value" ng-disabled="disabled" class="input" ng-attr-id="{{id}}" ng-attr-name="{{name}}" min="{{config.min}}" max="{{config.max}}" step="{{config.stepSize}}">' +
                  '</div>' +
                  '<div class="btn-group stepper">' +
                    '<a ng-click="decrement()" class="btn">' +
                      '<i ng-class="config.iconMinus"></i>' +
                    '</a>' +
                    '<a ng-click="increment()" class="btn">' +
                      '<i ng-class="config.iconPlus"></i>' +
                    '</a>' +
                  '</div>' +
                '</label>',
      link: function ($scope, $element, $attrs, $ctrl) {
        $scope.config = angular.extend({}, ngUIListViewConfig.stepper, $scope.options);
        $scope.isNumber = angular.isNumber;

        $element.removeAttr('id');

        $scope.$watch('disabled', function (value) {
          $ctrl.scope.disabled = value;
        });

        $element.find('input').bind('keypress', function (e) {
          var key = e.which;

          if (!/[0-9]/.test(String.fromCharCode(key)) && !(key === 0 || key === 8)) {
            e.preventDefault();

            return false;
          }
        });

        $scope.decrement = function () {
          if ($scope.isNumber($scope.value)) {
            $scope.value = $scope.value - $scope.config.stepSize;

            if ($scope.value < $scope.config.min) $scope.value = $scope.config.min;
          }
        };

        $scope.increment = function () {
          $scope.value = $scope.value || 0;

          if ($scope.isNumber($scope.value)) {
            $scope.value = $scope.value + $scope.config.stepSize;

            if ($scope.value > $scope.config.max) $scope.value = $scope.config.max;
          }
        };
      }
    };
  }])
  .directive('floatingLabel', function () {
    return {
      restrict: 'C',
      link: function ($scope, $element) {
        angular.element($element[0].querySelectorAll('input, textarea')).bind('focus', function () {
          $scope.$apply(function () {
            $scope.focus = true;
          });
        });

        angular.element($element[0].querySelectorAll('input, textarea')).bind('blur', function () {
          $scope.$apply(function () {
            $scope.focus = false;
          });
        });
      }
    };
  });