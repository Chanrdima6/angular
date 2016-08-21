app.factory('idService', function() {
	var savedData = ""
	function set(firstName) {
		console.log(firstName);
	  savedData = firstName.charAt(0)+1;
	  
	  console.log(savedData);
	}
	function get() {
	 return savedData;
	}

	return {
	 set: set,
	 get: get
	}

});