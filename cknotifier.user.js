// ==UserScript==
// @name CK Notifier
// @author Starwater
// @namespace http://henrylai.me
// @version 0.1
// @description Notifies on low priced CKs
// @match https://www.cryptokitties.co/marketplace/sale*
// @copyright 2017
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
$(document).ready(function() {
    $("#app").prepend("Set alert threshold value: <input id=\"threshold-value\">");
});

(function loop() {
    $( ".KittyStatus-note" ).each(function( index ) {
        var threshold = $("#threshold-value").val();
        var text = $(this).text();
        // Price found
        if(text.indexOf('.') !== -1) {
            // convert string to float
            var price = parseFloat(text.substring(2));
            if (price < threshold) {
				$(this).click();
                alert("Found kitty price of: " + price);
                return false;
            } else {
				setTimeout(loop,5000);
			}
			
        }
    });
})();