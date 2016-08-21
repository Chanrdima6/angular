app.controller('myCtrl', function($rootScope, $scope, $http, $routeParams, myService, UserService, idService, ButtonService) {
	
	for(key in ButtonService.name) {
		angular.element(document.getElementById(ButtonService.name[key])).removeClass('active');
	}
	if($routeParams.test != undefined) {debugger;
		angular.element(document.querySelector('.notes')).remove();
		for(key in ButtonService.name) {
			
			if($routeParams.test == ButtonService.name[key]) {
				
				angular.element(document.getElementById(ButtonService.name[key])).addClass('active');
				if(parseInt(key)>0 && parseInt(key)<ButtonService.name.length-1) {
					$scope.previous = false;
					$scope.next = false;
				}
				else if(parseInt(key) === ButtonService.name.length-1) {
					$scope.next = true;
					$scope.previous = false;
				}
				if($scope.next == false) {
					angular.element(document.querySelector('.next')).attr('href', '#'+ButtonService.name[parseInt(key)+1]);
					angular.element(document.getElementById(ButtonService.name[key])).addClass('active');
				}
				if($scope.previous == false) {
					angular.element(document.querySelector('.previous')).attr('href', '#'+ButtonService.name[parseInt(key)-1]);
					angular.element(document.getElementById(ButtonService.name[key])).addClass('active');
				}
			}
		}
	}
	
		

    $scope.counter = 0;
    $scope.user = {};
    $scope.student = [];
    $scope.valid = false;
	$scope.elem2 = angular.element(document.querySelector('#submit_edu_details'));
	
	$scope.removeAlert = function() {
		$scope.valid = false;
	};
	
	$scope.formSubmit = function(MyE) {
		
  		$http({
  			method:'POST',
  			url:"json/login.json",
  			data:$scope.user
  		}).success(function(response, status, headers, config) {
  				
  				$scope.data = response;
  				for(key in response) {
  					if(config.data.username == response[key].username && config.data.password == response[key].password) {
						$rootScope.enable = true;
						break;
  					}
  				}
  				if($rootScope.enable == false) {
  						$scope.valid = true;
  				}
  				else {
					response = config;
				}
				$scope.user.password = "";
   				$scope.formDelete = function(myE) {
					$rootScope.enable = false;
					UserService.name = {};
					$rootScope.cal = 1;
					
				};	
				$scope.previous = true;
				$scope.next = false;
			});
			angular.element(document.querySelector('.notes')).html('Please select one tab');
		
	};
	
	$scope.notSorted = function(obj){
        if (!obj) {
            return [];
        }
        console.log(obj);
        return Object.keys(obj);
    }
    
    $scope.change = function() {
    	if($scope.check == true) {
    		$scope.user.perhouseNo = $scope.user.houseNo;
    		$scope.user.perstreetName = $scope.user.streetName;
    		$scope.user.perlocality = $scope.user.locality;
    		$scope.user.perstate = $scope.user.state;
    		$scope.user.perzipCode = $scope.user.zipCode;
    	}
    	else {
    		$scope.user.perhouseNo = "";
    		$scope.user.perstreetName = "";
    		$scope.user.perlocality = "";
    		$scope.user.perstate = "";
    		$scope.user.perzipCode = "";
    	}
    }
    
	$scope.submit = function(myE) {
		for(key in ButtonService.name) {
			angular.element(document.getElementById(ButtonService.name[key])).removeClass('active');
		}
		$http({
  			method:'POST',
  			url: "json/formdata.json",
  			data: $scope.user,
  			student: $scope.student
  		}).success(function(response, status, headers, config) {
  				
  					if('firstname' in config.data) {
  						idService.set(config.data.firstname);
						UserService.name['studentId'] = idService.get();
					}
				
  				
  				for(key in config.data) {
  					if(key in response) {
  						if(key == "phoneNumber") {
  							response[key] = "91-" + config.data[key];
  						}
  						else {
  							response[key] = config.data[key];
  						}
  						UserService.name[key] = response[key];
  					}
  				}
  				
  			if($rootScope.cal == 1) {
  				UserService.name['qualification'] = [];
  				UserService.name['marks'] = [];
  			}
  				for(key in config.student) {
  					for(value in config.student[key]) {
  						
  						if(value in response) {
  							response[value][key] = config.student[key][value];
  							UserService.name[value].push(response[value][key]);
							$rootScope.cal++;
  						}
  					}
  				}
			});
			
			 if(myE.target == $scope.elem2[0]) {
			 	$scope.previous = false;
				$scope.next = true;
			 }
			 angular.element(document.querySelector("div[ng-view]")).html('<p class="well notes">'+$routeParams.test+' details form has been submitted<p>');
			 console.log($routeParams.test);
		};
	console.log(UserService.name);
	$scope.data = UserService.name;
	$scope.studentId = UserService.name.studentId;
	$scope.addRows = function() {
    	$scope.counter++;
		$scope.student.push({ 'qualification': $scope.qualification, 'marks':$scope.marks });
		$scope.qualification='';
		$scope.marks='';
		$rootScope.count++;
	}
});




