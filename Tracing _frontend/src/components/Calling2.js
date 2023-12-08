import React, { useEffect, useState, useRef } from "react";
import { StartScreenCall } from "./Calling2Style";
export default function Calling2(props) {
  return (
    <div>
      <StartScreenCall
        style={{
          display: "flex",
          position: "absolute",
          top: "110px",
          right: "38%",
          zIndex: "999",
        }}
      >
        <img
          style={{
            width: "25%",
            hegith: "25%",
            top: "5%",
            left: "5%",
            border: "2px solid var(--primary, #0a6a7c)",
          }}
          src="/Icons/Ellipse 2.png"
          alt="Image Description"
        />
        <img
          style={{
            width: "35px",
            hegith: "35px",
            right: "5%",
            bottom: "5%",
            border: "2px solid var(--primary, #f6eff9)",
          }}
          src="/Icons/cancel_call.png"
          alt="Image Description"
          onClick={props.open}
        />
        <p style={{ position: "absolute", left: "35%" }}>
          Jennifer Dave
          <hr />
          Calling...
        </p>
      </StartScreenCall>
    </div>
  );
}
