var TAG = "INTERSTITIAL";

/** Adding interstitial ads to your project
 * The recommended lifecycle for a DFPInterstitial is to preload it
 * when the app starts, and show it at an appropriate time in your app
 * when it's ready.
 */
// Construct
(function(args) {
    Ti.API.info(TAG, "Construct interstitial page");
})(arguments[0]);

function doButtonClick(evt) {
    Ti.API.info(TAG, "Show interstitial");
    $.interBanner.showInterstitial();
    $.backgroundText.text = "See logs for more info...";
    $.backgroundText.color = "#000";
}

function doReceiveAd(evt) {
    Ti.API.info(TAG, "Receive interstitial", JSON.stringify(evt));
    if(evt.error) {
        $.backgroundText.text = evt.error;
        $.backgroundText.color = "red";
    }
}
