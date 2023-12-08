import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import LanguageModal from "./components/chooseLanguageModal";
import SelectFluencyModal from "./components/selectFluency";
// import Referral from "./components/referrals";
import ReferralList from "./components/referralList";
import NavBar from "./components/ChatnavBar";
import Chat from "./Screens/chat/chat";
import Agent from "./Screens/agent/agent";
import Customer from "./Screens/customer/customer";
import Referral from "./Screens/referral/index";
import SignUpSection from "./Screens/signup/signup";
import LoginSection from "./Screens/login/Login";
import Start from "./Screens/start/start";
import Tracing from "./Screens/tracing/tracing";
import SelectConfiguration from "./Screens/selectConfiguration";
import Test from "./test.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <>
        <ToastContainer
          limit={1}
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Router>
          <Routes>
            {/* <Route path="/" element={<LoginSection />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/signup" element={<SignUpSection />} />
            <Route path="/login" element={<LoginSection />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/referrallist" element={<ReferralList />} />
            <Route path="/select" element={<SelectConfiguration />} /> */}
            {/* <Route path="/select" element={<SelectConfiguration />} />
            <Route path="/signup" element={<SignUpSection />} />
            <Route path="/login" element={<LoginSection />} />
            <Route path="/" element={<Start />} />
            <Route path="/agent" element={<Agent />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/chat" element={<Chat />} /> */}
            <Route path="/tracing" element={<Tracing />} />
            {/* <Route path="/test" element={<Test />} /> */}
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
