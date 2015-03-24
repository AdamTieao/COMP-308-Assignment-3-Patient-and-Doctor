var app = angular.module("myApp", ['ngRoute', 'patientControllers']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider
        .when('/Patients', {
            templateUrl: 'PatientList.html',
            controller: 'PatientListCtrl'
        })
        .when('/PatientEdit', {
            templateUrl: 'PatientEdit.html',
            controller: 'PatientEditCtrl'
        })

        // exception
        .otherwise({
            redirectTo: '/'
        });        
    }]);