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
	    }).
	    error(function(data, status, headers, config) {
	      console.log('Oh snap... data is missing!')
	    });
	
});

app.directive('category', function($element) {
	var directive = {};
	directive.restrict = "A";
	directive.scope = {
		'user' : "@"
	}
	
	$element.on('click', function(){clear()});
	
	directive.clear = function(){
		directive.scope.user = 'bitchass';
	}
	
	
	
	directive.template = '{{category.name}}';
	
	return directive;
	/*
return {
		template: '{{category.name}}'
	};
*/
});