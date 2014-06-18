var app = angular.module("app", ["ngRoute", "ngResource"]);

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

app.service("ListService", ["ListResource", function (List) {

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
        //return $http.get('/api/list');
        return List.query();
    };

    this.save = function(list){

    };

    this.getList = function(id){
        return data[id-1];
    }
}]);

app.controller("ListsController", ["$scope", "ListService", "$location", function($scope, ListService, $location) {

    $scope.lists = ListService.getLists();

    $scope.openList = function(id){
        $location.path("/list/" + id);
    };

    $scope.getItem = function(id){
        var list = $scope.lists[id -1];
        console.log(list);
    }
}]);

app.factory("ListResource", function ($resource) {
    return $resource('/api/list/:id', {
        id: '@id'
    }, {
        save: {
            method: 'PUT'
        }
    });
});


app.controller("ListController", ["$scope", "ListService", "$routeParams", "$location", function($scope, ListService, $routeParams, $location) {

    setInterval(function () {
        $scope.$apply(function () {
            $scope.currentTime = new Date().toLocaleTimeString();
        })
    }, 1000);

    $scope.currentDate = new Date()
    $scope.currentTime = new Date().toLocaleTimeString();
    $scope.list = ListService.getList($routeParams.id);
}]);
