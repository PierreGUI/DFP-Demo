var TAG = "DEMO";
// List available ads in the view
var banners = {
    sizes: "sizesBanner"
};

// Construct
(function(args) {
    Ti.API.info(TAG, "Construct demo page");
})(arguments[0]);

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
    if(evt && evt.error) {
        return Ti.API.error(TAG, "error receiving ad", evt);
    }
    Ti.API.info(TAG, "received ad", evt);
}
