var TAG = "INTERSTITIAL",
    DFP = require("ti.dfp"),
    interstitial = null,
    adUnit = "/3834/penton_testapp",
    currentState = null;

// states
var States = {
    "LOAD": {
        text: "Loading...",
        button: "Loading..."
    },
    "READY": {
        text: "Interstitial ready to show!",
        button: "Show interstitial"
    },
    "SHOWN": {
        text: "Interstitial was shown!",
        button: "Load interstitial"
    },
    "CLOSE": {
        text: "Interstitial was closed!",
        button: "Load interstitial"
    },
    "ERROR": {
        text: "Error receiving interstitial",
        button: "Reload interstitial"
    }
};

/** Adding interstitial ads to your project
 * The recommended lifecycle for a DFPInterstitial is to preload it
 * when the app starts, and show it at an appropriate time in your app
 * when it's ready.
 */
// Construct
(function(args) {
    // check if google play services are available
    if (OS_ANDROID && DFP.isGooglePlayServicesAvailable() != DFP.SUCCESS) {
        alert("Google Play Services is not installed/updated/available");
        // return;
    }

    Ti.API.info(TAG, "Construct interstitial page " + adUnit);
    interstitial = DFP.createInterstitial();
    interstitial.addEventListener('receivead', doReceiveAd);
    interstitial.addEventListener('dismiss', doCloseAd);

    interstitial.loadInterstitial(adUnit);
})(arguments[0]);

// Update UI with predefined texts depending on given state
function updateState(state) {
    currentState = state;
    $.showBtn.title = state.button;
    $.backgroundText.text = state.text;
}

function doButtonClick(evt) {
    Ti.API.info(TAG, "Interstitial ("+ (interstitial.isReady()?"":"not ") +"ready)");
    Ti.API.info(TAG, interstitial.isReady());
    // Is my ad ready to show ?
    if(currentState === States.READY) {
        interstitial.showInterstitial();
        updateState(States.SHOWN);
    } else {
        // Maybe already shown, start a new one
        // Will be attached to the current activity
        interstitial.loadInterstitial(adUnit);
        updateState(States.LOAD);
    }
    $.backgroundText.color = "#000";
}

function doReceiveAd(evt) {
    Ti.API.info(TAG, "Receive interstitial", JSON.stringify(evt));
    if(evt.error) {
        updateState(States.ERROR);
        $.backgroundText.text =  $.backgroundText.text + "\n" + evt.error;
        $.backgroundText.color = "red";
        return;
    }
    $.backgroundText.color = "#000";
    updateState(States.READY);
}

function doCloseAd(evt) {
    Ti.API.info(TAG, "Close interstitial", JSON.stringify(evt));
    updateState(States.CLOSE);
}



/**
 * Load and open Interstitial in a new Window
 * Proof of concept, sorry for the quick & dirty code
 */
function doNewWinClick() {
    var interWin = Ti.UI.createWindow(),
        closeButton = Ti.UI.createButton({ title: "close" });
    // Will be executed after main window initialized
    interWin.addEventListener("open", function(evt) {
        var activity = evt.source.getActivity();
        Ti.API.info(TAG, evt.source, JSON.stringify(activity));
        // Will be attached to the specified activity
        interstitial.loadInterstitial(adUnit, activity);
        // Wait until ready TODO
        _.delay(function() { interstitial.showInterstitial(); }, 1000);
    });
    // Close button
    closeButton.addEventListener("click", function() {
        interWin.close();
    });
    interWin.add(closeButton);
    interWin.open();
}
