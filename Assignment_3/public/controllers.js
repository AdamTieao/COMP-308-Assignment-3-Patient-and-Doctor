var patientControllers = angular.module("patientControllers", []);

patientControllers.controller('PatientListCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        console.log("Hello World from Patient List");
        
        var refresh = function () {
            $http.get('/patientList').success(function (response) {
                console.log("I got the patient list");
                $scope.patientList = response;                
            });
        }
        refresh();
        console.log("requested");
        
        $scope.removePatient = function (ID) {
            if (confirm('Delete the patient with ID of ' + ID + '?')) {
                $http.delete('/patientList/' + ID).success(function (response) {
                    refresh();
                });
            }             
        };
                
    }]);

patientControllers.controller('PatientEditCtrl', ['$scope', '$routeParams', '$http', '$location',
    function ($scope, $routeParams, $http, $location) {
        console.log("Hello World from Patient Detail");
     
        var index = $routeParams.ID;
        console.log(index);
        
        $http.get('/patientEdit/' + index).success(function (response) {
            console.log("I got the patient list");
            $scope.patient = response[0];
            console.log($scope.patient);
        });
        
        $scope.update = function () {
            $scope.patient.last_modified = Date().toString();
            
            $http.put('/patientEdit/' + index, $scope.patient).success(function (response) {
                console.log("I update the patient");
                console.log($scope.patient);
                alert("Patient Modified");
                window.location.href = "#Patients";
            });
        }

        console.log("requested");        
       
    }]);

patientControllers.controller('PatientNewCtrl', ['$scope', '$routeParams', '$http', '$location',
    function ($scope, $routeParams, $http, $location) {
        console.log("Hello World from Patient New");       
        
        $scope.saveNew = function () {
            
            $scope.patient.created_at = Date().toString();
            $scope.patient.last_modified = Date().toString();
            
            $http.post('/patientNew', $scope.patient).success(function (response) {
                console.log("I add a new patient");
                console.log($scope.patient);
                alert("New Patient Saved");
                window.location.href = "#Patients";
            });
            console.log("requested");
        }        
    }]);
