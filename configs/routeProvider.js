app.config(['$routeProvider', function($routeProvider, myService, ButtonService){
							
							$routeProvider
								.when("/Personal", {controller: 'myCtrl', templateUrl: "templates/Personal.html",resolve: {
        test: function ($route) { $route.current.params.test = 'Personal'; }
    }})
								.when("/Educational", {controller: 'myCtrl', templateUrl: "templates/Educational.html",resolve: {
        test: function ($route) { $route.current.params.test = 'Educational'; }
    }})
    							.when("/Final", {controller: 'myCtrl', templateUrl: "templates/Final.html",resolve: {
        test: function ($route) { $route.current.params.test = 'Final'; }
    }})	
    							.when("/Address", {controller: 'myCtrl', templateUrl: "templates/Address.html",resolve: {
        test: function ($route) { $route.current.params.test = 'Address'; }
    }})	
								.otherwise({redirectTo:'/loginForm'});
		}]);
