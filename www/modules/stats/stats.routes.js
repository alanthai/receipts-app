angular.module('receipts').config(function($stateProvider) {
  $stateProvider
    .state('tab.stats', {
      url: '/stats',
      views: {
        'tab-stats': {
          templateUrl: 'modules/stats/tab-stats.html',
          controller: 'StatsController'
        }
      }
    })
    ;
});