/*	Define Angular App
---------------------------------------------------------------------- */
var app = angular.module('app', ['ngRoute', 'ngResource']);

/*	Main Controller
---------------------------------------------------------------------- */
app.controller('mainController', function($scope, $http, $rootScope, $location, $route, $routeParams, $timeout, $resource, $element){
	$scope.categories = null;
	
	//parent organization objects
	$scope.orgs = [];
	

	//Get Ze Data...
	$http({method: 'GET', url: './scripts/data.json'}).
	    success(function(data, status, headers, config) {
	      $scope.categories = data.results;
		  var valid = false;
	      //Loop through the categories
	      for (var i = 0; i < $scope.categories.length; i++){
		      $scope.categories[i].count = 0;
		      //loop through the organizations
		      for(var s = 0; s < $scope.categories[i].organizations.length; s++){
		      	  $scope.categories[i].organizations[s].counted = false;
		      	  var isDuplicate = false;
		      	  //loop through exisiting organizations to make sure we dont double up, then add to parent organizations
		      	  for( var d = 0; d < $scope.orgs.length; d++){
			      	  if($scope.categories[i].organizations[s].id == $scope.orgs[d].id){
				      	  isDuplicate = true;
			      	  }
		      	  }
		      	  
		      	  if(isDuplicate === false){
			      	  $scope.orgs.push({
			      	  'id': $scope.categories[i].organizations[s].id,
			      	  'active': false
			      	  });
		      	  }
		      }
	      }
	    }).
	    error(function(data, status, headers, config) {
	      console.log('Oh snap... data is missing!')
	    });
	    
	//set the parent organization object state
	$scope.setActive = function(id){
		//check the id against the existing organizations
		for (var i = 0; i < $scope.orgs.length; i++){
			if (id == $scope.orgs[i].id){
				if($scope.orgs[i].active == false){
					$scope.orgs[i].active = true;
				}else{
					$scope.orgs[i].active = false;
				}
			}
		}	
		$scope.checkActive();	
	};
	
	$scope.checkActive = function(){
		//categories
		for (var i = 0; i < $scope.categories.length; i++){
			var count = 0;
			//organizations per category
			for(var s = 0; s < $scope.categories[i].organizations.length; s++){
			 	//parent organzitions array
			 	for( var d = 0; d < $scope.orgs.length; d++){
			 		//if the organization id matches the parent organization id and that parent organzition has been activated by setActive  			
					if($scope.categories[i].organizations[s].id == $scope.orgs[d].id && $scope.orgs[d].active){
						count++;
						$scope.categories[i].organizations[s].active = true;
					}else if($scope.categories[i].organizations[s].id == $scope.orgs[d].id && $scope.orgs[d].active == false){
						$scope.categories[i].organizations[s].active = false;
					}
				}
			}
			$scope.categories[i].count = count;
		}
	};
	    

	//tab toggle
	$scope.setSelected = function(idx, currState) {
		for (var i = 0; i < $scope.categories.length; i++){
	   		$scope.categories[i].active = false;
	   	}
		if(currState){
			 $scope.categories[idx].active = false;	
		}else{
			 $scope.categories[idx].active = true;
		}
       
    };
	
});


