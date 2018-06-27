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

for (var i = 0; i < trains.length; i++) {
    var newTrain = $("<tr><td id='name'>" + trains[i].name + "</td><td id='destination'>" + trains[i].destination +
        "</td><td id='frequency'>" + trains[i].frequency + " min</td><td id='next-arrival'>" + 0 +
        "</td><td id='min-away'>" + 0 + "</td></tr>");
    $("#table-body").append(newTrain);
}

$("#submit-train").on("click", function(e) {

    e.preventDefault();
    // alert("submit works");
});


// Need to populate train information using a loop - can't append new train row
