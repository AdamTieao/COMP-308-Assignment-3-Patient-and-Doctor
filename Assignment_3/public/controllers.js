var patientControllers = angular.module("patientControllers", []);
var change;

patientControllers.controller('PatientListCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        console.log("Hello World from Patient List");
        var d = new Date();
        console.log(d.getDate() + "/" + Number(d.getMonth() + 1) + "/" + d.getFullYear());
        
        var refresh = function () {
            $http.get('/patientList').success(function (response) {
                console.log("I got the patient list");
                $scope.patientList = response;
            });
            $http.get('/doctorList').success(function (response) {
                console.log("I got the doctor list");
                $scope.doctorList = response;
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

patientControllers.controller('PatientSearchCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        console.log("Hello World from Patient List");
        
        //window.location.href = "#/PatientSearch/search";

        var refresh = function () {
            var char = change;
            $http.get('/patientList/' + char).success(function (response) {
                $scope.patientList = response;
                console.log($scope.patientList);
            })
            $http.get('/doctorList').success(function (response) {
                console.log("I got the doctor list");
                $scope.doctorList = response;
            });
            console.log("click");
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

patientControllers.controller('PatientChangeCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        console.log("Hello World from Patient List");
        
        //window.location.href = "#/PatientSearch/search";        
        
        $scope.searchPat = function (search){
            change = search;
            window.location.href = "#/PatientSearch/" + change;
        }
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
        
        $http.get('/doctorList').success(function (response) {
            console.log("I got the doctor list");
            $scope.doctorList = response;
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

        $http.get('/doctorList').success(function (response) {
            console.log("I got the doctor list");
            $scope.doctorList = response;
        });     
        
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
