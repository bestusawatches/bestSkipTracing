import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import CustomizedSlider from "./Common/Table/customSlider";
import { getLSItem, setLSItem } from "../utilities/general";
import { useDispatch, useSelector } from "react-redux";
import { setFluencyLevels, setUserLanguage } from "../AppRedux/actions/user";

const DropDownWrapper = styled.div`
  height: 10rem;
  width: 20rem;
  display: flex;
  background: #fffeff;
  box-shadow: 0px 12px 36px #efe0f5;
  border-radius: 27px 27px 27px 0px;
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
  margin-left: 24rem;
  border-radius: 20px;
  border: 1px solid var(--primary, #88699e);
  position: absolute;
  top: 0.1rem;
  right: 5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const LanguageSection = styled.div`
  display: flex;
  // width: 100%;
  // height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1.4rem;

  div {
    font-family: Poppins-Regular;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
  }

  img {
    width: 50px;
    height: 50px;
  }
`;

export default function BellDropDown(props) {
  const [bell, setbell] = useState(0);
  const [fluency, setFluency] = useState(0);

  const dispatch = useDispatch();
  const { setFluencyLevelsSuccessData } = useSelector(({ user }) => user);

  useEffect(() => {
    if (getLSItem("bell_result")) {
      setbell(getLSItem("bell_result"));
    }
  }, [getLSItem("bell_result")]);

  const onChange = (value) => {
    setbell(value);
    setLSItem("bell_result", value);
  };

  return (
    <DropDownWrapper>
      <LanguageSection>
        <div>
          New Call Request
          <hr />
          {props.customer}
        </div>
        <img
          src="/Icons/accept.png"
          alt="imag"
          style={{ position: "absolute", bottom: "10px", left: "40px" }}
          onClick={() => {
            props.accept();
          }}
        />
        <img
          src="/Icons/reject.png"
          alt="imag"
          style={{
            // marginLeft: "auto",
            // marginTop: "auto",
            position: "absolute",
            bottom: "10px",
            right: "40px",
          }}
          onClick={() => {
            props.reject();
          }}
        />
      </LanguageSection>
    </DropDownWrapper>
  );
}
