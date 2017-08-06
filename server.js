var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var News = require("./models/News.js");
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));
mongoose.connect("mongodb://heroku_nxlnjpth:g97du67pdnjfbauk74cmpu4cd7@ds117913.mlab.com:17913/heroku_nxlnjpth");
var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});


app.get("/api/saved", function(req, res) {
    News.find({})
        .exec(function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.json(doc);
            }
        });
});


app.post("/api/saved", function(req, res) {
    console.log("req.body.data");
    var dataTosave = new News(req.body.data);
    dataTosave.save(function(err) {
        if (err) return handleError(err);
        console.log("Saved!!");
    });

});

app.delete("/api/saved/:head", function(req, res) {
    var newsTodelete = req.params;
    console.log(req.params.head);
    News.remove({ head: newsTodelete.head }, function(err) {
        if (err) return handleError(err);
        console.log("// removed!!!");
    });
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});