'use strict';

angular.module('epikDesignApp')
  .controller('ComRadioButtonCtrl', function ($scope) {
    $scope.classifications = {
      classOne: [{
        id: 1,
        name: '选项1',
        value: 'value1'
      }, {
        id: 2,
        name: '选项2',
        value: 'value2'
      }, {
        id: 3,
        name: '选项3',
        value: 'value3'
      }]
    };

    $scope.vm = {
      classOnePick : null
    };
  });
