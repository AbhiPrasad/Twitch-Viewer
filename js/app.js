"use strict"; // E C M A S C R I P T

var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var streamInfo = [];

//onload
$(document).ready(function() {
    getChannels("doublelift");
});

function getChannels(channel) {
    let apiLink = "https://wind-bow.gomix.me/twitch-api/streams/" + channel + "?callback=?"
    let game = "";

    $.getJSON(apiLink).done(updateChannel).fail(errStream);

    function updateChannel(data) {
        let channeltext = JSON.stringify(data["stream"]["game"]).replace(/"/g, "");
        console.log(channeltext);
        $('#testingpanel').html("<h3>" + channeltext + "</h3>");
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