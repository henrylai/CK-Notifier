// ==UserScript==
// @name CK Notifier
// @author Starwater
// @namespace http://henrylai.me
// @version 0.1
// @description Notifies on low priced CKs
// @match https://www.cryptokitties.co/*
// @copyright 2017
// @require http://code.jquery.com/jquery-latest.js
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==
$(document).ready(function() {
    var threshold = GM_getValue("threshold");
    var status = GM_getValue("status") ? true : false;
    $("#app").prepend("Set alert threshold value: <input id=\"threshold-value\" value=\"" + threshold +"\"\>" +
                      "<button style=\"border:1px solid black\" type=\"button\" class=\"status\">" + (status ? "Stop": "Start") + "<\/button>");

    $('#threshold-value').on('input', function() {
        var threshold = $("#threshold-value").val();
        GM_setValue("threshold", threshold);
    });

    $( ".status" ).click(function(e) {
        status = !status;
        GM_setValue("status", status);
        $(this).text((status ? "Stop": "Start"));
        if(status) {
           loop();
        }
    });

    (function loop() {
        if(status === true) {
            $( ".KittyStatus-note" ).each(function( index ) {
                var text = $(this).text();
                // Price found
                if(text.indexOf('.') !== -1) {
                    // convert string to float
                    var price = parseFloat(text.substring(2));
                    if (price < threshold) {
                        status = false;
                        GM_setValue("status", status);
                        $(this).click();
                        mySound = new Audio('https://www.soundjay.com/button/beep-07.mp3');
                        mySound.play();
                        return false;
                    }
                }
            });
            if (status === true) {
                setTimeout(loop,5000);
                setTimeout(function() {
                    location.reload();
                }, 10000);
            }
        }
    })();
});


