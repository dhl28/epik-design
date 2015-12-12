'use strict';

angular.module('epikDesignApp')
  .controller('ComSelectCtrl', function ($scope) {
    $scope.vm = {
      class1: 2,
      class2: [33,44],
      class3: 333
    }
    $scope.classifications = {
      class1: [
        {id: 1, name: '选项1', code: 'code1', path: 'a'},
        {id: 2, name: '选项2', code: 'code2', path: 'b'},
        {id: 3, name: '选项3', code: 'code3', path: 'c'},
        {id: 4, name: '选项4', code: 'code4', path: 'd'},
        {id: 5, name: '选项5', code: 'code5', path: 'e'},
        {id: 6, name: '选项6', code: 'code6', path: 'f'}
      ],
      class2 : [
        {id: 11, name: '选项11', code: 'code11', path: 'aa'},
        {id: 22, name: '选项22', code: 'code22', path: 'bb'},
        {id: 33, name: '选项33', code: 'code33', path: 'cc'},
        {id: 44, name: '选项44', code: 'code44', path: 'dd'},
        {id: 55, name: '选项55', code: 'code55', path: 'ee'},
        {id: 66, name: '选项66', code: 'code66', path: 'ff'}
      ],
      class3 : [
        {id: 111, name: '选项111', code: 'code111', path: 'aaa'},
        {id: 222, name: '选项222', code: 'code222', path: 'bbb'},
        {id: 333, name: '选项333', code: 'code333', path: 'ccc'},
        {id: 444, name: '选项444', code: 'code444', path: 'ddd'},
        {id: 555, name: '选项555', code: 'code555', path: 'eee'},
        {id: 666, name: '选项666', code: 'code666', path: 'fff'}
      ]
    }
  });
