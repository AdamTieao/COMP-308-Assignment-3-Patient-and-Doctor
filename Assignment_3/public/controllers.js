var patientControllers = angular.module("patientControllers", []);

patientControllers.controller('PatientListCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        console.log("Hello World from controller");
        
        var refresh = function () {
            $http.get('/patientList').success(function (response) {
                console.log("I got the patient list");
                $scope.patientList = response;
                //$scope.patient = "";
            });
        }
        refresh();
        console.log("requested")

        $scope.removePatient = function (ID) {
            if (confirm('Delete the patient with ID of ' + ID + '?')) {
                $http.delete('/patientList/' + ID).success(function (response) {
                    refresh();
                });
            } 
            else {

            }
        };
                
    }]);