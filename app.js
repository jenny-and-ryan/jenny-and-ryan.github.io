var app = angular.module('wedding', []);

app.controller('WeddingCtrl', function($scope) {
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
});