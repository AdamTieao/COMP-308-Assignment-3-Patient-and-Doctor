var express = require('express'),
    app = express(),
    mongojs = require('mongojs'),
    dbDoc = mongojs('patient', ['doctor']),
    dbPat = mongojs('patient', ['patient']),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bodyParser = require('body-parser');

var port = process.env.port || 1337;

// Patient Schema
var Patients = {    
    ID: String,
    first_name: String,
    last_name: String,
    age: Number,
    family_doctor_ID: String,
    created_at: String,
    last_modified: String
};

// Doctor Schema
var Doctors = {
    ID: String,
    first_name: String,
    last_name: String,
    password: String
};

var shmPatients = new Schema(Patients);
var shmDoctors = new Schema(Doctors);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var patients = mongoose.model("patients", shmPatients);
var doctors = mongoose.model("doctors", shmDoctors);

mongoose.connect('mongodb://localhost/patient');    // Database
var dbg = mongoose.connection;
dbg.on('error', console.error);
dbg.once('open', dataOpen); // Open database

// Get Patient List
app.get('/patientList', function (req, res) {
    console.log("I received a GET PAT request");
    
    patients.find(function (err, pats) {
        if (err) {
            console.err;
        }
        else {
            res.json(pats);
            console.log(pats);
        }      
    });
});

// Get Doctor List
app.get('/doctorList', function (req, res) {
    console.log("I received a GET request");
    
    doctors.find(function (err, docs) {
        if (err) {
            console.err;
        }
        else {
            res.json(docs);
            console.log(docs);
        }
    });    
    
});

// Delete Patient
app.delete('/patientList/:ID', function (req, res) {
    var id = req.params.ID;
    console.log("I delete the patient" + id);
    
    patients.remove({ ID: id }, function (err, pats) {
        if (err) {
            console.error;
        }
        else {
            res.json(pats);
            console.log(pats);
        }
    });
});

// Get Patient with Last Name Search
app.get('/patientName/:char', function (req, res) {
    var charPat = req.params.char;
    console.log("I get the search " + charPat);
    patients.find({ last_name: charPat }, function (err, pats) {
        if (err) {
            console.error;
        }
        else {
            res.json(pats);
            console.log(pats);
        }
    })
});

// Get Patient with ID
app.get('/patientID/:ID', function (req, res) {
    var charPat = req.params.ID;
    console.log("I get the ID " + charPat);
    patients.find({ ID: charPat }, function (err, pats) {
        if (err) {
            console.error;
        }
        else {
            res.json(pats);
            console.log(pats);
        }
    })
});

// Get Patient with Doctor ID
app.get('/patientDoc/:ID', function (req, res) {
    var charPat = req.params.ID;
    console.log("I get the search " + charPat);
    patients.find({ family_doctor_ID: charPat }, function (err, pats) {
        if (err) {
            console.error;
        }
        else {
            res.json(pats);
            console.log(pats);
        }
    })
});

// Insert into New Patient
app.post('/patientNew', function (req, res) {
    
    console.log(req.body);
    var patient = new patients(req.body);
    
    patient.save(function (err, pats) {
        if (err) {
            console.error;
        }
        else {
            res.json(pats);
            console.log(pats);
        }
    });
});

// Update the Patient
app.put('/patientEdit/:ID', function (req, res) {
    var id = req.params.ID;
    console.log(id);

    var patient = new patients(req.body);

    patients.findOneAndUpdate({ "ID": id }, req.body, function (err, pats) {
        if (err) {
            console.error;
        }
        else {
            res.json(pats);
            console.log(pats);
        }
    })
});

// Get the Patient with ID
app.get('/patientEdit/:ID', function (req, res) {
    var id = req.params.ID;
    console.log("I got the patient" + id);
    
    patients.find({ "ID": id }, function (err, pats) {
        if (err) {
            console.error;
        }
        else {
            res.json(pats);
            console.log(pats);
        }        
    });
});



app.listen(port);
console.log("Server running on port 1337");

// Check if Database is open
function dataOpen() { 
    console.log("Database Open!");
}