'use strict';

angular.module('epikDesignApp')
  .controller('ComFormValidateCtrl', function ($scope) {
    $scope.vm = {}

    $scope.datepickerCtrl = {
      input4Opened : false,
      funOpenInput4 : function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.input4Opened = true;
      }
    }

    $scope.classifications = {
      class1: [
        {id: 1, name: '选项1', code: 'code1', path: 'a'},
        {id: 2, name: '选项2', code: 'code2', path: 'b'},
        {id: 3, name: '选项3', code: 'code3', path: 'c'},
        {id: 4, name: '选项4', code: 'code4', path: 'd'},
        {id: 5, name: '选项5', code: 'code5', path: 'e'},
        {id: 6, name: '选项6', code: 'code6', path: 'f'}
      ]
    }
  });
