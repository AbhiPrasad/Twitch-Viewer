"use strict"; // E C M A S C R I P T

//hardcoded streamlist
//2d array with name of stream and stream properties
var streamList = {
    "ESL_SC2": {},
    "nightblue3": {},
    "doublelift": {},
    "freecodecamp": {},
    "imaqtpie": {},
};

//onload
$(document).ready(function() {
    updateLists();
});

//gets dem channels J S O N 
function getChannels(channel) {
    //api links used
    var channelApiLink = "https://wind-bow.gomix.me/twitch-api/channels/" + channel;
    var streamApiLink = "https://wind-bow.gomix.me/twitch-api/streams/" + channel;

    // return variables
    var streamName = "";
    var message = "";
    var game = "";
    var imageLink = "";
    var online = true;
    var returnObject = {};

    $.getJSON(streamApiLink).done(updateStream).fail(errStream); //JSON request

    // if JSON request goes through
    function updateStream(data) {
        var streamText = JSON.stringify(data["stream"]);

        //check if channel exists and is online.
        if (streamText === "null") { //if channel is offline or DNE
            $.getJSON(channelApiLink).done(updateChannel).fail(errChannel); //JSON request

            function updateChannel(channeldat) {
                var channelText = JSON.stringify(channeldat["status"]);
                if ($.isNumeric(channelText)) { //if DNE
                    returnObject = {
                        "streamName": null,
                        "message": null,
                        "game": null,
                        "imageLink": null,
                        "online": false
                    };
                } else { //if offline
                    returnObject = {
                        "streamName": JSON.stringify(channeldat["display_name"]).replace(/"/g, ""),
                        "message": JSON.stringify(channeldat["status"]).replace(/"/g, ""),
                        "game": JSON.stringify(channeldat["game"]).replace(/"/g, ""),
                        "imageLink": JSON.stringify(channeldat["logo"]).replace(/"/g, ""),
                        "online": false
                    }
                }
                console.log(returnObject);
                addToStreamList(channel, returnObject);
                populatePanels(channel);
            }

            function errChannel(jqxhr, textStatus, err) {
                console.log("Channel Request Failed: " + textStatus + ", " + err);
            }

        } else { //if channel is online
            returnObject = {
                "streamName": JSON.stringify(data["stream"]["channel"]["display_name"]).replace(/"/g, ""),
                "message": JSON.stringify(data["stream"]["channel"]["status"]).replace(/"/g, ""),
                "game": JSON.stringify(data["stream"]["game"]).replace(/"/g, ""),
                "imageLink": JSON.stringify(data["stream"]["channel"]["logo"]).replace(/"/g, ""),
                "online": true
            }
            console.log(returnObject);
            addToStreamList(channel, returnObject);
            populatePanels(channel);
        }
    }

    //if JSON request does not go through
    function errStream(jqxhr, textStatus, err) {
        console.log("Stream Request Failed: " + textStatus + ", " + err);
    }

}

//adds streaminfo to streamlist
function addToStreamList(channel, returnObject) {
    streamList[channel] = returnObject;
}

//pull stream data for each thing in streamlist
function updateLists() {
    for (var prop in streamList) {
        getChannels(prop);
    }
}

function populatePanels(prop) {
    let streamName = streamList[prop]["streamName"];
    console.log(streamName);
}

function removeItem() {

}

function addItem() {

}