"use strict"; // E C M A S C R I P T

//hardcoded streamlist
//2d array with name of stream and stream properties
var streamList = [
    ["ESL_SC2", {}],
    ["nightblue3", {}],
    ["doublelift", {}],
    ["freecodecamp", {}]
];

//onload
$(document).ready(function() {
    var streamInfo = getChannels("nightblue3");
    console.log(streamInfo);
});

//gets dem channels J S O N 
function getChannels(channel) {
    //api links used
    var channelApiLink = "https://wind-bow.gomix.me/twitch-api/channels/" + channel + "?callback=?"
    var streamApiLink = "https://wind-bow.gomix.me/twitch-api/streams/" + channel + "?callback=?"

    // return variables
    var streamName = "";
    var message = "";
    var game = "";
    var imageLink = "";
    var online = true;
    var returnObject = {};

    // flag for return state (online, offline or DNE)
    var allGood = true;

    $.getJSON(streamApiLink).done(updateStream).fail(errStream); //JSON request

    // if JSON request goes through
    function updateStream(data) {

        let streamText = JSON.stringify(data["stream"]);
        //check if channel exists and is online.
        if (isNaN(streamText)) { //if channel is offline or DNE

            $.getJSON(channelApiLink).done(updateChannel).fail(errChannel); //JSON request

            function updateChannel(channeldat) {
                let channelText = JSON.stringify(channeldat["status"]);

                if ($.isNumeric(channelText)) { //if DNE
                    return null;
                } else { //if offline
                    allGood = true;

                    return returnObject = {
                        "streamName": JSON.stringify(channeldat["display_name"]),
                        "message": JSON.stringify(channeldat["status"]),
                        "game": JSON.stringify(channeldat["game"]),
                        "imageLink": JSON.stringify(channeldat["logo"]),
                        "online": false
                    }

                }
            }

            function errChannel(jqxhr, textStatus, err) {
                console.log("Channel Request Failed: " + textStatus + ", " + err);
            }

        } else { //if channel is online
            allGood = true;

            return returnObject = {
                "streamName": JSON.stringify(data["stream"]["channel"]["display_name"]),
                "message": JSON.stringify(data["stream"]["channel"]["status"]),
                "game": JSON.stringify(data["stream"]["game"]),
                "imageLink": JSON.stringify(data["stream"]["channel"]["logo"]),
                "online": true
            }
        }
        /*
                // returns value according to if channel data was received or not
                if (allGood) {
                    return returnObject;
                } else {
                    return null;
                }
                */
    }

    //if JSON request does not go through
    function errStream(jqxhr, textStatus, err) {
        console.log("Stream Request Failed: " + textStatus + ", " + err);
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