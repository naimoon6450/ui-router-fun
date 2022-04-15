// defines myAppInit as your main application
var myAppInit = angular.module('myApp', ['ui.router'])

// register states within a config blocks
myAppInit.config(function($stateProvider) {
    $stateProvider.state('mathState', {
        url: '/math_hardcoded',
        templateUrl: 'math.html',
        controller: 'math_controller'
    }).state('mathQueryState', {
        // you have to place your query param variables here for it to be assigned upon visiting the url
        url: '/math_query/:a/:b?query1&query2',
        templateUrl: 'math_query.html',
        controller: 'math_query_controller'
    }).state('mathInputState', {
        url: '/math_inputs',
        templateUrl: 'math_input.html',
        controller: 'math_input_controller'
    }).state('resultState', {
        url: '/result',
        templateUrl: 'result.html',
        controller: 'result_controller',
        params: {
            result: null,
            isLoading: true
        }
    }).state('multiplyResolveState', {
        url: '/multiply',
        templateUrl: 'result.html',
        controller: 'multiply_resolve_controller',
        params: {
            a: 0,
            b: 0
        },
        resolve: {
            result: function(dataService, $stateParams) {
                console.log('WITHIN RESOLVE, sending params to service', $stateParams)
                return dataService.multiply($stateParams.a, $stateParams.b)
            } 
        }
    }).state('homeState', {
        url: '/',
        templateUrl: 'home.html'
    })
})

myAppInit.controller('math_controller', ['$scope', function($scope) {
    // assigning scope variables directly
    $scope.a = 10
    $scope.b = 20

    console.log('FROM math_controller', `$scope.a = ${$scope.a}, $scope.b = ${$scope.b}`)
}])

myAppInit.controller('math_query_controller', ['$scope', '$stateParams', function($scope, $stateParams) {
    // assigning scope variables from query params
    // $stateParams is just an object with your query + URL params 
    $scope.a = parseInt($stateParams.a)
    $scope.b = parseInt($stateParams.b)
    console.log('FROM math_query_controller', `$scope.a = ${$scope.a}, $scope.b = ${$scope.b}`)
    console.log('$stateParams object', $stateParams)

}])

myAppInit.controller('math_input_controller', ['$scope', '$state', 'dataService', function($scope, $state, dataService) {
    // assigning scope variables from query params
    $scope.a = 0
    $scope.b = 0

    // BASIC + ASYNC CALL
    // UPDATE result.html to account for async version
    $scope.doSum = function() {
        // basic add + change state
        // let result = parseInt($scope.a) + parseInt($scope.b)
        // console.log('going to resultState')
        // $state.go('resultState', {
        //     result: result
        // })

        // async state change where data isn't loaded before state changes
        $state.go('resultState')
        dataService.add($scope.a, $scope.b).then(function(result) {
            $state.go('resultState', {
                result: result.data,
                isLoading: false
            })
        })
    }

    // WITH RESOLVE
    $scope.doMultiply = function() {
        $state.go('multiplyResolveState', {
            a: $scope.a,
            b: $scope.b,
        })
    }
}])

myAppInit.controller('result_controller', ['$scope', '$stateParams', function($scope, $stateParams) {
    $scope.result = $stateParams.result // different way to access params
    $scope.isLoading = $stateParams.isLoading
    console.log('reached resultState and within result_controller', $scope.result)
}])

myAppInit.controller('multiply_resolve_controller', ['$scope', 'result', function($scope, result) {
    $scope.result = result.data
    console.log('Resolved the product', result)
}])