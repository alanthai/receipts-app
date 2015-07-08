angular.module('receipts')
  .controller('ReceiptController', function($scope, $stateParams, Receipts) {
    $scope.receipt = Receipts.get($stateParams, receiptId);
  });