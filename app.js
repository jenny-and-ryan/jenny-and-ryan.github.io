var app = angular.module('wedding', ['ngAnimate', 
                                     'ngRoute',
                                     'ngSanitize',
                                     'duScroll',
                                     'wu.masonry', 
                                     'ui.bootstrap']);

app.controller('WeddingCtrl', WeddingCtrl);
app.controller('WeddingImagesCtrl', WeddingImagesCtrl);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'main.html',
        controller: 'WeddingCtrl'
    })
        .when('/us', {
        templateUrl: 'wedding-images.html',
        controller: 'WeddingImagesCtrl'
    })
        .otherwise({
        redirectTo: '/'
    });
}]);

app.service('WeddingService', function() {
    var imageIdx = 0;
    var MAIN_IMG_COUNT = 7;
    var OVERFLOW_IMG_COUNT = 11;

    var idx = 0;

    var makeImgList = function(prefix, count)
    {
        var arr = [];
        for (var i=1; i<=count; i++)
        {
            arr.push({
                src: '/images/' + prefix + i + '.jpg',
                id: idx++
            });
        }
        return arr;
    }

    this.MAIN_IMAGES = makeImgList('us-main', MAIN_IMG_COUNT);
    var overflowImages = makeImgList('us-overflow', OVERFLOW_IMG_COUNT);
    this.OVERFLOW_IMAGES = this.MAIN_IMAGES.concat(overflowImages);
});

WeddingCtrl.$inject = ['$scope', '$timeout', 'WeddingService'];
function WeddingCtrl($scope, $timeout, WeddingService)
{
    $scope.sections = [
        'Event',
        'Travel',
        'The Burgh',
        'Registry',
        'RSVP'
    ]

    $scope.sectionIds = $scope.sections.map(function(sectionName) {
        return sectionName.toLowerCase().replace(/ /g, ''); 
    });

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;

    $scope.slides = WeddingService.MAIN_IMAGES;
};

WeddingImagesCtrl.$inject = ['$scope', 'WeddingService']
function WeddingImagesCtrl($scope, WeddingService) {
    $scope.images = angular.copy(WeddingService.OVERFLOW_IMAGES);
    shuffleArray($scope.images);

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
};