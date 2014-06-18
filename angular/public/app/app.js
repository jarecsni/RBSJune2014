var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: '/template/lists.html',
            controller: 'ListsController'
        }).when("/list/:id", {
            templateUrl: '/template/list.html',
            controller: 'ListController'
        })

});

app.service("ListService", ["$http", function ($http) {

    var data = [
        {
            id: 1,
            title: "Todo",
            activities: [
                {
                    name: "Finish chapter",
                    priority: 3
                },
                {
                    name: "Do lab",
                    priority: 2
                },
                {
                    name: "Watch football",
                    priority: 5
                }
            ]
        },
        {
            id: 2,
            title: "Project X"
        }
    ];

    this.getLists = function () {
        return $http.get('/api/list');
        //return data;
    };

    this.save = function(list){

    };

    this.getList = function(id){
        return data[id-1];
    }
}]);

app.controller("ListsController", ["$scope", "ListService", "$location", function($scope, ListService, $location) {
    $scope.lists = [];

    ListService.getLists().then(function(response){
        $scope.lists = response.data;
    });

    $scope.openList = function(id){
        $location.path("/list/" + id);
    }
}]);

app.controller("ListController", ["$scope", "ListService", "$routeParams", "$location", function($scope, ListService, $routeParams, $location) {

    setInterval(function () {
        console.log("new time");
        $scope.$apply(function () {
            $scope.currentTime = new Date().toLocaleTimeString();
        })
    }, 1000);

    $scope.currentDate = new Date()
    $scope.currentTime = new Date().toLocaleTimeString();
    $scope.list = ListService.getList($routeParams.id);
}]);
