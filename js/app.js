"use strict"; // E C M A S C R I P T

//hardcoded streamlist
//2d array with name of stream and stream properties
var streamList = {
    "ESL_SC2": {},
    "nightblue3": {},
    "doublelift": {},
    "freecodecamp": {},
    "imaqtpie": {},
    "arumba07": {}
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
    let message = streamList[prop]["message"];
    let game = streamList[prop]["game"];
    let imageLink = streamList[prop]["imageLink"];
    let online = streamList[prop]["online"];
    let color = "";
    let datasrt = '0';

    if (online) {
        color = "green";
        datasrt = '1';
    } else {
        color = "red";
        datasrt = '2';
    }

    //insert in housing panels
    $('<div/>', {
        class: "panel-body ",
        id: streamName,
        html: "<h4>" + streamName + "</h4>",
        style: "color:" + color,
        "data-sort": datasrt
    }).insertAfter('#pan-head');

    $('<div/>', {
        class: "game",
        id: prop + "game",
        html: "<h4>" + game + "</h4>"
    }).appendTo('#' + streamName);

    $('<div/>', {
        class: "message",
        id: prop + "message",
        html: "<h4>" + message + "</h4>"
    }).insertAfter('#' + prop + "game");

    $('<div/>', {
        class: "imageLink",
        id: prop + "imageLink",
        html: "<h4>" + imageLink + "</h4>"
    }).insertAfter('#' + prop + "message");

    //sorts div to show online first - based off of http://stackoverflow.com/questions/17017148/ordering-divs-based-on-class-name-using-javascript-jquery
    /* $('div').sort(function(a, b) {
         var contentA = parseInt($(a).attr('data-sort'));
         var contentB = parseInt($(b).attr('data-sort'));
         return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
     }) */

    $('#' + streamName).sortDivs();
}

function removeItem() {

}

function addItem() {

}

jQuery.fn.sortDivs = function sortDivs() {
    $("> div", this[0]).sort(dec_sort).appendTo(this[0]);

    function dec_sort(a, b) {
        return ($(b).data("sort")) < ($(a).data("sort")) ? 1 : -1;
    }
}