import React, { useEffect, useState, useRef } from "react";
import { StartScreenCall } from "./Calling1Style";
import { getLSItem, setLSItem } from "../utilities/general";
export default function Calling1(props) {
  return (
    <div>
      <StartScreenCall style={{ top: "100px", left: "1%", zIndex: "999" }}>
        <img
          src="/Icons/calling.png"
          alt="Image Description"
          style={
            props.openState
              ? { position: "absolute", right: "1%" }
              : props.request === "accepted" || props.request === "agent_new_audio_sent"
                ? { position: "absolute", right: "1%" }
                : { position: "absolute", left: "1%" }
          }
          onClick={() => {
            props.open();
          }}
        />
        {!props.openState
          ? props.request === "accepted" || props.request === "agent_new_audio_sent"
            ? "Accepted"
            : props.request === "no_agent"
              ? "No agent"
              : props.request === "rejected"
                ? "Rejected"
                : props.request === "disconnected"
                  ? "Disconnected"
                  : "Click to Call"
          : ""}
      </StartScreenCall>
    </div>
  );
}
