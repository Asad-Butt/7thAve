import { audioBridgeCallbacks } from "./pluginCallbacks";

export default (audioBridge, res, rej, dispatch) => ({
  server: audioBridge.server,
  success: () => {
    // Attach to AudioBridge plugin
    audioBridge.janus.attach(audioBridgeCallbacks(audioBridge, res, rej));
  },
  error: function (error) {
    console.warn(error);
  },
  ondisconnect: function (initAudioBridge) {
    audioBridge.dispatch
      ? audioBridge.dispatch({ type: "audio/reInit", payload: { initAudioBridge } })
      : dispatch({ type: "audio/reInit", payload: { initAudioBridge } });
    console.warn(audioBridge.dispatch);
    console.warn(dispatch);
  },
  destroyed: function () {
    console.log("Snap! destroyed...");
    // window.location.reload();
  },
});
