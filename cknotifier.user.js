// ==UserScript==
// @name CK Notifier
// @author Starwater
// @namespace http://henrylai.me
// @version 0.1
// @description Notifies on low priced CKs
// @match https://www.cryptokitties.co/marketplace/sale?orderBy=current_price&orderDirection=asc&search=gen%3A0&sorting=cheap
// @copyright 2017
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


(function loop() {
    $( ".KittyStatus-note" ).each(function( index ) {
        var text = $(this).text();
        // Price found
        if(text.indexOf('.') !== -1) {
            console.log( index + ": " + text );
            // convert string to float
            var price = parseFloat(text.substring(2));
            console.log( "float is: " + price);
            if (price < 2.7) {
                alert("Found kitty price of: " + price);
            }
        }
    });
    setTimeout(loop,5000);
})();