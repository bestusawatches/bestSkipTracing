import React, { useEffect, useState } from "react";
import NavBar from "../../components/ChatnavBar";
import ChooseLanguageModal from "../../components/chooseLanguageModal";
import SelectFluencyModal from "../../components/selectFluency";
import { getLSItem, setLSItem } from "../../utilities/general";
import {
  SelectConfigurationBody,
  SelectConfigurationHeader,
  SelectConfigurationScreenWrapper,
} from "./indexStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  getLanguages,
  getUserLanguage,
  setSelectLanguage,
  setUserLanguage,
  getSelectLanguage,
} from "../../AppRedux/actions/user";
import { useNavigate } from "react-router-dom";

function SelectConfiguration() {
  const [languages, setLanguages] = useState();
  const [languageSelection, setLanguageSelection] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    getLanguagesBegin,
    getLanguagesSuccessData,
    getLanguagesFailureData,
    getUserLanguagesSuccessData,
    setSelectLanguageSuccessData,
  } = useSelector(({ user }) => user);

  const [currentPage, setCurrentPage] = useState("language");

  // useEffect(() => {
  //   dispatch(getLanguages());
  //   dispatch(getUserLanguage());
  // }, []);

  // useEffect(() => {
  //   if (getLanguagesSuccessData) {
  //     setLanguages(getLanguagesSuccessData?.data);
  //   }
  // }, [getLanguagesSuccessData]);

  // useEffect(() => {
  //   if (getUserLanguagesSuccessData) {
  //     if (getUserLanguagesSuccessData?.data) {
  //       setLanguages(getUserLanguagesSuccessData?.data);
  //       navigate("/chat");
  //     }
  //   }
  // }, [getUserLanguagesSuccessData]);

  // useEffect(() => {
  //   if (setSelectLanguageSuccessData) {
  //     if (setSelectLanguageSuccessData?.data) {
  //       navigate("/agent");
  //     }
  //   }
  // }, [setSelectLanguageSuccessData]);

  // const handleSelection = (type) => {
  //   // setLanguageSelection(type);
  //   // setCurrentPage("fluency");
  //   dispatch(
  //     setUserLanguage({
  //       lang_id: getLSItem("user_language"),
  //     })
  //   );
  // };

  return (
    <SelectConfigurationScreenWrapper>
      {/* <SelectConfigurationHeader>
        <NavBar />
      </SelectConfigurationHeader> */}
      <SelectConfigurationBody>
        <ChooseLanguageModal
        // setCurrentPage={setCurrentPage}
        // languages={languages}
        // handleSelection={handleSelection}
        />
        {/* {currentPage === "language" ? (
          <ChooseLanguageModal
            setCurrentPage={setCurrentPage}
            languages={languages}
            handleSelection={handleSelection}
          />
        ) : (
          <SelectFluencyModal
            setCurrentPage={setCurrentPage}
            languageSelection={languageSelection}
          />
        )} */}
      </SelectConfigurationBody>
      {/* <SelectConfigurationFooter></SelectConfigurationFooter> */}
    </SelectConfigurationScreenWrapper>
  );
}

export default SelectConfiguration;
