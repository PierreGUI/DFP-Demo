var TAG = "DEMO";
// List available ads in the view
var banners = {
    default: "defaultBanner",
    sizes: "sizesBanner",
    smart: "smartBanner"
};

// Construct
(function(args) {
    Ti.API.info(TAG, "Construct ads page");
    $.version.text += Ti.App.version;
    resetButton();
})(arguments[0]);

//  Handle button events
function doButtonClick() {
    $.refreshBtn.setTitle("Requesting...");
    $.refreshBtn.setEnabled(false);
    requestAd();
}
function resetButton() {
    $.refreshBtn.setTitle("Manual refresh");
    $.refreshBtn.setEnabled(true);
}

// Handle ad events
function requestAd() {
    _.each(banners, function(banner, name) {
        if($[banner]) {
            Ti.API.info(TAG, "requesting ad for " + name);
            $[banner].requestAd();
        }
    });
}
function doReceiveAd(evt) {
    resetButton();
    if(evt && evt.error) {
        return Ti.API.error(TAG, "error receiving ad", evt);
    }
    Ti.API.info(TAG, "received ad", evt.width, evt.height);
    // Ok this is kind of a hack, but works better than expected:
    // TODO try: evt.source.setCurrentSize(...);
    evt.source.setWidth(evt.width);
    evt.source.setHeight(evt.height);
}
