import React, { useEffect, useState } from "react";
import ConfigurationDropDown from "./configurationDropDownCustomer";
import ModelDropDown from "./modelDropDown";
import LogOutButton from "./logOutButton";
import {
  AvartarImageWrapper,
  Language,
  LanguageAction,
  LanguageActionImageWrapper,
  LanguageFlagWrapper,
  LanguageSelected,
  Logo,
  LogoText,
  NavBarWrapper,
  NavChild1,
  NavChild2,
  NavChild3,
  NavChild4,
  NavChild5,
  NavLeftSection,
  NavRightSection,
  NavigationBar,
  ModalWrapper,
  UserEmail,
  LanguageSelectedNavBar,
} from "./CallnavBarCustomerStyle";
import { ModalOuter } from "./ModalOuter";
import ConfirmationModal from "./confirmationModal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../AppRedux/actions/user";
import DrawerComponent from "./Common/Drawer/drawer";
import Referral from "./referrals";
import MobileDrawer from "./mobileDrawer";
import { useLocation } from "react-router-dom";
import { getLSItem } from "../utilities/general";
import { OutsideClickCloseContainer } from "./OutsideClickContainer";
export default function NavBar() {
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showReferralDrawer, setShowReferralDrawer] = useState(false);
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);
  const [showMobileDrawer, setMobileDrawer] = useState(false);
  const [logoutPopover, setLogoutPopover] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logoutUserBegin, logoutUserSuccessData, logoutUserFailureData } =
    useSelector(({ user }) => user);

  const fluencyMap = {
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced",
    4: "Fluent",
    5: "Native",
  };
  const toggleConfiguration = () => {
    setShowConfiguration((prevShowConfiguration) => !prevShowConfiguration);
  };

  const toggleModel = () => {
    setShowModel((prevModel) => !prevModel);
  };
  const toggleReferralDrawer = () => {
    setShowReferralDrawer(!showReferralDrawer);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawer(!showMobileDrawer);
  };

  const handleLogout = () => {
    setLogoutConfirmation(true);
    setLogoutPopover(false);
  };
  useEffect(() => {
    if (logoutUserSuccessData) {
      console.log(logoutUserSuccessData)
      console.log("logout")
      localStorage.setItem("login_status", "0");
      navigate("/");
    }
  }, [logoutUserSuccessData]);

  return (
    <NavBarWrapper>
      <NavigationBar>
        <NavLeftSection>
          <Logo onClick={() => navigate("/customer")}>
            <img style={{ width: "125px" }} src="/logo.png" />
          </Logo>
        </NavLeftSection>
        <NavRightSection>
          {!pathname.includes("/select") && (
            <NavChild1>
              <Language>
                <LanguageFlagWrapper>
                  {getLSItem("lang_id_customer") === "1" ? (
                    <img src="/Brand/english.png" alt="imag" />
                  ) : getLSItem("lang_id_customer") === "2" ? (
                    <img src="/Brand/hindi.png" alt="imag" />
                  ) : (
                    <img src="/Brand/mandarin.png" alt="imag" />
                  )}
                </LanguageFlagWrapper>
                <LanguageSelectedNavBar>
                  <span>
                    {getLSItem("lang_id_customer") === "1"
                      ? "English"
                      : getLSItem("lang_id_customer") === "2"
                        ? "Hindi"
                        : "Mandarin"}
                  </span>
                </LanguageSelectedNavBar>
                <LanguageAction>
                  <LanguageActionImageWrapper onClick={toggleConfiguration}>
                    <img src="/Icons/downArrow.svg" alt="downArrow" />
                  </LanguageActionImageWrapper>
                </LanguageAction>
              </Language>
            </NavChild1>
          )}
          {/* <NavChild2 onClick={toggleModel}>
            <img src="/Icons/setting.png" alt="contacts plus" />
          </NavChild2> */}
          <NavChild2 onClick={toggleReferralDrawer}>
            <img src="/Icons/bell.png" alt="contacts plus" />
          </NavChild2>

          {/* <NavChild3>
            <img src="/Icons/setting.png" alt="message" />
            <Link target={"_blank"} to="FormLink">
            </Link>
          </NavChild3> */}
          <NavChild4>
            <div onClick={() => setLogoutPopover(!logoutPopover)}>
              {/* <UserEmail>{JSON.parse(getLSItem("user_data"))?.email}</UserEmail> */}
              <AvartarImageWrapper>
                <img src="/Icons/Ellipse 1.png" alt="Image Description" />
              </AvartarImageWrapper>
            </div>
          </NavChild4>
          {/* <NavChild5 onClick={toggleMobileDrawer} handleLogout={handleLogout}>
            <div onClick={() => setLogoutPopover(!logoutPopover)}>
              <AvartarImageWrapper>
                <img
                  height={20}
                  width={20}
                  src="/Icons/hamburger.png"
                  alt="HamBurger"
                />
              </AvartarImageWrapper>
            </div>
          </NavChild5> */}
        </NavRightSection>
      </NavigationBar>

      <ModalWrapper>
        <OutsideClickCloseContainer setState={setShowConfiguration}>
          {showConfiguration && <ConfigurationDropDown />}
        </OutsideClickCloseContainer>

        <OutsideClickCloseContainer setState={setShowModel}>
          {showModel && <ModelDropDown />}
        </OutsideClickCloseContainer>

        {logoutPopover && (
          <LogOutButton
            handleLogout={handleLogout}
            setLogoutPopover={setLogoutPopover}
          />
        )}
      </ModalWrapper>

      <OutsideClickCloseContainer setState={setLogoutConfirmation}>
        {logoutConfirmation && (
          <ModalOuter
            state={logoutConfirmation}
            setState={setLogoutConfirmation}
          >
            <ConfirmationModal
              setState={setLogoutConfirmation}
              yesClick={() => dispatch(logoutUser())}
            />
          </ModalOuter>
        )}
      </OutsideClickCloseContainer>
      {/* <DrawerComponent anchor={"right"} triggerDrawer={showReferralDrawer}>
        <div>
          <Referral onClose={() => setShowReferralDrawer(false)} />
        </div>
      </DrawerComponent>
      <DrawerComponent anchor={"right"} triggerDrawer={showMobileDrawer}>
        <div>
          <MobileDrawer
            onClose={() => setMobileDrawer(false)}
            toggleConfiguration={toggleConfiguration}
            handleLogout={handleLogout}
          />
        </div>
      </DrawerComponent> */}
    </NavBarWrapper>
  );
}
