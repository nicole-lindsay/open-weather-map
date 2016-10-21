angular.module('OWMApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
        }).when('/cities/:city', {
            templateUrl: 'city.html',
            controller: 'CityCtrl',
            controllerAs: 'vm',
            resolve: {
                city: function(owmCities, $route, $location) {
                    var city = $route.current.params.city;
                    if (owmCities.indexOf(city) === -1) {
                        $location.path('/error');
                        return;
                    }
                    return city;
                }
            }
        }).when('/error', {
        	template: '<p>Error - Page Not Found</p>'
        })
        .otherwise('/error');
    }])
    .run(['$rootScope', '$location', function($rootScope, $location){
    	$rootScope.$on('$routeChangeError', function(){
    		$location.path('/error');
    	})
    }])
	.value('owmCities', ['New York', 'Atlanta', 'Tampa'])
    .controller('HomeCtrl', [function() {
    	//nothing yet
    }])
    .controller('CityCtrl', ['city', function(city) {
        var vm = this;
        vm.city = city;
    }]);