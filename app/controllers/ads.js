var TAG = "DEMO",
    DFP = require("ti.dfp");

// List ads to be created
var banners = {
    default: null,
    smart: null,
    sizes: null
};

// Construct
(function(args) {
    Ti.API.info(TAG, "Construct ads page");
    $.version.text += Ti.App.version;
    resetButton();

    // Enable debug
    DFP.debug = true;

    // Instantiate DFP views
    banners.default = DFP.createView({
        top: 20,
        width: 320,
        height: 50,
        adWidth: 320,
        adHeight: 50,
        adUnitId: "/6236286/defaultBanner",
        location: {
            latitude: 52.3702157,
            longitude: 4.89516789,
            accuracy: 10
        }
    });

    banners.smart = DFP.createView({
        top: 20,
        width: Ti.UI.FILL,
        height: 50,
        adHeight: 50,
        extras: {
            key: 'value'
        },
        testDevices: [
            "8DC9DB6D6C9B1C0C7D29BF69155FC0AB",
            // "testDeviceID"
        ]
    });

    banners.sizes = DFP.createView({
        top: 20,
        width: Ti.UI.FILL,
        height: 250,
        adUnitId: "/6236286/sizesBanner",
        adSizes: [
            {width: 320, height: 50},
            {width: 320, height: 100},
            {width: 300, height: 100},
            {width: 300, height: 250}
        ]
    });

    // Add event listeners
    banners.default.addEventListener("receivead", doReceiveAd);
    banners.smart.addEventListener("receivead", doReceiveAd);
    banners.sizes.addEventListener("receivead", doReceiveAd);

    // Add ads to view
    $.defaultAd.add(banners.default);
    $.smartAd.add(banners.smart);
    $.sizesAd.add(banners.sizes);
})(arguments[0]);

//  Handle button events
function doButtonClick() {
    // Simulate later unit ID change
    banners.smart.adUnitId = "/6236286/smartBanner";

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
        if(banner) {
            Ti.API.info(TAG, "requesting ad for " + name);
            banner.requestAd();
        }
    });
}
function doReceiveAd(evt) {
    resetButton();
    // If it failed, event object contains an attribute 'error'
    if(evt && evt.error) {
        return Ti.API.error(TAG, "error receiving ad", evt);
    }
    Ti.API.info(TAG, "received ad", evt.width, evt.height);
}

/*** ABOUT SIZING on iOS
 ** DYNAMIC: vertical/horizontal layout
 * use evt.source.setHeight(evt.height)
 * Example in penton.js
 *
 ** STATIC
 * specify view size (height: 50) to match adSize (adWidth, ...)
 * Warning: Ti.UI.SIZE doesn't work (spent 2 days on it)
 */
