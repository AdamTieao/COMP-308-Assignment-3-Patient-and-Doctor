var app = angular.module("myApp", ['ngRoute', 'patientControllers']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider
        .when('/Patients', {
            templateUrl: 'patientList.html',
            controller: 'PatientListCtrl'
        })
        .when('/PatientEdit/:ID', {
            templateUrl: 'patientEdit.html',
            controller: 'PatientEditCtrl'
        })
        .when('/PatientSearch/:char', {
            templateUrl: 'patientSearch.html',
            controller: 'PatientSearchCtrl'
        })
        /*
        .when('/PatientVisits/:ID', {
            templateUrl: 'patientVisits.html',
            controller: 'PatientVisitsCtrl'
        })
        */
        .when('/PatientNew', {
            templateUrl: 'patientNew.html',
            controller: 'PatientNewCtrl'
        })
        // exception
        .otherwise({
            redirectTo: '/'
        });        
    }]);