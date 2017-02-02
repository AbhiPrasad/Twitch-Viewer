"use strict"; // E C M A S C R I P T

var streamList = [
    ["ESL_SC2", {}],
    ["nightblue3", {}],
    ["doublelift", {}],
    ["freecodecamp", {}]
];
var streamInfo = [];

//onload
$(document).ready(function() {
    var streamInfo = getChannels("doublelift");
});

function getChannels(channel) {
    var apiLink = "https://wind-bow.gomix.me/twitch-api/streams/" + channel + "?callback=?"
    var streamName = "";
    var status = "";
    var game = "";
    var imageLink = "";
    var previewLink = "";
    var allGood = true;

    $.getJSON(apiLink).done(updateChannel).fail(errStream);

    function updateChannel(data) {

        //if channel is not online
        let channeltext = JSON.stringify(data["stream"]);
        console.log(channeltext);

        if (isNaN(channeltext)) {
            allGood = false;
        } else {
            allGood = true;
        }

        streamName = JSON.stringify(data["stream"]["channel"]["display_name"]);
        status = JSON.stringify(data["stream"]["channel"]["status"]);
        game = JSON.stringify(data["stream"]["game"]);
        imageLink = JSON.stringify(data["stream"]["channel"]["logo"]);
        previewLink = JSON.stringify(data["stream"]["preview"]["small"]);
    }

    function errStream(jqxhr, textStatus, err) {
        console.log("Weather Request Failed: " + textStatus + ", " + err);
    }

    console.log(allGood);
    if (allGood) {
        return {
            "streamName": streamName,
            "status": status,
            "game": game,
            "imageLink": imageLink,
            "previewLink": previewLink
        }
    } else {
        return null;
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