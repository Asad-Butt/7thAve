import Janus from "../../janus.mobile";
// import { store } from "../../../../../App";
import { Alert } from "react-native";

export function consentDialog(on) {
  Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
  if (on) {
  } // Darken screen and show hint
  else; // Restore screen
}
export function iceState(state) {
  Janus.log("ICE state changed to " + state);
}
export function mediaState(medium, on) {
  Janus.log(
    "Janus " + (on ? "started" : "stopped") + " receiving our " + medium
  );
}
export function webrtcState(on) {
  Janus.log(
    "Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now"
  );
}
// export function ondata (){};
// export function ondataopen (){};
// export function onslowLink (){};
export function onlocalstream(stream) {
  // We're not going to attach the local audio stream
  Janus.debug(" ::: Got a local stream :::");
  console.log(
    "======================================================================"
  );
  console.log("local stream".stream);
  console.log(
    "======================================================================"
  );
}
export function onremotestream(stream) {
  console.log(
    "======================================================================"
  );
  console.log("remote stream", stream);
  console.log(
    "======================================================================"
  );
  // Janus.attachMediaStream($("#roomaudio").get(0), stream);
  // // Mute button
  // jan.audio = true;
}
export function oncleanup() {
  Janus.webrtcUp = false;
  this.webrtcUp = false;
}

export function pluginSuccess(pluginHandle) {
  const sessionID = pluginHandle.session.getSessionId();
  const pluginID = pluginHandle.getId();
  // this.socket.emit("ab_session", { sessionID, pluginID, opaqueID: this.opaqueID });
  this.handler = pluginHandle;
  console.log(
    "======================================================================"
  );
  console.log(pluginID, sessionID);
  console.log(
    "======================================================================"
  );
  // uiFunctions.pluginSuccess(this, pluginID);
}

export function onmessage(msg, jsep) {
  let event = msg["audiobridge"];
  console.log(
    "================================================================================"
  );
  console.log(event, msg);
  console.log(
    "================================================================================"
  );
  if (event) {
    if (event === "joined") {
      // Successfully joined, negotiate WebRTC now
      if(msg["participants"].length === 0){
        // this.socket.emit('destroy', msg["room"])
        setTimeout(()=>emitLocalEvent.bind(this)('check-hanging'), 1000);
      }
      if (msg["id"]) {
        this.id = msg["id"];
        // this.socket.emit("room-user-id", { id: msg["id"], roomID: msg["room"] });
        Janus.log(
          "Successfully joined room " + msg["room"] + " with ID " + this.id
        );
        if (!this.webrtcUp) {
          this.webrtcUp = true;
          // Publish our stream
          this.handler.createOffer({
            media: { video: false }, // This is an audio only room
            success: (jsep) => {
              Janus.debug("Got SDP!", jsep);
              let publish = { request: "configure" };
              this.handler.send({ message: publish, jsep: jsep });
            },
            error: (error) => {
              Janus.error("WebRTC error:", error);
            },
          });
        }
      }
      // Any room participant?
      if (msg["participants"]) {
        if (msg.participants[0]) {
          emitLocalEvent.bind(this)("room-user-id", {
            roomUserID: msg.participants[0].id,
            username: msg.participants[0].display,
          });
        }
      }
    } else if (event === "roomchanged") {
      // The user switched to a different room
      this.id = msg["id"];
      Janus.log("Moved to room " + msg["room"] + ", new ID: " + this.id);
      // Any room participant?
    } else if (event === "destroyed") {
      // this.janus.destroy();
      // store.dispatch({ type: "audio/reInit", payload: {} });
      emitLocalEvent.bind(this)("current-destroyed");
      Janus.warn("The room has been destroyed!");
    } else if (event === "talking") {
      emitLocalEvent.bind(this)("talking", msg["id"]);
    } else if (event === "stopped-talking") {
      emitLocalEvent.bind(this)("stopped-talking", msg["id"]);
    } else if (event === "destroyed") {
      // The room has been destroyed
      Janus.warn("The room has been destroyed!");
    } else if (event === "event") {
      if (msg["participants"]) {
        console.log(msg["participants"]);
      } else if (msg["error"]) {
        console.log(msg["error"]);
      }
      // Any new feed to attach to?
      if (msg["leaving"]) {
        // One of the participants has gone away?
        let leaving = msg["leaving"];
        console.log("leaving");
      }
      if (msg["error_code"] === 485){
        let errorMsg = msg["error"].split("(")[1];
        let room = parseInt(errorMsg.substr(0, errorMsg.length-1));
        this.socket.emit('destroy', room)
      }
    }
  }
  if (jsep) {
    Janus.debug("Handling SDP as well...", jsep);
    this.handler.handleRemoteJsep({ jsep: jsep });
  }
}

export function audioBridgeCallbacks(audioBridge, res, rej){
  return{
    plugin: "janus.plugin.audiobridge",
    opaqueID: audioBridge.opaqueID,
    consentDialog: consentDialog.bind(audioBridge),
    iceState: iceState.bind(audioBridge),
    mediaState: mediaState.bind(audioBridge),
    webrtcState: webrtcState.bind(audioBridge),
    onlocalstream: onlocalstream.bind(audioBridge),
    onremotestream: onremotestream.bind(audioBridge),
    oncleanup: oncleanup.bind(audioBridge),
    onmessage: onmessage.bind(audioBridge),
    error: function (error) {
      console.warn("  -- Error attaching plugin...", error);
      rej(error);
    },
    success: (pluginHandle) => {
      audioBridge.handler = pluginHandle;
      res(true);
      console.log("======================================================================");
      console.log(pluginHandle.getId(), pluginHandle.session.getSessionId());
      console.log("======================================================================");
    },
  }
}

function emitLocalEvent(event /*, arg1, arg2, etc.*/) {
  if (this.socket._callbacks) {
    var args = [].slice.call(arguments, 1),
      callbacks = this.socket._callbacks["$" + event];
    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i)
        callbacks[i].apply(this.socket, args);
    }
  }
}
