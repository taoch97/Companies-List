var myApp = angular.module('myApp', ['ui.router']);

myApp.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider) {
    var companyState = {
        name: 'company',
        url: '/company',
        templateUrl: 'cList.html'
    };
    var departmentState = {
        name: 'department',
        url: '/department',
        template: '<h3>Hello!</h3>'
    };
    var personState = {
        name: 'person',
        url: '/person',
        template: '<h3>Aloha!</h3>'
    };
    $stateProvider.state(companyState);
    $stateProvider.state(departmentState);
    $stateProvider.state(personState);
}]);

myApp.controller('myCtrl', function ($scope) {
    var idx = -1;
    $scope.info = {};
    $scope.test = "";
    $scope.companies = [{
            country: "US",
            name: "WALMART",
            address: "address",
            email: "qwerty@walmart.com",
            tel: "1324653"
        },
        {
            country: "CN",
            name: "SGCC",
            address: "address",
            email: "qwerty@sgcc.com",
            tel: "5498467"
        },
        {
            country: "CN",
            name: "SINOPEC",
            address: "address",
            email: "qwerty@sinopec.com",
            tel: "4946512"
        },
        {
            country: "CN",
            name: "POTROCHINA",
            address: "address",
            email: "qwerty@petrochina.com",
            tel: "2133212"
        },
        {
            country: "JP",
            name: "TOYOTA",
            address: "address",
            email: "qwerty@toyota.com",
            tel: "3549816"
        }
    ];

    $scope.$watch('test', function () {
        if ($scope.test == "") {
            $scope.search = true;
        } else {
            $scope.search = false;
        }
    });
    $scope.controller = {
        state: "",
        sort: '',
        desc: false,
        del: function ($index) {
            if ($index >= 0) {
                if (confirm("是否删除" + $scope.companies[$index].name)) {
                    $scope.companies.splice($index, 1);
                }
            }
        },
        add: function () {
            this.state = "添加公司";
            $scope.info = {};
            $('#modal-1').modal('show');
        },
        update: function ($index) {
            this.state = "修改信息";
            $('#modal-1').modal('show');
            idx = $index;
            $scope.info = angular.copy($scope.companies[$index]);
        },
        save: function () {
            (this.state == "修改信息") ? ($scope.companies[idx] = $scope.info) : ($scope.companies.push($scope.info));
            $('#modal-1').modal('hide');
            $('body').dimmer('show');
            setTimeout(function () {
                $('body').dimmer('hide');
            }, 2000);
        },
        //列表排序
        sortList: function (type) {
            this.sort = type;
            this.desc = !$scope.controller.desc;
        },
        //搜索框内容删除
        remove: function () {
            $scope.test = "";
        }
    }
});
//html格式的字符串转成html格式显示
myApp.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    }
}]);
//高亮显示                     
myApp.filter('highlight', function ($sce) {
    return function (text, search) {
        // if (!search) {
        //     return $sce.trustAsHtml(text);
        // }
        var regex = new RegExp(search, 'gi');
        var result = text.replace(regex, '<span class="highLight">$&</span>');
        return result;
        //return $sce.trustAsHtml(result);
    }
});

$("#menu_list a").click(function(){
    $("#menu_list a").removeClass();
    $("#menu_list a").addClass("item");
    $(this).addClass("item active");
});