angular.module('receipts').config(function($stateProvider) {
  $stateProvider
    .state('tab.entries', {
      url: '/entries',
      views: {
        'tab-receipts': {
          templateUrl: 'modules/entries/tab-receipts.html',
          controller: 'ListReceiptsController'
        }
      }
    })
    ;
});