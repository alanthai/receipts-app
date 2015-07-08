angular.module('receipts').config(function($stateProvider) {
  $stateProvider
    // .state('tab.photo', {
    //   url: '/new-photo',
    //   views: {
    //     'tab-photo': {
    //       templateUrl: 'modules/photos/tab-photos.html',
    //       controller: 'NewPhotoController'
    //     }
    //   }
    // })
    // .state('edit-photo', {
    .state('tab.edit-photo', {
      url: '/edit-photo',
      views: {
        'edit-photo': {
          templateUrl: 'modules/photos/edit-photo.html',
          controller: 'EditPhotoController'
        }
      }
    })
    ;
});