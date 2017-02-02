"use strict"; // E C M A S C R I P T

var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var streamInfo = [];

//onload
$(document).ready(function() {
    getChannels();
});

function getChannels(channel) {
    let apiLink = "https://wind-bow.gomix.me/twitch-api/streams/" + channel + "?callback=?"

    $.getJSON(apiLink).done(updateChannel).fail(errStream);

    function updateChannel(data) {
        var
    }

    function errStream(jqxhr, textStatus, err) {
        console.log("Weather Request Failed: " + textStatus + ", " + err);
    }
}

function updateLists() {

}

function removeItem() {

}

function addItem() {

}