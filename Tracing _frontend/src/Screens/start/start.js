import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getLSItem, setLSItem } from "../../utilities/general";
import {
  StartScreenWrapper,
  StartScreenContent,
  StartScreenLeft,
  StartScreenRight,
  StartScreenParagraph,
  StartScreenLogo,
  StartScreenMan1,
  StartScreenBack,
  StartScreenMan2,
  StartScreenCall1,
  StartScreenHelp,
  StartScreenVector4,
  OutCircle,
  InnerCircle,
  IconCircle,
} from "./startStyle";

const isSmallDevice = window.matchMedia("(max-width: 550px)").matches;

// const [userType, setUserType] = useState();

function Start() {
  const navigate = useNavigate();

  const onChange = (value) => {
    // setUserType(value);
    localStorage.setItem("user_type", value);

    navigate("/login");
  };

  return (
    <StartScreenWrapper>
      {/* <StartScreenLeft> */}
      {/* <div style={{ display: "flex", position: "relative" }}>
        <div>
          <StartScreenContent>Make Calls right way</StartScreenContent>
          <StartScreenParagraph>
            AI Powered Speech-To-Speech Real Time Conversation Translation
          </StartScreenParagraph>
        </div>
        {!isSmallDevice && (
          <StartScreenMan1>
            <img src="/image/Picture1.png" style={{ width: "80%" }} />
          </StartScreenMan1>
        )}
      </div>
       */}
      {localStorage.setItem("login_status", "0")}
      <StartScreenBack>
        <img src="/image/back1.png" />
      </StartScreenBack>
      <StartScreenMan1>
        <img src="/image/Picture1.png" />
      </StartScreenMan1>
      <StartScreenMan2>
        <img src="/image/Picture2.png" />
      </StartScreenMan2>

      <div
        style={{
          display: "flex",
          position: "relative",
          margintop: "80vh",
          marginleft: "30vw",
        }}
      >
        <StartScreenCall1 onClick={() => onChange(1)}>Agent</StartScreenCall1>
        <StartScreenHelp onClick={() => onChange(2)}>Customer</StartScreenHelp>
      </div>

      {/* </StartScreenLeft>
      {/* {!isSmallDevice && (
        <div style={{ position: "relative" }}>
          <OutCircle>
            <InnerCircle>
              <div>
                <img
                  src="/image/mdi_call.png"
                  style={{
                    position: "absolute",
                    width: "80%",
                    height: "80%",
                    top: "10%",
                    left: "10%",
                  }}
                />
              </div>
            </InnerCircle>
          </OutCircle>
        </div>
      )} */}
      {/* <StartScreenRight>
        <StartScreenLogo>
          <img src="/logo2.png" style={{ width: "90%" }} />
        </StartScreenLogo>
      </StartScreenRight> */}
    </StartScreenWrapper>
  );
}

export default Start;
