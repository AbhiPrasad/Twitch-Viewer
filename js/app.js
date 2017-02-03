"use strict"; // E C M A S C R I P T

//hardcoded streamlist
//2d array with name of stream and stream properties
var streamList = {
    "ESL_SC2": {},
    "nightblue3": {},
    "doublelift": {},
    "imaqtpie": {},
    "arumba07": {}
};

//onload
$(document).ready(function() {
    updateLists();

    $('#addStreamer').click(function() {
        var streamer = $('.form-control').val();
        $('#addStreamer').prop("disabled", true);
        checkExist(streamer);
    });
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

    //insert in housing panels
    if (online) {
        $('<div/>', {
            class: "panel-body emptyme",
            id: prop + "pn1"
        }).insertAfter('#pan-head-online');

        $('<div/>', {
            class: "row wrapper",
            id: prop + "row1"
        }).appendTo("#" + prop + "pn1");

        $('<a/>', {
            class: "imageLink col-md-2",
            id: prop + "imageLink",
            href: "https://www.twitch.tv/" + streamName,
            target: "_blank"
        }).appendTo('#' + prop + "row1");

        $('<img/>', {
            class: "profileImage center-block",
            src: imageLink,
            alt: prop + "Profile Image"
        }).appendTo('#' + prop + "imageLink");

        $('<div/>', {
            class: "streamName col-md-1 center-block",
            id: streamName,
            html: "<h4>" + streamName + "</h4>"
        }).insertAfter('#' + prop + "imageLink");

        $('<div/>', {
            class: "message col-md-6 col-md-offset-3 center-block",
            id: prop + "message",
            html: "<h4>" + message + "</h4>"
        }).insertAfter('#' + streamName);

        $('<div/>', {
            class: "game center-text col-md-2 col-md-offset-2 center-block",
            id: prop + "game",
            html: "<h4>" + game + "</h4>"
        }).insertAfter('#' + prop + "message");

        $('<a/>', {
            href: "#",
            //onclick: removeItem(this),
            class: prop + " btn btn-danger btn-click col-md-2 btn-circle center-block text-center",
            id: prop + "remove",
            html: '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>',
            "data-toggle": "modal",
            "data-target": "#myModal",
            "data-id": prop
        }).insertAfter('#' + prop + "game");
    } else {
        $('<div/>', {
            class: "panel-body emptyme",
            id: prop + "pn1"
        }).insertAfter('#pan-head-offline');

        $('<div/>', {
            class: "row wrapper",
            id: prop + "row1"
        }).appendTo("#" + prop + "pn1");

        $('<a/>', {
            class: "imageLink col-md-2",
            id: prop + "imageLink",
            href: "https://www.twitch.tv/" + streamName,
            target: "_blank"
        }).appendTo('#' + prop + "row1");

        $('<img/>', {
            class: "profileImage center-block",
            src: imageLink,
            alt: prop + "Profile Image"
        }).appendTo('#' + prop + "imageLink");

        $('<div/>', {
            class: "streamName col-md-1 center-block",
            id: streamName,
            html: "<h4>" + streamName + "</h4>"
        }).insertAfter('#' + prop + "imageLink");

        $('<div/>', {
            class: "message col-md-6 col-md-offset-3 center-block",
            id: prop + "message",
            html: "<h4>" + message + "</h4>"
        }).insertAfter('#' + streamName);

        $('<div/>', {
            class: "game center-text col-md-2 col-md-offset-2 center-block",
            id: prop + "game",
            html: "<h4>" + game + "</h4>"
        }).insertAfter('#' + prop + "message");

        $('<a/>', {
            href: "#",
            //onclick: removeItem(this),
            class: prop + " btn btn-danger btn-click col-md-2 btn-circle center-block text-center",
            id: prop + "remove",
            html: '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>',
            "data-toggle": "modal",
            "data-target": "#myModal",
            "data-id": prop
        }).insertAfter('#' + prop + "game");
    }
    RefreshEventListener();
}

function RefreshEventListener() {
    $('.wrapper').on('click', '.btn-click', function() {
        var property = $(this).attr("data-id");

        refreshModalListener(property);
    });
}

function refreshModalListener(property) {
    $('#myModal').on('click', '#modalDelete', function() {
        $('#' + property + 'pn1').remove();
    });
}

function checkExist(channel) {
    var apiLink = "https://wind-bow.gomix.me/twitch-api/channels/" + channel;

    $.getJSON(apiLink).done(update).fail(err); //JSON request

    function update(json) {
        var text = JSON.stringify(json["status"]);

        if ($.isNumeric(text)) { //if null
            alert("DNE!");
        } else if (streamList.hasOwnProperty(channel)) {
            alert("already in list!");
        } else {
            alert("Added " + channel)
            streamList[channel] = {};
            clearLists();
            updateLists();
        }
    }

    function err(jqxhr, textStatus, err) {
        console.log("Stream Request Failed: " + textStatus + ", " + err);
    }

    $('.form-control').val("");
    $('#addStreamer').prop("disabled", false);
}

function clearLists() {
    $('.emptyme').empty();
    $('.emptyme').remove();
}