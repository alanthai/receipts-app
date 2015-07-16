angular.module('receipts')
  .factory('Receipts', function() {
    function randomBetween(min, max) {
      return Math.floor(Math.random() * max) + min;
    }

    function generateRandomDate() {
      var date = new Date(2015, 2);
      date.setDate(randomBetween(0, 3));
      return date.toISOString();
    }

    function generateRandomPrice() {
      return randomBetween(10, 100)/10
    }

    var receipts = [{
      id: 0,
      store: 'Walmart',
      total: generateRandomPrice(),
      timestamp: generateRandomDate(),
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
      id: 1,
      store: 'Loblaws',
      total: generateRandomPrice(),
      timestamp: generateRandomDate(),
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    },{
      id: 2,
      store: 'Walgreens',
      total: generateRandomPrice(),
      timestamp: generateRandomDate(),
      face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
      id: 3,
      store: 'Pizza Pizza',
      total: generateRandomPrice(),
      timestamp: generateRandomDate(),
      face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
    }, {
      id: 4,
      store: 'Chuckie Cheese',
      total: generateRandomPrice(),
      timestamp: generateRandomDate(),
      face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
    }];

    return {
      all: function() {
        return receipts;
      },
      remove: function(receipt) {
        receipts.splice(receipts.indexOf(receipt), 1);
      },
      get: function(receiptId) {
        for (var i = 0; i < receipts.length; i++) {
          if (receipts[i].id === parseInt(receiptId)) {
            return receipts[i];
          }
        }
        return null;
      }
    };
  });
