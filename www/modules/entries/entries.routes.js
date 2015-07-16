angular.module('receipts').config(function($stateProvider) {
  $stateProvider
    .state('tab.entries', {
      url: '/entries',
      views: {
        'tab-entries': {
          templateUrl: 'modules/entries/tab-receipts.html',
          controller: 'ListReceiptsController'
        }
      }
    })
    .state('tab.entry', {
      url: '/entries/:receiptId',
      views: {
        'tab-entries': {
          templateUrl: 'modules/entries/receipt.html',
          controller: 'ReceiptController'
        }
      }
    })
    ;
});