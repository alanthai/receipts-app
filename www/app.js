angular.module('receipts', ['ionic'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

      if (window.plugins && window.plugins.tesscordova) {
        console.log("==========plugin loaded!=========");
      }
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      try {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      } catch (err) {}

      try {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      } catch (err) {}
    });
  });

angular.module('receipts')
  .config(function($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "tabs.html"
      });

    $urlRouterProvider.otherwise('/tab/edit-photo');

  });
