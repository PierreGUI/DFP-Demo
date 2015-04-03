var TAG = "INTERSTITIAL",
    DFP = require("ti.dfp"),
    interstitial = DFP.createInterstitial(),
    adUnit = "/6236286/interstitial",
    ready = false;

/** Adding interstitial ads to your project
 * The recommended lifecycle for a DFPInterstitial is to preload it
 * when the app starts, and show it at an appropriate time in your app
 * when it's ready.
 */
// Construct
(function(args) {
    Ti.API.info(TAG, "Construct interstitial page " + adUnit);
    interstitial.addEventListener('receivead', doReceiveAd);
    interstitial.addEventListener('dismiss', doCloseAd);
    interstitial.loadInterstitial(adUnit);
})(arguments[0]);

function doButtonClick(evt) {
    Ti.API.info(TAG, "Show interstitial");
    // Is my ad ready to show ?
    if(ready) {
        interstitial.showInterstitial();
        ready = false;
        $.showBtn.title = "Load intertitial";
        $.backgroundText.text = "Interstitial was shown!";
    } else {
        // Maybe already shown, start a new one
        interstitial.loadInterstitial(adUnit);
        $.backgroundText.text = "Loading...";
        $.showBtn.title = "Loading...";
    }
    $.backgroundText.color = "#000";
}

function doReceiveAd(evt) {
    Ti.API.info(TAG, "Receive interstitial", JSON.stringify(evt));
    if(evt.error) {
        $.backgroundText.text = evt.error;
        $.backgroundText.color = "red";
        ready = false;
        return;
    }
    $.backgroundText.color = "#000";
    $.backgroundText.text = "Interstitial ready to show!";
    $.showBtn.title = "Show intertitial";
    ready = true;
}

function doCloseAd(evt) {
    Ti.API.info(TAG, "Close interstitial", JSON.stringify(evt));
    $.backgroundText.text = "Interstitial was closed!";
}
