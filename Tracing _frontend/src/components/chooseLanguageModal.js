import React, { useState, useEffect } from "react";
import {
  Button,
  Language,
  LanguageSection1,
  LanguageSection2,
  ModalFooter,
  ModalHeader,
  ModalHeading,
  ModalSelector,
  ModalSubText,
  ModalWrapper,
  RadioInput,
} from "./chooseLanguageModalStyle";
import { toast } from "react-toastify";
import useWindowSize from "../Hooks/useWindowSize";
import { setSelectLanguage } from "../AppRedux/actions/user";
import { getLSItem, setLSItem } from "../utilities/general";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ChooseLanguageModal() {
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const dispatch = useDispatch();

  const onChange = (ID) => {
    setId(ID);
    if (getLSItem("user_type") === "1") {
      setLSItem("lang_id_agent", ID);
    } else {
      setLSItem("lang_id_customer", ID);
    }

    console.log(ID);
  };

  const handleSelection = (ID) => {
    dispatch(
      setSelectLanguage({
        language: ID,
      })
    );
    console.log(ID);
  };

  const {
    setSelectLanguageBegin,
    setSelectLanguageSuccessData,
    setSelectLanguageFailureData,
  } = useSelector(({ user }) => user);

  useEffect(() => {
    if (setSelectLanguageSuccessData) {
      if (setSelectLanguageSuccessData?.success) {
        // setLanguages(setSelectLanguageSuccessData?.data);
        if (getLSItem("user_type") === "1") {
          navigate("/agent");
          setLSItem("company_model", 1);
        } else {
          navigate("/customer");
        }
      }
    }
  }, [setSelectLanguageSuccessData]);

  return (
    <ModalWrapper>
      <ModalHeading>
        <ModalHeader>
          Which language do
          {windowSize?.width <= 768 ? " " : <br />}
          you want to use?
        </ModalHeader>
        <ModalSubText>
          You can change the language anytime from the top menu
        </ModalSubText>
      </ModalHeading>
      <ModalSelector>
        <Language>
          <LanguageSection1>
            <img src="/Brand/english.png" alt="imag" />
            {/* <span>{languages ? languages[0]?.name : ""}</span> */}
          </LanguageSection1>
          <LanguageSection2>
            <RadioInput
              type="radio"
              checked={id == 1}
              onClick={() => onChange(1)}
            ></RadioInput>
          </LanguageSection2>
        </Language>
        <Language>
          <LanguageSection1>
            <img src="/Brand/hindi.png" alt="imag" />
            {/* <span>{languages ? languages[1]?.name : ""}</span> */}
          </LanguageSection1>
          <LanguageSection2>
            <RadioInput
              type="radio"
              checked={id == 2}
              onClick={() => onChange(2)}
            ></RadioInput>
          </LanguageSection2>
        </Language>
        <Language>
          <LanguageSection1>
            <img src="/Brand/mandarin.png" alt="imag" />
            {/* <span>{languages ? languages[1]?.name : ""}</span> */}
          </LanguageSection1>
          <LanguageSection2>
            <RadioInput
              type="radio"
              checked={id == 3}
              onClick={() => onChange(3)}
            ></RadioInput>
          </LanguageSection2>
        </Language>
      </ModalSelector>
      <ModalFooter>
        <Button
          onClick={() => {
            if (id != 0) handleSelection(id);
            else toast.error("Please make a selection");
          }}
        >
          Continue
        </Button>
      </ModalFooter>
    </ModalWrapper>
  );
}
