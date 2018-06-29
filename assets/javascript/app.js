// Array of our own trains to display in schedule
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
    },
    {
        name: "Alan Rails Express",
        destination: "Ghost Train Land",
        firstTime: "03:00",
        frequency: 13
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

// Reference to our database
var database = firebase.database();

// For every train in trains array, run the following loop:
for (var i = 0; i < trains.length; i++) {

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trains[i].firstTime, "HH:mm").subtract(1, "years");

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % trains[i].frequency;

    // Minute Until Train
    var tMinutesTillTrain = trains[i].frequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    // Appends train from trains array with data from array and time conversions
    var newTrain = $("<tr><td id='name'>" + trains[i].name + "</td><td id='destination'>" + trains[i].destination +
        "</td><td id='frequency'>" + trains[i].frequency + " min</td><td id='next-arrival'>" + moment(nextTrain).format("hh:mm a") +
        "</td><td id='min-away'>" + tMinutesTillTrain + "</td></tr>");
    $("#table-body").append(newTrain);
};

// Submit train event - when submit button is clicked, execute the following function:
$("#submit-train").on("click", function (e) {

    e.preventDefault();

    // Save our input values for further usage
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#first-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // Clear form inputs
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");

    // Checks if one or more fields were left blank, alerts user to complete form
    if (name === "" || destination === "" || firstTime === "" || frequency === "") {
        alert("One or more fields were left blank");
    } else {
        // If there's full valid input, push new child with train data into database
        database.ref().push({
            train_name: name,
            train_destination: destination,
            first_time: firstTime,
            train_frequency: frequency
        });
    };

});

// Every time we add a child to our database, execute following function with snapshot parameter passed
database.ref().on("child_added", function (snap) {

    // Take train data from snapshot, store in variables
    var name = snap.val().train_name;
    var destination = snap.val().train_destination;
    var firstTime = snap.val().first_time;
    var frequency = snap.val().train_frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    // Appends new train that was submitted with data from database and time conversions
    var newTrain = $("<tr><td id='name'>" + name + "</td><td id='destination'>" + destination + "</td><td id='frequency'>" +
        frequency + " min</td><td id='next-arrival'>" + moment(nextTrain).format("hh:mm a") + "</td><td id='min-away'>" + tMinutesTillTrain + "</td></tr>");
    $("#table-body").append(newTrain);

});

