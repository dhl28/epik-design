'use strict';

angular.module('epikDesignApp')
  .controller('ComDatepickerCtrl', function ($scope) {
    $scope.vm = {
      date1 : new Date(),
      date2 : null
    }

    $scope.datepickerCtrl = {
      date1Opened : false,
      funOpenDate1 : function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.datepickerCtrl.date1Opened = true;
      },
      datePickerOptions1: {
        'datepicker-mode': "'month'",
        'min-mode': 'month'
      },
      date2Opened : false,
      funOpenDate2 : function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.datepickerCtrl.date2Opened = true;
      }
    }
  });
