var express = require('express'),
    app = express(),
    mongojs = require('mongojs'),
    dbDoc = mongojs('patient', ['doctor']),
    dbPat = mongojs('patient', ['patient']),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bodyParser = require('body-parser');

var port = process.env.port || 1337;

var Patients = {    
    ID: String,
    first_name: String,
    last_name: String,
    age: Number,
    family_doctor_ID: String,
    created_at: String,
    last_modified: String
};

var shmPatients = new Schema(Patients);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var patients = mongoose.model("patients", shmPatients);
mongoose.connect('mongodb://localhost/patient');
var dbg = mongoose.connection;
dbg.on('error', console.error);
dbg.once('open', dataOpen);

app.get('/patientList', function (req, res) {
    console.log("I received a GET request")
    
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

app.get('/doctorList', function (req, res) {
    console.log("I received a GET request")
    
    dbDoc.doctor.find(function (err, pats) {
        console.log(pats);
        res.json(pats);
    });
});

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

function dataOpen() { 
    console.log("Database Open!");
}