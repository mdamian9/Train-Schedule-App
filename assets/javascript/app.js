var trains = [
    {
        name: "Polar Express",
        destination: "The North Pole",
        firstTime: "00:00",
        frequency: 5
    },
    {
        name: "Cool Caravan",
        destination: "Neverland",
        firstTime: "12:00",
        frequency: 10
    },
    {
        name: "Scary Express",
        destination: "Zombieland",
        firstTime: "03:33",
        frequency: 3
    }
];

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA-vmRxEA6HAVtFMjpz6c9q3sj6t6YcwDo",
    authDomain: "train-schedule-data.firebaseapp.com",
    databaseURL: "https://train-schedule-data.firebaseio.com",
    projectId: "train-schedule-data",
    storageBucket: "train-schedule-data.appspot.com",
    messagingSenderId: "937700658251"
};
firebase.initializeApp(config);

var database = firebase.database();

for (var i = 0; i < trains.length; i++) {
    var nextArrival = 0;
    var minAway = 0;
    var newTrain = $("<tr><td id='name'>" + trains[i].name + "</td><td id='destination'>" + trains[i].destination +
        "</td><td id='frequency'>" + trains[i].frequency + " min</td><td id='next-arrival'>" + nextArrival +
        "</td><td id='min-away'>" + minAway + "</td></tr>");
    $("#table-body").append(newTrain);
};

// Submit train event
$("#submit-train").on("click", function (e) {

    e.preventDefault();

    // Save our input values for further usage
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#first-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");

    database.ref().push({
        train_name: name,
        train_destination: destination,
        first_time: firstTime,
        train_frequency: frequency
    });

});

database.ref().on("child_added", function (snap) {

    var name = snap.val().train_name;
    var destination = snap.val().train_destination;
    var firstTime = snap.val().first_time;
    var frequency = snap.val().train_frequency;

    var currentTime = (moment().format('MMMM Do YYYY, h:mm:ss a'));

var nextArrival = 0;
var minAway = 0;

// Appends train that was submitted
var newTrain = $("<tr><td id='name'>" + name + "</td><td id='destination'>" + destination + "</td><td id='frequency'>" +
    frequency + " min</td><td id='next-arrival'>" + nextArrival + "</td><td id='min-away'>" + minAway + "</td></tr>");
$("#table-body").append(newTrain);

});

console.log(moment().format('h:mm:ss a'));
var hour = moment().format('h a');
console.log(hour);

// store data in database
// get data from database

