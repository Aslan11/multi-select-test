/*	Define Angular App
---------------------------------------------------------------------- */
var app = angular.module('app', ['ngRoute', 'ngResource']);

app.config(function($httpProvider, $routeProvider, $locationProvider){
	$routeProvider.
		when('/', {
			action: 'home'
		}).
		otherwise({ redirectTo: '/' });

	// Remove "#" from the URL (Except for IE < 10)
	if(window.history && window.history.pushState){
		$locationProvider.html5Mode(true);
	}
});
/*	Main Controller
---------------------------------------------------------------------- */
app.controller('mainController', function($scope, $http, $rootScope, $location, $route, $routeParams, $timeout, $resource, $element){
	$scope.categories = null;

	//Get Ze Data...
	$http({method: 'GET', url: '../../data.json'}).
	    success(function(data, status, headers, config) {
	      $scope.categories = data.results;
	      for (var i = 0; i < $scope.categories.length; i++){
		      $scope.categories[i].active = false;
	      }
	    }).
	    error(function(data, status, headers, config) {
	      console.log('Oh snap... data is missing!')
	    });
	    

	//tab toggle
	$scope.lastSelectedCategory = -1;
	$scope.setSelected = function(idx) {
        for (var i = 0; i < $scope.categories.length; i++){
	      	$scope.categories[i].active = false;
		}
        $scope.categories[idx].active = 'true';
    };
	
});



var classToggler = function(element, className) {
    element = $(element);
    element.toggleClass(className);
};

app.directive('Category', function(){
	
})
