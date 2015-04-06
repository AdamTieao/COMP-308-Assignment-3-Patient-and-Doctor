var patientControllers = angular.module("patientControllers", []);

// pagination
angular.module('patientControllers').filter('pagination', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    };
});

// global variables
var changePat;
var changeDoc;

// Patient List Controller
patientControllers.controller('PatientListCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        console.log("Hello World from Patient List");
        
        // Get the date of today using format dd/mm/yyyy
        var d = new Date();
        console.log(d.getDate() + "/" + Number(d.getMonth() + 1) + "/" + d.getFullYear());
        
        // Function to show the list
        var refresh = function () {
            $http.get('/patientList').success(function (response) {
                console.log("I got the patient list");
                $scope.patientList = response;  // Get the patient list
            });
            $http.get('/doctorList').success(function (response) {
                console.log("I got the doctor list");
                $scope.doctorList = response;   // Get the doctor list
            });
        }
        
        // Call the function
        refresh();
        console.log("requested");
        
        // Remove the patient
        $scope.removePatient = function (ID) {
            if (confirm('Delete the patient with ID of ' + ID + '?')) {
                $http.delete('/patientList/' + ID).success(function (response) {
                    refresh();  // Get the patient list again
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
        
        // Calculate the number of pages
        $scope.numberOfPages = function () {
            return Math.ceil($scope.patientList.length / $scope.pageSize);
        };
                
    }]);

// Patient Search Controller
patientControllers.controller('PatientSearchCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        console.log("Hello World from Patient List");        
        
        // Function to show the list
        var refresh = function () {
            if (changePat != null) {    // Inputbox should be filled
                var char = changePat;
                $http.get('/patientName/' + char).success(function (response) {
                    $scope.patientList = response;
                    console.log($scope.patientList);
                });
            }
            if (changeDoc != null) {    // Combobox should not be empty
                var ID = changeDoc;
                $http.get('/patientDoc/' + ID).success(function (response) {
                    $scope.patientList = response;
                    console.log($scope.patientList);
                });
            }
            
            // Get the doctor list
            $http.get('/doctorList').success(function (response) {
                console.log("I got the doctor list");
                $scope.doctorList = response;
            });
            console.log("click");
        }
        
        refresh();
        console.log("requested");                
        
        // Remove the patient
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

// Patient Search by Changing Key word
patientControllers.controller('PatientChangeCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        console.log("Hello World from Patient List");
        
        // Seach by Patient Last Name
        $scope.searchPat = function (search){
            if (search != null) {
                changePat = search;
                changeDoc = null;
                window.location.href = "#/PatientSearch/" + changePat;
            }
        }
        console.log("requested");
        
        // Search by Doctor Name
        $scope.searchDoc = function (ID) {
            if (ID != null) {
                changeDoc = ID;
                changePat = null;
                window.location.href = "#/PatientSearch/" + changeDoc;
            }
        }
        
        // Remove Patient
        $scope.removePatient = function (ID) {
            if (confirm('Delete the patient with ID of ' + ID + '?')) {
                $http.delete('/patientList/' + ID).success(function (response) {
                    refresh();
                });
            }
        };
        
        // Get the doctor list
        $http.get('/doctorList').success(function (response) {
            console.log("I got the doctor list");
            $scope.doctorList = response;
        });
                
    }]);

// Patient Edit List
patientControllers.controller('PatientEditCtrl', ['$scope', '$routeParams', '$http', '$location',
    function ($scope, $routeParams, $http, $location) {
        console.log("Hello World from Patient Detail");
        
        // validation
        $scope.fn = /([A-Z]{1}[a-z]*)\w+/;
        $scope.ln = /([A-Z]{1}[a-z]*)\w+/;
        $scope.age = /^\d+$/;

        var index = $routeParams.ID;
        console.log(index);        
        
        // Get the patient selected
        $http.get('/patientEdit/' + index).success(function (response) {
            console.log("I got the patient list");
            $scope.patient = response[0];
            console.log($scope.patient);
        });
        
        // Get the doctor list
        $http.get('/doctorList').success(function (response) {
            console.log("I got the doctor list");
            $scope.doctorList = response;
        });

        $scope.update = function () {
            
            var fName = $scope.patient.first_name,
                lName = $scope.patient.last_name,
                age = $scope.patient.age;
            
            
            // Check validation
            if (fName != null && 
                lName != null && 
                age != null) {
                $scope.patient.last_modified = Date().toString();
                
                // Update the record
                $http.put('/patientEdit/' + index, $scope.patient).success(function (response) {
                    console.log("I update the patient");
                    console.log($scope.patient);
                    alert("Patient Modified");
                    window.location.href = "#Patients";
                });
            }
            else {
                // Not Valid!
                alert("Not Valid!");
            }
        }

        console.log("requested");        
       
    }]);

// Patient New Controller
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
            
            var ID = $scope.patient.ID,
                fName = $scope.patient.first_name,
                lName = $scope.patient.last_name,
                age = $scope.patient.age,
                docID = $scope.patient.family_doctor_ID;
            
            // Check Validation
            if (ID != null && 
                fName != null && 
                lName != null && 
                age != null && 
                docID != null) {
                $http.get('/patientID/' + ID).success(function (response) {
                    console.log("I got the doctor list");
                    patientWithID = response;
                    console.log(patientWithID.length);
                    
                    
                    if (patientWithID.length == 0) {    // Check if ID already exists
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
