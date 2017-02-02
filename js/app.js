"use strict"; // E C M A S C R I P T

var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var streamInfo = [];

//onload
$(document).ready(function() {
    var status = getChannels("nightblue3");
});

function getChannels(channel) {
    var apiLink = "https://wind-bow.gomix.me/twitch-api/streams/" + channel + "?callback=?"
    var game = "";
    var imageLink = "";
    var streamName = "";
    var status = "";

    $.getJSON(apiLink).done(updateChannel).fail(errStream);

    function updateChannel(data) {

        let channeltext = JSON.stringify(data["stream"]["game"]).replace(/"/g, "");
        console.log(channeltext);
        $('#testingpanel').html("<h3>" + channeltext + "</h3>");

        // game = JSON.stringify(data["stream"]["game"]).replace()
    }

    function errStream(jqxhr, textStatus, err) {
        console.log("Weather Request Failed: " + textStatus + ", " + err);
    }
}

function updateLists() {

}

function populatePanels() {

}

function removeItem() {

}

function addItem() {

}