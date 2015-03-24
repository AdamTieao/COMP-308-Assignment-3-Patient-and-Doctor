var express = require('express'),
    app = express(),
    mongojs = require('mongojs'),
    dbDoc = mongojs('patient', ['doctor']),
    dbPat = mongojs('patient', ['patient']),
    bodyParser = require('body-parser');

var port = process.env.port || 1337;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/patientList', function (req, res) {
    console.log("I received a GET request")
    
    dbPat.patient.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.get('/doctorList', function (req, res) {
    console.log("I received a GET request")
    
    dbDoc.doctor.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.delete('/patientList/:ID', function (req, res) {
    var id = req.params.ID;
    console.log("I delete the patient" + id);
    
    dbPat.patient.remove({ ID: id }, function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});



app.listen(port);
console.log("Server running on port 1337");