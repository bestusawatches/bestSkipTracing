import React, { useEffect, useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import NavBar from "../../components/CallnavBarCustomer";
import { useNavigate } from "react-router-dom";
import Calling1 from "../../components/Calling1";
import Calling2 from "../../components/Calling2";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import usePlayAudio from "../../Hooks/usePlayAudio";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import useWindowSize from "../../Hooks/useWindowSize";
import {
  CallBody,
  CallFooter,
  CallHeader,
  CallScreenWrapper,
  CallScreenLeft,
  CallScreenRight,
  Predifinedtitle,
  Predifinedcontent,
  MessagePanel,
  EnterMessage,
  SectionTwo,
  SectionOne,
  ImageIcon,
  ImageIcon_Cancel,
  LeftSection,
  ImageChatBackground,
  RightSection,
  MessageWrapper,
  BotMessage,
  BotMessageMethod,
  MessageActionsBot,
  UserMessage,
  UserMessageWrapper,
  CustomOverlay,
  TranslatrionWrapper,
  BotMessageTranslation,
  MessageActionsBotTranslation,
  UserMessageTranslation,
  UserMessageTranslationBottom,
  LineBreakDiv,
  TimeStamp,
  TimeStampWhite,
  AudioHiddenContainer,
  AutoPlayWrapper,
  MuteText,
  DesktopTimeStamp,
  MobileTimeStamp,
  BotMessageTyping,
} from "./customerStyle";
import {
  getMessageList,
  sendMessage,
  translateMessage,
  getAudioLink,
  requestNewCall,
  getSelectModel,
} from "../../AppRedux/actions/user";
import {
  getLSItem,
  setLSItem,
  handleSpeak,
  handleTranslate1,
  handleTranslate2,
  handleRephraze,
} from "../../utilities/general";
import { width } from "@mui/system";
function Customer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isReset, setIsReset] = useState(0);
  const [messageList, setMessageList] = useState([]);
  const [loadingFirst, setLoadingFirst] = useState(0);
  const [chatStart, setChatStart] = useState("");
  const [isLoading, setLoader] = useState(false);
  const [showRecordAnimation, setShowRecordAnimation] = useState(false);
  const mimeType = "audio/mpeg";
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const mediaRecorder = useRef(null);
  const translationRef = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("none");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [translationIndex, setTranslationIndex] = useState(null);
  const [translatedAuto, setTranslatedAuto] = useState("");
  const [transcriptLang, setTranscriptLang] = useState(null);
  const [translatedText, setTranslatedText] = useState(null);
  const [translatedAudio, setTranslatedAudio] = useState("");
  const [translationLoader, setTranslationLoader] = useState(false);
  const [rephrazedAuto, setRephrazedAuto] = useState("");
  const [audioContent, setAudioContent] = useState(null);
  const [audioLoader, setAudioLoader] = useState(false);
  const [translationHeight, setTranslationHeight] = useState(0);
  const [audioPlayIndex, setAudioPlayIndex] = useState(null);

  const [audioSignedUrl, setAudioSignedUrl] = useState(null);
  const [autoPlayMute, setAutoPlayMute] = useState(getLSItem("mute"));
  const [isLineBreakMessage, setLineBreakMessage] = useState(false);
  const audioRef = useRef();
  const voiceRef = useRef();
  const windowSize = useWindowSize();
  // let audioLink = null

  const [opened, setOpened] = useState(false);

  const {
    sendMessageBegin,
    sendMessageSuccessData,
    sendMessageFailureData,
    getMessageListBegin,
    getMessageListSuccessData,
    getMessageListFailureData,
    getTranslatedSuccessData,
    getTranslatedFailureData,
    getAudiolinkSuccessData,
    getAudiolinkFailureData,
    getSelectModelSuccessData,
  } = useSelector(({ user }) => user);

  const [input, setInput] = useState("");
  const isSmallDevice = window.matchMedia("(max-width: 800px)").matches;

  let formData = new FormData();
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const isEnter = (event) => {
    if (event.key === "Enter") {
      setTimeout(() => {
        scrollToBottom();
      }, 200);
      formData.append("message", input);
      formData.append("user_type", getLSItem("user_type"));
      formData.append("receiver", agent);
      formData.append("language", getLSItem("lang_id_customer"));
      formData.append("is_reset", isReset);
      setLoader(true);
      console.log("loadingFirst:", loadingFirst);
      setLoadingFirst(loadingFirst + 1);
      console.log("loadingFirst:", loadingFirst);
      dispatch(sendMessage(formData));
    }
  };


  const [isBrowserSupport, setIsBrowserSupport] = useState(true);
  const [dataAudio, setDataAudio] = useState("");
  // const [preDataAudio, setPreDataAudio] = useState("");
  let preDataAudio = "";
  const [newDataAudio, setNewDataAudio] = useState("");
  const [newTranslatedAuto, setNewTranslatedAuto] = useState("");

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();


  usePlayAudio();
  useEffect(() => {
    // dispatch(getMessageList());
    // setMessageList([
    //   {
    //     type: 2,
    //     context_id: 1,
    //     message: [
    //       "सुप्रभात। मैं विक्स ग्राहक सहायता टीम से मिशेला हूं। कॉलबैक अनुरोध के संबंध में आप तक पहुंच रहा हूं। आज आप कैसे हैं?",
    //       "Good Morning.This is Michaela from Wix Customer Support team. Reaching you with regard to the Callback request. How are you doing today?",
    //       "Good Morning.This is Michaela from Wix Customer Support team. Reaching you with regard to the Callback request. How are you doing today?",
    //     ],
    //     created_date: "2023-08-24",
    //     language: 1,
    //   },
    //   {
    //     type: 1,
    //     context_id: 1,
    //     message: "Hi! I am good. How about you?",
    //     created_date: "2023-08-24",
    //     language: 1,
    //   },
    // ]);
    getMicrophonePermission();
    if (getLSItem("login_status") === "0") {
      navigate("/");
    } else if (getLSItem("login_status") === "1") {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (getMessageListSuccessData) {
      console.log("setmessagelist");

      setMessageList(getMessageListSuccessData?.data[0]?.data);

      setTimeout(() => {
        scrollToBottom();
      }, 2000);
    }
  }, [getMessageListSuccessData]);

  useEffect(() => {
    setAudioLoader(false);
    setTranslatedAudio(null);
    setTranslatedAuto("");
    setRephrazedAuto("");
    if (chatStart === "started") {
      setLoadingFirst(loadingFirst + 2);
    }
  }, [messageList]);

  useEffect(() => {
    if (sendMessageSuccessData) {
      if (sendMessageSuccessData?.msg && !autoPlayMute && !isLineBreakMessage) {
        playFunc(sendMessageSuccessData?.msg, getLSItem("lang_id_customer"));
      }
      console.log("sendmessagesuccess");
      setLineBreakMessage(false);
      setLoader(false);
      setInput("");
      websckt.send(
        JSON.stringify({
          name: JSON.parse(getLSItem("user_data"))?.email,
          receiver: agent,
          request: "customer_new_message_sent",
          user: getLSItem("user_type"),
        })
      );
      dispatch(getMessageList());
      setTimeout(() => {
        inputRef?.current?.focus();
        scrollToBottom();
      }, 2000);
    }
  }, [sendMessageSuccessData]);

  useEffect(() => {
    if (sendMessageFailureData) {
      setLoader(false);
    }
  }, [sendMessageFailureData]);

  useEffect(() => {
    if (getTranslatedSuccessData && getTranslatedSuccessData.translated_text) {
      setTranslatedText(getTranslatedSuccessData.translated_text);
      setTranslationLoader(false);
    }
  }, [getTranslatedSuccessData]);

  useEffect(() => {
    if (getTranslatedFailureData) {
      setTranslationLoader(false);
    }
  }, [getTranslatedFailureData]);

  useEffect(() => {
    if (getAudiolinkSuccessData) {
      setAudioSignedUrl(getAudiolinkSuccessData?.url);
      setAudioLoader(false);
    }
  }, [getAudiolinkSuccessData]);

  useEffect(() => {
    if (getAudiolinkFailureData) {
      setAudioSignedUrl(null);
      setAudioLoader(false);
    }
  }, [getAudiolinkFailureData]);

  useEffect(() => {
    if (audioContent) {
      audioContent.play();
      setAudioContent(null);
    }
  }, [audioContent]);

  useEffect(() => {
    if (getSelectModelSuccessData) {
      if (getSelectModelSuccessData?.data) {
        setLSItem(
          "company_model",
          getSelectModelSuccessData?.data?.model
        );
        console.log(getSelectModelSuccessData?.data?.model);
      }
    }
  }, [getSelectModelSuccessData]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const sendVoiceMessageData = (aBlob) => {
    if (aBlob) {
      let formData = new FormData();
      formData.append("language", getLSItem("lang_id_customer"));
      formData.append("file", aBlob, "recorded.mp3");
      setLoader(true);
      setTimeout(() => {
        scrollToBottom();
      }, 200);
      dispatch(sendMessage(formData));
      setTimeout(() => {
        setLoader(false);
      }, 5000);
    }
  };
  const onTranslate = async (msg, lang, idx) => {
    setTranslationLoader(true);
    setTranslationIndex(idx);
    let formData = {
      language: getLSItem("lang_id_customer"),
      message: msg,
    };

    dispatch(translateMessage(formData));
    // setTranslationLoader(false)
    // if(response && response?.translatedText){
    //   setTranslatedText(response?.translatedText);
    // }
  };

  const translate_button = (msg, lang, idx) => {
    setTranslationIndex(idx);
    setTranslationLoader(true);
    if (getLSItem("company_model") === "1") {
      handleTranslate1(msg, lang).then((text) => {
        setTranslatedText(text.translatedText);
        setTranscriptLang(text.detectedSourceLanguage);
      });
    }

    if (getLSItem("company_model") === "2") {
      handleTranslate2(msg, lang).then((text) => {
        setTranslatedText(text);
      });
    }
  };

  useEffect(() => {
    if (translatedText) {
      setTranslationLoader(false);
    }
  }, [translatedText]);

  let pretranslatedauto = "";

  const translate_auto = (msg, lang) => {
    if (msg !== "") {
      if (getLSItem("company_model") === "1") {
        handleTranslate1(msg, lang).then((text) => {
          if (request === "agent_new_audio_sent") {
            setNewTranslatedAuto(text.translatedText);
            console.log("newtranslatedauto:", text.translatedText)
            console.log("pretranslatedauto:", translatedAuto)
            setTranslatedAuto(translatedAuto + text.translatedText);
            // pretranslatedauto = pretranslatedauto + text.translatedText;
            console.log("translatedauto:", translatedAuto + text.translatedText)
            setNewDataAudio("");
            setTranscriptLang(text.detectedSourceLanguage);
            setAudioLoader(false);
          } else {
            setTranslatedAuto(text.translatedText);
            setTranscriptLang(text.detectedSourceLanguage);
          }
        });
      }
      if (getLSItem("company_model") === "2") {

        handleTranslate2(msg, lang).then((text) => {
          if (request === "agent_new_audio_sent") {
            setNewTranslatedAuto(text);
            console.log("newtranslatedauto:", text)
            console.log("pretranslatedauto:", translatedAuto)
            setTranslatedAuto(translatedAuto + text);
            // pretranslatedauto = pretranslatedauto + text.translatedText;
            console.log("translatedauto:", translatedAuto + text)
            setNewDataAudio("");
            setTranscriptLang(text.detectedSourceLanguage);
            setAudioLoader(false);
          } else {
            setTranslatedAuto(text);
          }

        });
      }
    }
  };

  useEffect(() => {
    console.log("newDataAudio:", newDataAudio)
  }, [newDataAudio])

  // const rephraze_auto = (msg, lang) => {
  //   console.log("rephraze_auto:", msg);
  //   handleRephraze(msg, lang).then((text) => {
  //     console.log("text:", text);
  //     setRephrazedAuto(text);
  //   });
  // };

  const rephraze_auto = async (msg, lang) => {
    try {
      const text = await handleRephraze(msg, lang);
      console.log("text:", text);
      setRephrazedAuto(text);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // console.log("translatedAuto:", translatedAuto);
    if (translatedAuto !== "") {
      rephraze_auto(translatedAuto, getLSItem("lang_id_customer"));
      console.log("request_audio:", request);
      if (request === "agent_new_audio_sent") {
        playFunc(newTranslatedAuto, getLSItem("lang_id_customer"));
      } else {
        playFunc(translatedAuto, getLSItem("lang_id_customer"));
      }

    }
  }, [translatedAuto]);


  // useEffect(() => {
  // console.log("rephrazedAuto:", rephrazedAuto);
  // if (rephrazedAuto !== "" && rephrazedAuto !== "undefined") {
  //   playFunc(rephrazedAuto, getLSItem("lang_id_customer"));
  // }
  // }, [rephrazedAuto]);

  const onCloseTranslation = () => {
    setTranslationIndex(null);
    setTranslatedText(null);
  };

  const handleMouseUp = (idx) => {
    const selectedText = window.getSelection().toString();
    if (selectedText && selectedText !== "") {
      setTranslationIndex(idx);
      onTranslate(selectedText, null, idx);
    }
  };

  // const onStartRecording = async () => {
  //   setRecordingStatus("recording");
  //   //create new Media recorder instance using the stream
  //   const media = new MediaRecorder(stream, { type: mimeType });
  //   //set the MediaRecorder instance to the mediaRecorder ref
  //   mediaRecorder.current = media;
  //   //invokes the start method to start the recording process
  //   mediaRecorder.current.start();
  //   let localAudioChunks = [];
  //   mediaRecorder.current.ondataavailable = (event) => {
  //     if (typeof event.data === "undefined") return;
  //     if (event.data.size === 0) return;
  //     localAudioChunks.push(event.data);
  //   };
  //   setAudioChunks(localAudioChunks);
  // };

  const onStartRecording = async () => {
    setRecordingStatus("recording");
    SpeechRecognition.startListening({ continuous: true });

    // const media = new MediaRecorder(stream, {
    //   mimeType: "audio/webm",
    // });

    // mediaRecorder.current = media;
    // mediaRecorder.current.start(250);

    // mediaRecorder.addEventListener("dataavailable", async (event) => {
    //   if (event.data.size > 0 && audwebsckt.readyState == 1) {
    //     // socket.send(event.data);
    //     console.log("'[record start]'ed");
    //     audwebsckt.send(event.data);
    //   }
    // });

    // mediaRecorder.current.ondataavailable = (event) => {
    //   if (event.data.size > 0 && audwebsckt.readyState == 1) {
    //     console.log("record started");
    //     audwebsckt.send(event.data);
    //   }
    // };
    console.log("record started");
    // mediaRecorder.current.addEventListener("dataavailable", async (event) => {
    //   if (event.data.size > 0 && audwebsckt.readyState == 1) {
    //     // socket.send(event.data);
    //     audwebsckt.send(event.data);
    //     console.log("sent audio data");
    //   }
    // });
  };

  // useEffect(() => {
  //   if (recordingStatus === "recording") {
  //     const media = new MediaRecorder(stream, {
  //       mimeType: "audio/webm",
  //     });

  //     mediaRecorder.current = media;
  //     mediaRecorder.current.start(250);

  //     // mediaRecorder.addEventListener("dataavailable", async (event) => {
  //     //   if (event.data.size > 0 && audwebsckt.readyState == 1) {
  //     //     // socket.send(event.data);
  //     //     console.log("record started");
  //     //     audwebsckt.send(event.data);
  //     //   }
  //     // });

  //     mediaRecorder.current.ondataavailable = (event) => {
  //       if (typeof event.data === "undefined") return;
  //       if (event.data.size === 0) return;
  //       audwebsckt.send(event.data);
  //     };
  //   }

  //   if (mediaRecorder && recordingStatus === "inactive") {
  //     mediaRecorder.current.stop();
  //   }
  // }, [recordingStatus]);

  const onStopRecording = () => {
    if (recordingStatus === "recording") {
      stoppingSpeechRecognition();
      // mediaRecorder.current.stop();
      setRecordingStatus("inactive");
      console.log("record stop");
      setAudioData("");
    }
  };

  // const onStopRecording = () => {
  //   if (recordingStatus === "recording") {
  //     setRecordingStatus("inactive");
  //     //stops the recording instance
  //     mediaRecorder.current.stop();
  //     mediaRecorder.current.onstop = () => {
  //       //creates a blob file from the audiochunks data
  //       const audioBlob = new Blob(audioChunks, { type: mimeType });

  //       sendVoiceMessageData(audioBlob);
  //       //creates a playable URL from the blob file.
  //       const audioUrl = URL.createObjectURL(audioBlob);
  //       setAudio(audioUrl);
  //       setAudioChunks([]);
  //     };
  //   }
  // };

  async function getMicrophonePermission() {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  }
  const onHandleSpeak = (msg, lang, idx) => {
    setAudioLoader(true);
    setTranslatedAudio(null);
    if (
      audioPlayIndex &&
      audioPlayIndex === idx &&
      !audioRef?.current?.paused
    ) {
      audioRef?.current?.paused;
      setTranslatedAudio(null);
      setAudioPlayIndex(null);
      setAudioLoader(false);
    } else {
      setAudioPlayIndex(idx);
      playFunc(msg, lang);
    }
  };

  const onHandleVoice = (msg, lang, idx) => {
    setAudioLoader(true);
    setTranslatedAudio(null);
    if (
      audioPlayIndex &&
      audioPlayIndex === idx &&
      !voiceRef?.current?.paused
    ) {
      voiceRef?.current?.paused;
      setAudioSignedUrl(null);
      setAudioPlayIndex(null);
      setAudioLoader(false);
    } else {
      getAudioUrl(msg);
      setAudioPlayIndex(idx);
    }
  };

  const getAudioUrl = async (aUrl) => {
    dispatch(getAudioLink(aUrl));
  };

  const playFunc = async (msg, lang) => {
    const response = await handleSpeak(msg, lang);
    console.log("playFunc");
    if (response && response.audioContent) {
      // audioLink = new Audio(`data:audio/mp3;base64,${response.audioContent}`);
      // audioLink.play()
      setTranslatedAudio(response.audioContent);
    }
  };

  // useEffect(() => {
  //   const handleAudioEnded = () => {
  //     console.log("Audio playback finished");
  //     // Run other code here
  //     setAudioLoader(true);
  //     setTranslatedAudio(null);
  //     setTranslatedAuto("");
  //   };

  //   if (audioRef.current) {
  //     audioRef.current.addEventListener("ended", handleAudioEnded);
  //   }

  //   return () => {
  //     if (audioRef.current) {
  //       audioRef.current.removeEventListener("ended", handleAudioEnded);
  //     }
  //   };
  // }, []);

  const addLineBreak = () => {
    if (!isLoading && messageList?.length > 0) {
      let fData = new FormData();
      fData.append("message", "line-break");
      fData.append("language", getLSItem("lang_id_customer"));
      fData.append("is_reset", 1);
      setLoader(true);
      setLineBreakMessage(true);
      dispatch(sendMessage(fData));
    }
  };

  useEffect(() => {
    if (translationRef?.current) {
      setTranslationHeight(translationRef?.current?.clientHeight);
    }
  }, [translationRef.current]);

  const getTimeStamp = (datetime) => {
    let date = moment.utc(datetime).local();
    return date.format("DD-MMM-YYYY HH:mm A");
  };

  const toggleAutoPlay = () => {
    setLSItem("mute", !autoPlayMute);
    setAutoPlayMute(!autoPlayMute);
  };

  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Do something with the uploaded file
    console.log("Uploaded file:", file.name);
  };

  const handleAudioClick = () => {
    fileInputRef.current.click();
  };

  const handleAudioEnd = () => {
    // Code to run when audio playback has finished
    console.log("Audio playback finished!");
    setAudioLoader(true);
    // Run your other code here
  };

  const [websckt, setWebsckt] = useState();
  const [audwebsckt, setAudwebsckt] = useState();
  const [request, setRequest] = useState("");
  const [agent, setAgent] = useState();
  const [audioData, setAudioData] = useState("");
  const [receivedData, setReceivedData] = useState("");

  useEffect(() => {
    if (recordingStatus === "recording") {
      translate_auto(
        audioData + " " + receivedData,
        getLSItem("lang_id_customer")
      );
      setAudioData(audioData + " " + receivedData);
    } else {
      playFunc(receivedData, getLSItem("lang_id_customer"));
    }

    console.log("audioData: ", audioData);
  }, [receivedData]);

  useEffect(() => {
    const URL = "wss://44.206.239.174:8000";
    const ws = new WebSocket(URL);

    ws.onopen = () => {
      console.log("connected");
      ws.send(
        JSON.stringify({
          name: JSON.parse(getLSItem("user_data"))?.email,
          request: "",
          user: getLSItem("user_type"),
        })
      );
    };

    ws.onmessage = (evt) => {
      setAgent(JSON.parse(evt.data).agent);
      setRequest(JSON.parse(evt.data).request);
      console.log("request:", JSON.parse(evt.data).request)
      console.log("preDataAudio:", preDataAudio);
      setDataAudio(JSON.parse(evt.data).dataaudio);
      setNewDataAudio(JSON.parse(evt.data).dataaudio.slice(preDataAudio.length));
      console.log("newdataAudio:", JSON.parse(evt.data).dataaudio.slice(preDataAudio.length))
      preDataAudio = JSON.parse(evt.data).dataaudio;

    };

    ws.onclose = () => {
      console.log("disconnected");
    };
    setWebsckt(ws);

    return () => {
      ws.close();
    };
  }, []);

  // useEffect(() => {
  //   console.log("dataAudio2:", dataAudio)
  //   setNewDataAudio(dataAudio.replace(preDataAudio, ''));
  //   console.log("newDataAudio:", newDataAudio);
  //   setPreDataAudio(dataAudio);
  // }, [dataAudio])



  useEffect(() => {
    console.log("request:", request)
    if (request) {
      if (request === "rejected") {
        console.log("rejected_haha");
      }
      if (request === "accepted") {
        console.log("accepted_haha");
        dispatch(getSelectModel());

        dispatch(getMessageList());

        const audws = new WebSocket(
          `wss://44.206.239.174:8000/${JSON.parse(getLSItem("user_data"))?.email
          }/${agent}`
        );

        audws.onopen = () => {
          console.log("audio_event_open");
        };

        audws.onmessage = (message) => {
          const received = message.data;
          console.log("audio_event_received: ", received);
          setReceivedData(received);
        };

        audws.onclose = () => {
          console.log("audio_event_close");
        };
        setAudwebsckt(audws);
      }
      setOpened(false);
      // setResponse("");
    }
  }, [request]);
  useEffect(() => {
    if (request === "agent_new_message_sent") {
      console.log("agent_new_message_sent");
      // setAudioLoader(true);

      // if (translatedAudio === null && translatedAuto === "") {
      //   setAudioLoader(false);
      // }
      console.log("audioLoader:", audioLoader);
      setChatStart("started");

      setTimeout(() => {
        inputRef?.current?.focus();
        scrollToBottom();
      }, 2000);
      setRequest("accepted");
    }
    if (request === "agent_new_audio_sent") {
      console.log("agent_new_audio_sent");
      // setAudioLoader(true);

      // if (translatedAudio === null && translatedAuto === "") {
      //   setAudioLoader(false);
      // }
      console.log("audioLoader:", audioLoader);
      setChatStart("started");

      setTimeout(() => {
        inputRef?.current?.focus();
        scrollToBottom();
      }, 2000);
    }
  }, [request]);

  useEffect(() => {
    console.log("audioRef.current:", audioRef.current);
  }, [audioRef.current]);




  const stoppingSpeechRecognition = () => {
    SpeechRecognition.stopListening();
    formData.append("message", transcript);
    formData.append("user_type", getLSItem("user_type"));
    formData.append("receiver", agent);
    formData.append("language", getLSItem("lang_id_customer"));
    formData.append("is_reset", isReset);
    setLoader(true);
    console.log("loadingFirst:", loadingFirst);
    setLoadingFirst(loadingFirst + 1);
    console.log("loadingFirst:", loadingFirst);

    dispatch(sendMessage(formData));
    resetTranscript();

    console.log(transcript);

  };

  useEffect(() => {

    if (recordingStatus === "recording") {
      console.log("transcript:", transcript);
      websckt.send(
        JSON.stringify({
          name: JSON.parse(getLSItem("user_data"))?.email,
          agent: agent,
          request: "customer_new_audio_sent",
          dataaudio: transcript,
          user: getLSItem("user_type"),
        })
      );
    }
  }, [transcript]);

  return (
    <CallScreenWrapper>
      {/* {isLoading && (
            <CustomOverlay>
              <img src="/Icons/loader.gif" alt="Loader" />
            </CustomOverlay>
      )} */}
      <CallHeader>
        <NavBar />
      </CallHeader>
      {/* <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
        <div style={{ width: "25%", backgroundColor: "#0A6A7C" }}>
          <Predifinedtitle>Predefined Message</Predifinedtitle>
          <Predifinedcontent>Hello, World!</Predifinedcontent>
          <Predifinedcontent>Hello, World!</Predifinedcontent>
        </div>
        <div style={{ width: "75%", position: "relative" }}>
          
        </div>
      </div> */}
      <CallBody>
        <Calling1
          openState={opened}
          request={request}
          open={() => {
            setOpened(true);
            setRequest("");
            // ws.onopen = () => {
            websckt.send(
              JSON.stringify({
                name: JSON.parse(getLSItem("user_data"))?.email,
                agent: agent,
                request: "new",
                user: getLSItem("user_type"),
              })
            );
            // };
            // dispatch(
            //   requestNewCall({
            //     customer: JSON.parse(getLSItem("user_data"))?.email,
            //     call: "new",
            //   })
            // );
            // console.log(JSON.parse(getLSItem("user_data"))?.email);
          }}
        />
        {opened ? (
          <Calling2
            open={() => {
              setOpened(false);
              setRequest("");
              websckt.send(
                JSON.stringify({
                  name: JSON.parse(getLSItem("user_data"))?.email,
                  agent: agent,
                  request: "cancel",
                  user: getLSItem("user_type"),
                })
              );
              // dispatch(
              //   requestNewCall({
              //     customer: JSON.parse(getLSItem("user_data"))?.email,
              //     call: "cancel",
              //   })
              // );
            }}
          />
        ) : (
          <></>
        )}
        <AudioHiddenContainer>
          {translatedAudio && !audioLoader && (
            <audio
              ref={audioRef}
              autoPlay
              src={`data:audio/mp3;base64,${translatedAudio}`}
              controls
              onEnded={handleAudioEnd}
            ></audio>
          )}
          {audioSignedUrl && (
            <audio
              ref={voiceRef}
              autoPlay
              src={audioSignedUrl}
              controls
            ></audio>
          )}
        </AudioHiddenContainer>
        {!isSmallDevice && (
          <LeftSection>
            <ImageChatBackground
              src="/Icons/humanoid.png"
              alt="chatBackground"
            />
          </LeftSection>
        )}
        {(request === "accepted" || request === "agent_new_audio_sent") && <RightSection>
          {(translationIndex === 0 || translationIndex === 1) &&
            translationHeight &&
            !translationLoader && (
              <div
                style={{
                  marginTop:
                    windowSize?.width < 550
                      ? translationHeight * 1.5
                      : translationHeight,
                }}
              ></div>
            )}
          <div ref={messagesEndRef}>
            {messageList?.map((val, index) => {
              // if (
              //   messageList[index - 1]?.context_id &&
              //   val?.context_id &&
              //   messageList[index - 1]?.context_id !== val?.context_id
              // ) {
              //   return (
              //     <>
              //       <LineBreakDiv />
              //     </>
              //   );
              // }
              if (
                val?.type == 1 &&
                messageList[index - 1]?.message !== "line-break"
              )
                return (
                  <MessageWrapper>
                    {translationIndex === index && (
                      <ClickAwayListener onClickAway={onCloseTranslation}>
                        <TranslatrionWrapper>
                          <BotMessageTranslation>
                            {translationLoader ? (
                              <img src="/Icons/loader.gif" alt="Loader" />
                            ) : (
                              <span>{translatedText}</span>
                            )}
                            <MessageActionsBotTranslation>
                              <img
                                src="/Icons/closeButton.svg"
                                alt="closeButton"
                                onClick={(e) => onCloseTranslation()}
                              />
                            </MessageActionsBotTranslation>
                          </BotMessageTranslation>
                        </TranslatrionWrapper>
                      </ClickAwayListener>
                    )}
                    <BotMessage key={index}>
                      <span onMouseUp={() => handleMouseUp(index)}>
                        <BotMessageMethod>
                          Transcription
                          {/* <span>{"(" + transcriptLang + ")"}</span> */}
                        </BotMessageMethod>
                        <div>{val?.message}</div>
                        {console.log("loadingFirst:", loadingFirst)}
                        {request !== "agent_new_audio_sent" && loadingFirst > 1 &&
                          index === messageList.length - 1 ? (
                          <>
                            {!audioLoader &&
                              translate_auto(
                                val?.message,
                                getLSItem("lang_id_customer")
                              )}

                            <BotMessageMethod>Translation</BotMessageMethod>
                            <div>{translatedAuto}</div>
                            <BotMessageMethod>Rephrasing</BotMessageMethod>
                            <div>{rephrazedAuto}</div>
                          </>
                        ) : null}
                        {/* {(request === "agent_new_message_sent") ? } */}
                        {/* <BotMessageMethod>
                          Transcription<span>(Hindi)</span>
                        </BotMessageMethod>
                        <div>{val?.message[0]}</div>
                        <BotMessageMethod>
                          Translation<span>(English)</span>
                        </BotMessageMethod>
                        <div>{val?.message[1]}</div>
                        <BotMessageMethod>
                          Rephrasing<span>(English)</span>
                        </BotMessageMethod>
                        <div>{val?.message[2]}</div> */}
                        <DesktopTimeStamp>
                          <TimeStamp>
                            {getTimeStamp(val?.created_date)}
                          </TimeStamp>
                        </DesktopTimeStamp>
                      </span>

                      {/* <MobileTimeStamp>
                        <TimeStamp>{getTimeStamp(val?.created_date)}</TimeStamp>
                      </MobileTimeStamp> */}
                    </BotMessage>
                    <MessageActionsBot>
                      {/* <img
                          src="/Icons/speaker.svg"
                          alt="Image Description"
                          style={{ opacity: audioLoader ? 0.5 : 1 }}
                          onClick={(e) => {
                            if (audioLoader) {
                            } else {
                              onHandleSpeak(val?.message, val?.language, index);
                            }
                          }}
                        /> */}
                      <img
                        src="/Icons/translate.svg"
                        alt="Image Description"
                        // onClick={() =>
                        //   onTranslate(
                        //     val?.message,
                        //     val?.language,
                        //     index
                        //   )
                        // }
                        onClick={() => {
                          translate_button(
                            val?.message,
                            getLSItem("lang_id_customer"),
                            index
                          );
                        }}
                      />
                    </MessageActionsBot>
                  </MessageWrapper>
                );

              if (val?.type == 2)
                return (
                  <UserMessageWrapper ref={translationRef}>
                    {/* {translationIndex === index && (
                      <ClickAwayListener onClickAway={onCloseTranslation}>
                        <UserMessageTranslation>
                          {translationLoader ? (
                            <img
                              width={30}
                              height={30}
                              src="/Icons/loader.gif"
                              alt="Loader"
                            />
                          ) : (
                            <span>{translatedText}</span>
                          )}
                          <MessageActionsBotTranslation>
                            <img
                              src="/Icons/closeButton.svg"
                              alt="closeButton"
                              onClick={(e) => onCloseTranslation()}
                            />
                          </MessageActionsBotTranslation>
                        </UserMessageTranslation>
                      </ClickAwayListener>
                    )} */}
                    <UserMessage key={index}>
                      {/* <MessageActionsBot>
                        {val?.message && (
                          <img
                            onClick={() =>
                              onTranslate(val?.message, val?.language, index)
                            }
                            src="/Icons/whiteTranslate.svg"
                            alt="Image Description"
                          />
                        )}
                        {val?.audio_url && (
                          <img
                            src="/Icons/speaker-white.png"
                            alt="Image Description"
                            style={{ opacity: audioLoader ? 0.5 : 1 }}
                            onClick={(e) => {
                              if (audioLoader) {
                              } else {
                                onHandleVoice(
                                  val?.audio_url,
                                  val?.language,
                                  index
                                );
                              }
                            }}
                          />
                        )}
                      </MessageActionsBot> */}
                      <span onMouseUp={() => handleMouseUp(index)}>
                        {val?.message}
                      </span>
                      <DesktopTimeStamp>
                        <TimeStamp>{getTimeStamp(val?.created_date)}</TimeStamp>
                      </DesktopTimeStamp>
                      {/* <div>
                        {val?.audio_url && (
                          <audio src={val?.audio_url} controls></audio>
                        )}
                        <TimeStampWhite>
                          {getTimeStamp(val?.created_date)}
                        </TimeStampWhite>
                      </div> */}
                    </UserMessage>
                  </UserMessageWrapper>
                );
            })}
            {/* {audioData &&
              audioData !== " " &&
              (recordingStatus === "recording" ? (
                <UserMessageWrapper>
                  <UserMessage>
                    <span>{audioData}</span>
                  </UserMessage>
                </UserMessageWrapper>
              ) : (
                <MessageWrapper>
                  <BotMessage
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <BotMessageMethod>
                      Transcription<span>(Hindi)</span>
                    </BotMessageMethod>
                    <div>{audioData}</div>
                    <BotMessageMethod>
                      Tranlsation<span>(Engligh)</span>
                    </BotMessageMethod>
                    <div>{translatedAuto}</div>
                    <BotMessageMethod>
                      Rephrasing<span>(English)</span>
                    </BotMessageMethod>
                    <div>{translatedAuto}</div>
                  </BotMessage>
                </MessageWrapper>
              ))} */}

            {
              (recordingStatus === "recording" ? (
                <UserMessageWrapper>
                  <UserMessage>
                    <span>{transcript}</span>
                  </UserMessage>
                </UserMessageWrapper>
              ) : (request === "agent_new_audio_sent" && (
                <MessageWrapper>
                  <BotMessage
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <BotMessageMethod>
                      Transcription
                    </BotMessageMethod>
                    <div>{dataAudio}</div>
                    {newDataAudio !== "" && (translate_auto(
                      newDataAudio, getLSItem("lang_id_customer")
                    ), console.log("hahaha"))}
                    <BotMessageMethod>Tranlsation</BotMessageMethod>
                    <div>{translatedAuto}</div>
                    <BotMessageMethod>Rephrasing</BotMessageMethod>
                    <div>{rephrazedAuto}</div>
                  </BotMessage>
                </MessageWrapper>
              )))}

            <MessageWrapper>
              {isLoading && (
                <BotMessageTyping
                  style={{ paddingBottom: "10px", marginBottom: "30px" }}
                >
                  <img
                    src="/Icons/typing.gif"
                    alt="Typing"
                    style={{ opacity: audioLoader ? 0.5 : 1 }}
                  />
                </BotMessageTyping>
              )}
            </MessageWrapper>
          </div>
        </RightSection>}
      </CallBody>
      <CallFooter height={windowSize?.height}>
        <MessagePanel height={windowSize?.height}>
          <SectionOne
            style={{
              cursor: messageList?.length ? "pointer" : "not-allowed",
              display: "flex",
              position: "relative",
            }}
          // onClick={addLineBreak}
          >
            <ImageIcon_Cancel
              src="/Icons/cancel_call.png"
              onClick={() => {
                setOpened(false);
                setRequest("");
                websckt.send(
                  JSON.stringify({
                    name: JSON.parse(getLSItem("user_data"))?.email,
                    agent: agent,
                    request: "cancel",
                    user: getLSItem("user_type"),
                  })
                );
              }}
            />
          </SectionOne>
          <SectionTwo>
            <EnterMessage
              ref={inputRef}
              type="text"
              value={input}
              disabled={isLoading}
              placeholder="Send a message"
              onChange={(e) => handleInput(e)}
              onKeyDown={(e) => isEnter(e)}
            />
          </SectionTwo>
          {showRecordAnimation === false && recordingStatus !== "recording" ? (
            <>
              <ImageIcon
                src="/Icons/microphone.png"
                style={{
                  cursor: "pointer",
                  width: windowSize?.height < 450 ? "20px" : "28px",
                }}
                onClick={() => {
                  if (!isLoading) {
                    if (!permission) {
                      getMicrophonePermission();
                    } else if (request === "accepted" || request === "agent_new_audio_sent") {
                      onStartRecording();
                      setShowRecordAnimation(true);
                    }
                    else {
                      alert("Please accept new call request");
                    }
                  }
                }}
              />

              {/* <div>
                <ImageIcon
                  src="/Icons/upload.png"
                  style={{
                    cursor: "pointer",
                    width: windowSize?.height < 450 ? "20px" : "28px",
                    marginLeft: "10px",
                    color: "red",
                  }}
                  onClick={handleAudioClick}
                />

                <input
                  type="file"
                  accept=".mp3, .wav"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
              </div> */}

              {/* <ImageIcon
                src="/Icons/send.png"
                style={{
                  cursor: "pointer",
                  width: windowSize?.height < 450 ? "20px" : "28px",
                  marginLeft: "10px",
                  color: "red",
                }}
              /> */}
            </>
          ) : (
            <>
              <ImageIcon
                src="/Icons/icons8-audio-wave.gif"
                style={{
                  cursor: "pointer",
                  width: windowSize?.height < 450 ? "20px" : "28px",
                }}
                onClick={() => {
                  onStopRecording();
                  setShowRecordAnimation(false);
                }}
              />

              <ImageIcon
                src="/Icons/closespeak.png"
                style={{
                  cursor: "pointer",
                  width: windowSize?.height < 450 ? "20px" : "28px",
                  marginLeft: "10px",
                  color: "red",
                }}
                onClick={() => {
                  onStopRecording();
                  setShowRecordAnimation(false);
                }}
              />
            </>
          )}
        </MessagePanel>
        {/* <AutoPlayWrapper onClick={toggleAutoPlay}>
          <MuteText>{autoPlayMute ? "Unmute" : "Mute"}</MuteText>
          <img
            height={autoPlayMute ? "30px" : "30px"}
            src={autoPlayMute ? "/Icons/mute.png" : "/Icons/unmute.png"}
            alt="Image Description"
          />
        </AutoPlayWrapper> */}
      </CallFooter>
    </CallScreenWrapper>
  );
}

export default Customer;
