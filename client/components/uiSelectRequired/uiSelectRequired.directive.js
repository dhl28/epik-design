/**
 * Created by YanJia on 2015/12/11.
 */
angular.module('epikDesignApp').directive('uiSelectRequired', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$validators.uiSelectRequired = function (modelValue, viewValue) {

        var determineVal;
        if (angular.isArray(modelValue)) {
          determineVal = modelValue;
        } else if (angular.isArray(viewValue)) {
          determineVal = viewValue;
        } else {
          return false;
        }

        return determineVal.length > 0;
      };
    }
  };
});
