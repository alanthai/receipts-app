angular.module('receipts').directive('dateList', function($filter) {
  var format = $filter('date');

  function dateSort(a, b) {
    return a.timestamp.localeCompare(b.timestamp);
  }

  return {
    templateUrl: 'modules/entries/rc-list.html',
    scope: {
      rcList: '='
    },
    controller: function DateListController($scope, $element, $attrs) {
      var list = this.sortedList = {};
      $scope.rcList.forEach(function(obj) {
        var date = format(obj.timestamp, 'yyyy-MM-dd');
        (list[date] = list[date] || []).push(obj);
      });
    },
    controllerAs: 'listCtrl'
  }
});