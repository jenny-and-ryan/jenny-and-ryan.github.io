var app = angular.module('wedding', ['ngAnimate', 'ngSanitize', 'wu.masonry', 'ui.bootstrap']);

app.controller('WeddingCtrl', WeddingCtrl);

WeddingCtrl.$inject = ['$scope', '$timeout'];
function WeddingCtrl($scope, $timeout)
{
    $scope.foo = 'hi there'; 

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

    var UID = 0;
    $scope.makeImg = function(size, color)
    {
        UID++;

        return {
            '_uid': UID,
            'src': 'http://placehold.it/'+size+'/'+color
        }
    }

    $scope.imageSpec = [
        $scope.makeImg('350x250', '123456'),
        $scope.makeImg('350x251', 'abcdef'),
        $scope.makeImg('350x252', 'abcabc'),
        $scope.makeImg('350x253', '123123'),
        $scope.makeImg('350x254', '012301'),
        $scope.makeImg('350x255', 'fffeee'),
    ];

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;

    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function() {
        var newWidth = 900 + slides.length + 1;
        slides.push({
            image: '//unsplash.it/' + newWidth + '/400',
            id: currIndex++
        });
    };
    
    slides.push({
        image: '/images/us1.jpeg',
        id: currIndex++
    });
    slides.push({
        image: '/images/us2.jpg',
        id: currIndex++
    });

    for (var i = 0; i < 10; i++) {
        $scope.addSlide();
    }
};

app.controller('WeddingImgCtrl', function($scope) {
    $scope.click = function()
    {
        var thisUID = $scope.brick._uid;
        for (var i=0; i<$scope.imageSpec.length; i++)
        {
            if ($scope.imageSpec[i]._uid == thisUID)
            {
                var newImg = $scope.makeImg('350', 'eeefff');
                $scope.imageSpec.splice(i, 1, newImg);
                break;
            }
        }
        for (var i=0; i<$scope.imageSpec.length; i++)
        {
            console.log(i + ' ' + JSON.stringify($scope.imageSpec[i]));
        }
    }
});