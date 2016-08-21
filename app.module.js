var app = angular.module('myApp', ['ngRoute']);
app.run(function($rootScope){
	$rootScope.enable = false;
	$rootScope.count = 0;
	$rootScope.cal = 1;
});