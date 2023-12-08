import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import CustomizedSlider from "./Common/Table/customSlider";
import { setSelectModel } from "../AppRedux/actions/user";
import { getLSItem, setLSItem } from "../utilities/general";
import { useDispatch, useSelector } from "react-redux";
import { setFluencyLevels, setUserLanguage } from "../AppRedux/actions/user";

const DropDownWrapper = styled.div`
  height: 12rem;
  width: 25rem;
  display: flex;
  background: #fffeff;
  box-shadow: 0px 12px 36px #efe0f5;
  border-radius: 27px 27px 27px 0px;
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
  margin-left: 24rem;
  position: absolute;
  top: 0.1rem;
  right: 7.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const Row1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 1 33%;
  padding: 0 1.6rem;
`;

export const Row2 = styled.div`
  // display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 1 33%;
  box-sizing: border-box;
  padding: 0 1.58rem;
  padding-top: 2.3rem;
}
`;

const Row3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 1 33%;
  box-sizing: border-box;
  padding: 0 1rem;
  padding-bottom: 1.6rem;
`;

export const ModalSlider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex: 0 0 30%;
`;

export const Language = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  justify-content: space-between;
  &:nth-child(1) {
    padding: 0 0rem;
  }
  &:nth-child(2) {
    margin-top: 2rem;
    padding-bottom: 26px;
  }
`;

export const LanguageSection1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1.4rem;

  img {
    width: 30px;
    height: 30px;
  }

  span {
    font-family: "Manrope";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 164.52%;
    letter-spacing: -0.01em;
    color: #1f0929;
  }
`;
export const LanguageSection2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const RadioContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const RadioInput = styled.input`
  /* Hide the default radio button */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  /* Create the custom radio button */
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-radius: 50%;
  outline: none;
  transition: border-color 0.2s;

  /* Define styles for the checked state */
  &:checked {
    border-color: #2ecc71;
    background-color: #2ecc71;
  }

  /* Define hover styles */
  &:hover {
    border-color: #3498db;
  }
`;

export const RadioLabel = styled.label`
  margin-left: 8px;
`;

export default function ModelDropDown() {
  const [model, setmodel] = useState(0);
  const [fluency, setFluency] = useState(0);

  const dispatch = useDispatch();
  const { setFluencyLevelsSuccessData } = useSelector(({ user }) => user);

  useEffect(() => {
    if (getLSItem("company_model")) {
      setmodel(getLSItem("company_model"));
    }
  }, [getLSItem("company_model")]);

  const onChange = (Model) => {
    setmodel(Model);
    localStorage.setItem("company_model", Model);
    dispatch(
      setSelectModel({
        model: Model,
      })
    );
  };

  return (
    <DropDownWrapper>
      <Row1>
        <Language>
          <LanguageSection1>
            <img src="/Brand/google.png" alt="imag" />
            <span>Google</span>
          </LanguageSection1>
          <LanguageSection2>
            <RadioInput
              type="radio"
              checked={model == 1}
              onClick={() => onChange(1)}
            ></RadioInput>
          </LanguageSection2>
        </Language>
      </Row1>
      <Row1>
        <Language>
          <LanguageSection1>
            <img src="/Brand/microsoft.png" alt="imag" />
            <span>Microsoft</span>
          </LanguageSection1>
          <LanguageSection2>
            <RadioInput
              type="radio"
              checked={model == 2}
              onClick={() => onChange(2)}
            ></RadioInput>
          </LanguageSection2>
        </Language>
      </Row1>
      <Row1>
        <Language>
          <LanguageSection1>
            <img src="/Brand/fish42.png" alt="imag" />
            <span>Fish42</span>
          </LanguageSection1>
          <LanguageSection2>
            <RadioInput
              type="radio"
              checked={model == 3}
              onClick={() => onChange(3)}
            ></RadioInput>
          </LanguageSection2>
        </Language>
      </Row1>
      {/* <Row2>
        <ModalSlider>
          <Box sx={{ width: 400 }}>
            <CustomizedSlider
              source={"NavBar"}
              setFluency={setFluency}
              val={fluency}
            />
          </Box>
        </ModalSlider>
      </Row2> */}
    </DropDownWrapper>
  );
}
