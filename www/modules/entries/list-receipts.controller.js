angular.module('receipts')
  .controller('ListReceiptsController', function($scope, Receipts) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    
    $scope.receipts = Receipts.all();
    $scope.remove = function(receipt) {
      Receipts.remove(receipt);
    }
  });
