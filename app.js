
var MyApp = angular.module("myapp", ['ngRoute']);
// .filter('sortINt', function (a,b) { return a-b })


MyApp.directive('randomNinja', [function () {
    return {
        restrict: 'E',
        scope: {
            ninjas: '=',
            title: '='
        },
        templateUrl: 'views/randomNinja.html',
        transclude: true,
        controller: function ($scope) {
            $scope.random = Math.floor(Math.random() * 4);
        }
    }
}])
MyApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/home', {
            templateUrl: 'views/homepage.html',
            controller: 'NinjaController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'

        })
        .when('/contact-success', {
            templateUrl: 'views/contact-success.html',
            controller: 'ContactController'

        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'NinjaController'
        }).otherwise({
            redirectTo: '/home'
        });
}])


MyApp.controller('NinjaController', ['$scope', '$http', function ($scope, $http) {


    $scope.message = 'hello my name utkarsh gupta';

    $http.get('ninjas.json')
        .then(function (response) {
            $scope.ninjas = response.data;
            // console.log(angular.toJson($scope.ninjas));
        })
        .catch(function (error) {
            $scope.ninjas = null;
        });

    $scope.removeNinja = function (ninja) {
        var removeNinja = $scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removeNinja, 1);
    }

    $scope.addNinja = function () {
        $scope.ninjas.push({
            name: $scope.newNinja.name,
            rate: $scope.newNinja.rate,
            belt: $scope.newNinja.belt,
            available: true,
            src: ""
        })

        $scope.newNinja.name = ""
        $scope.newNinja.rate = ""
        $scope.newNinja.belt = ""
    }


}]);


MyApp.controller('ContactController', ['$scope', '$location', function ($scope, $location) {

    $scope.senddetails = function(){
        $location.path('contact-success');
    }
}])



/**
 * Configures the Angular module "myapp" before the page is loaded.
 */
// MyApp.config(
// Logic to be executed before the Angular module has been loaded
//)

/**
 * Runs after the Angular module "myapp" has been loaded and initialized.
 */
// MyApp.run(
// Logic to be executed after the Angular module has been loaded
//)