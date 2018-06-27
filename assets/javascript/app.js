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

// database.ref().set({
//     trains: trains
// });

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

    console.log("works");

    e.preventDefault();

    // Save our input values for further usage
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#first-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var nextArrival = 0;
    var minAway = 0;

    var newTrain = $("<tr><td id='name'>" + name + "</td><td id='destination'>" + destination + "</td><td id='frequency'>" + frequency +
        " min</td><td id='next-arrival'>" + nextArrival + "</td><td id='min-away'>" + minAway + "</td></tr>");
    $("#table-body").append(newTrain);

});

