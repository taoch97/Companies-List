var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope){
    var idx = -1;
    $scope.info = {};
    $scope.companies = [
        {country: "美国", name: "沃尔玛", address:"address", email:"qwerty@apple.com", tel: "1234567"},
        {country: "中国", name: "国家电网", address:"address", email:"qwerty@apple.com", tel: "1234567"},
        {country: "中国", name: "中石化", address:"address", email:"qwerty@apple.com", tel: "1234567"},
        {country: "中国", name: "中石油", address:"address", email:"qwerty@gmail.com", tel: "1234567"},
        {country: "日本", name: "丰田", address:"address", email:"qwerty@gmail.com", tel: "1234567"}
    ];
    $scope.controller = {
        state: "",

        del: function($index){
            if ($index >= 0){
                if (confirm("是否删除" + $scope.companies[$index].name) ) {
                    $scope.companies.splice($index, 1);
                }
            }
        },
        add: function(){
            this.state = "添加公司";
            $scope.info = {}; 
            $('#modal-1').modal('show');
        },
        update: function($index){
            this.state = "修改信息";
            $('#modal-1').modal('show');
            idx = $index;
            $scope.info = angular.copy($scope.companies[$index]);
        },
        save: function (){
            (this.state=="修改信息") ? ($scope.companies[idx] = $scope.info): ($scope.companies.push($scope.info));
            $('#modal-1').modal('hide');
        }
    }
});
    // $scope.del = function ($index){
    //     if ($index >= 0){
    //         if (confirm("是否删除？" + $scope.companies[$index].name) ) {
    //             $scope.companies.splice($index, 1);
    //         }
    //     }
    // };

    // var idx = -1;
    // $scope.state = "";
    // $scope.info = {}
    // $scope.add = function (){
    //     $scope.state = "添加公司";
    //     $scope.info = {};
        
    //     $('#modal-1').modal('show');
    // };
    // $scope.update = function ($index){
    //     $scope.state = "修改信息";
    //     $('#modal-1').modal('show');
    //     idx = $index;
    //     $scope.info = angular.copy($scope.companies[$index]);
    // };
    // $scope.save = function (){
    //     $scope.state=="修改信息"?$scope.companies[idx] = 
    //         $scope.info:$scope.companies.push($scope.info);
    //     $('#modal-1').modal('hide');
    // };