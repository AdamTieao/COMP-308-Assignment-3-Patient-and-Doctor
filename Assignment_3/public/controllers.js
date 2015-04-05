var patientControllers = angular.module("patientControllers", []);

angular.module('patientControllers').filter('pagination', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    };
});

var changePat;
var changeDoc;

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
        
        // pagination
        $scope.curPage = 0;
        $scope.pageSize = 10;
        
        $scope.onSample = function () {
            samplefactoryService.myServicefunction($scope.patient , function (data) {
                $scope.patientList = data;// response from service
            }, function (data) {
                //error
            });
        };        

        $scope.numberOfPages = function () {
            return Math.ceil($scope.patientList.length / $scope.pageSize);
        };
                
    }]);

patientControllers.controller('PatientSearchCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        console.log("Hello World from Patient List");
        
        //window.location.href = "#/PatientSearch/search";

        var refresh = function () {
            if (changePat != null) {
                var char = changePat;
                $http.get('/patientName/' + char).success(function (response) {
                    $scope.patientList = response;
                    console.log($scope.patientList);
                });
            }
            if (changeDoc != null) {
                var ID = changeDoc;
                $http.get('/patientDoc/' + ID).success(function (response) {
                    $scope.patientList = response;
                    console.log($scope.patientList);
                });
            }
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

        // pagination
        $scope.curPage = 0;
        $scope.pageSize = 10;
        
        $scope.onSample = function () {
            samplefactoryService.myServicefunction($scope.patient , function (data) {
                $scope.patientList = data;// response from service
            }, function (data) {
                //error
            });
        };
        
        $scope.numberOfPages = function () {
            return Math.ceil($scope.patientList.length / $scope.pageSize);
        };
                
    }]);

patientControllers.controller('PatientChangeCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        console.log("Hello World from Patient List");
        
        //window.location.href = "#/PatientSearch/search";        
        
        $scope.searchPat = function (search){
            if (search != null) {
                changePat = search;
                changeDoc = null;
                window.location.href = "#/PatientSearch/" + changePat;
            }
        }
        console.log("requested");
        
        $scope.searchDoc = function (ID) {
            if (ID != null) {
                changeDoc = ID;
                changePat = null;
                window.location.href = "#/PatientSearch/" + changeDoc;
            }
        }
        
        $scope.removePatient = function (ID) {
            if (confirm('Delete the patient with ID of ' + ID + '?')) {
                $http.delete('/patientList/' + ID).success(function (response) {
                    refresh();
                });
            }
        };
        $http.get('/doctorList').success(function (response) {
            console.log("I got the doctor list");
            $scope.doctorList = response;
        });
                
    }]);

patientControllers.controller('PatientEditCtrl', ['$scope', '$routeParams', '$http', '$location',
    function ($scope, $routeParams, $http, $location) {
        console.log("Hello World from Patient Detail");
        
        // validation
        $scope.fn = /([A-Z]{1}[a-z]*)\w+/;
        $scope.ln = /([A-Z]{1}[a-z]*)\w+/;
        $scope.age = /^\d+$/;

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
            
            var fName = $scope.patient.first_name,
                lName = $scope.patient.last_name,
                age = $scope.patient.age;

            if (fName != null && 
                lName != null && 
                age != null) {
                $scope.patient.last_modified = Date().toString();
                
                $http.put('/patientEdit/' + index, $scope.patient).success(function (response) {
                    console.log("I update the patient");
                    console.log($scope.patient);
                    alert("Patient Modified");
                    window.location.href = "#Patients";
                });
            }
            else {
                alert("Not Valid!");
            }
        }

        console.log("requested");        
       
    }]);

patientControllers.controller('PatientNewCtrl', ['$scope', '$routeParams', '$http', '$location',
    function ($scope, $routeParams, $http, $location) {
        console.log("Hello World from Patient New");
        
        // validation
        $scope.id = /^\d+$/;
        $scope.fn = /([A-Z]{1}[a-z]*)\w+/;
        $scope.ln = /([A-Z]{1}[a-z]*)\w+/;
        $scope.age = /^\d+$/;

        $http.get('/doctorList').success(function (response) {
            console.log("I got the doctor list");
            $scope.doctorList = response;
        });     
        var patientWithID = [];            
        $scope.saveNew = function () {
            
            //var patNew = {
            //    "ID": $scope.patient.ID, "first_name": $scope.patient.first_name,
            //    "last_name": $scope.patient.last_name, "age": $scope.patient.age,
            //    "family_doctor_ID": $scope.patient.family_doctor_ID
            //};
            var ID = $scope.patient.ID,
                fName = $scope.patient.first_name,
                lName = $scope.patient.last_name,
                age = $scope.patient.age,
                docID = $scope.patient.family_doctor_ID;
            
            //if (patNew.ID != null && patNew.first_Name != null && patNew.last_Name != null && patNew.age != null && patNew.family_doctor_ID != null) {
            if (ID != null && 
                fName != null && 
                lName != null && 
                age != null && 
                docID != null) {
                $http.get('/patientID/' + ID).success(function (response) {
                    console.log("I got the doctor list");
                    patientWithID = response;
                    console.log(patientWithID.length);
                    
                    
                    if (patientWithID.length == 0) {
                        $scope.patient.created_at = Date().toString();
                        $scope.patient.last_modified = Date().toString();
                        
                        $http.post('/patientNew', $scope.patient).success(function (response) {
                            console.log("I add a new patient");
                            console.log($scope.patient);
                            alert("New Patient Saved");
                            window.location.href = "#Patients";
                        });
                        console.log(patientWithID.length + "==1");
                    }
                    else {
                        console.log(patientWithID.length + "!=1");
                        alert("ID already exists!");
                    }
                    console.log("requested");
                });
            }
            else {
                alert("Not Valid!");
            }
        }        
    }]);
