import React, { useEffect, useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import NavBar from "../../components/CallnavBarAgent";
import { useNavigate } from "react-router-dom";
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
  Predifined,
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
} from "./agentStyle";
import {
  getMessageList,
  sendMessage,
  translateMessage,
  getAudioLink,
} from "../../AppRedux/actions/user";
import {
  getLSItem,
  setLSItem,
  handleSpeak,
  handleTranslate1,
  handleTranslate2,
  handleRephraze,
} from "../../utilities/general";
import { display } from "@mui/system";
function Agent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isReset, setIsReset] = useState(0);
  const [messageList, setMessageList] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [loadingFirst, setLoadingFirst] = useState(0);
  const [chatStart, setChatStart] = useState("");
  const [showRecordAnimation, setShowRecordAnimation] = useState(false);
  const mimeType = "audio/mpeg";
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const mediaRecorder = useRef(null);
  const translationRef = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [translationIndex, setTranslationIndex] = useState(null);
  const [translatedAuto, setTranslatedAuto] = useState(null);
  const [transcriptLang, setTranscriptLang] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [translationLoader, setTranslationLoader] = useState(false);
  const [audioContent, setAudioContent] = useState(null);
  const [audioLoader, setAudioLoader] = useState(false);
  const [translationHeight, setTranslationHeight] = useState(0);
  const [audioPlayIndex, setAudioPlayIndex] = useState(null);
  const [translatedAudio, setTranslatedAudio] = useState(null);
  const [rephrazedAuto, setRephrazedAuto] = useState("");
  const [audioSignedUrl, setAudioSignedUrl] = useState(null);
  const [autoPlayMute, setAutoPlayMute] = useState(getLSItem("mute"));
  const [isLineBreakMessage, setLineBreakMessage] = useState(false);
  const [dataAudio, setDataAudio] = useState("");

  const audioRef = useRef();
  const voiceRef = useRef();

  const windowSize = useWindowSize();
  const isSmallDevice = window.matchMedia("(max-width: 800px)").matches;
  // let audioLink = null

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
  } = useSelector(({ user }) => user);

  const [input, setInput] = useState("");

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
      formData.append("receiver", customer);
      formData.append("language", getLSItem("lang_id_agent"));
      formData.append("is_reset", isReset);
      setLoadingFirst(loadingFirst + 1);
      setLoader(true);
      dispatch(sendMessage(formData));
    }
  };
  usePlayAudio();
  useEffect(() => {
    // dispatch(getMessageList());
    // setMessageList([
    //   {
    //     type: 1,
    //     context_id: 1,
    //     message:
    //       "सुप्रभात। मैं विक्स ग्राहक सहायता टीम से मिशेला हूं। कॉलबैक अनुरोध के संबंध में आप तक पहुंच रहा हूं। आज आप कैसे हैं?",
    //     created_date: "2023-08-24",
    //     language: 1,
    //   },
    //   {
    //     type: 2,
    //     context_id: 1,
    //     message: [
    //       "Hi! I am good. How about you?",
    //       "नमस्ते! मैं अच्छा हूँ। आप कैसे हैं?",
    //       "नमस्ते! मैं अच्छा हूँ। आप कैसे हैं?",
    //     ],
    //     // message: "你好",
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
        playFunc(sendMessageSuccessData?.msg, getLSItem("lang_id_agent"));
      }
      setLineBreakMessage(false);
      setLoader(false);
      setInput("");
      websckt.send(
        JSON.stringify({
          name: JSON.parse(getLSItem("user_data"))?.email,
          receiver: customer,
          request: "agent_new_message_sent",
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
      console.log("\n\naudioBlob: ", aBlob);
      formData.append("file", aBlob, "recorded.webm");
      formData.append("language", getLSItem("lang_id_agent"));
      formData.append("user_type", getLSItem("user_type"));
      formData.append("receiver", customer);
      formData.append("is_reset", isReset);
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
      language: getLSItem("lang_id_agent"),
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

  const translate_auto = (msg, lang) => {
    if (getLSItem("company_model") === "1") {
      handleTranslate1(msg, lang).then((text) => {
        setTranslatedAuto(text.translatedText);
        setTranscriptLang(text.detectedSourceLanguage);
      });
    }

    if (getLSItem("company_model") === "2") {
      handleTranslate2(msg, lang).then((text) => {
        setTranslatedAuto(text);
      });
    }
  };

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
    console.log("translatedAuto:", translatedAuto);
    if (translatedAuto !== "") {
      rephraze_auto(translatedAuto, getLSItem("lang_id_agent"));
      playFunc(translatedAuto, getLSItem("lang_id_agent"));
    }
  }, [translatedAuto]);

  const onCloseTranslation = () => {
    setTranslationIndex(null);
    setTranslatedText("");
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
    // console.log("record started");
    // mediaRecorder.current.addEventListener("dataavailable", async (event) => {
    //   if (event.data.size > 0 && audwebsckt.readyState == 1) {
    //     audwebsckt.send(event.data);
    //     console.log("sent audio data");
    //   }
    // });
  };

  const onStopRecording = () => {
    if (recordingStatus === "recording") {
      // mediaRecorder.current.stop();
      stoppingSpeechRecognition();
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

  const getMicrophonePermission = async () => {
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
  };
  const onHandleSpeak = (msg, lang, idx) => {
    setAudioLoader(true);
    setTranslatedAudio(null);
    if (
      audioPlayIndex &&
      audioPlayIndex === idx &&
      !audioRef?.current?.paused
    ) {
      console.log("audio_1");
      audioRef?.current?.paused;
      setTranslatedAudio(null);
      setAudioPlayIndex(null);
      setAudioLoader(false);
    } else {
      console.log("audio_2");
      setAudioPlayIndex(idx);
      playFunc(msg, lang);
    }
  };

  const onHandleVoice = (msg, lang, idx) => {
    setAudioLoader(true);
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
    if (response && response.audioContent) {
      // audioLink = new Audio(`data:audio/mp3;base64,${response.audioContent}`);
      // audioLink.play()
      setTranslatedAudio(response.audioContent);
    }
  };

  const addLineBreak = () => {
    if (!isLoading && messageList?.length > 0) {
      let fData = new FormData();
      fData.append("message", "line-break");
      fData.append("language", getLSItem("lang_id_agent"));
      fData.append("is_reset", 1);
      setLoader(true);
      setLineBreakMessage(true);
      dispatch(sendMessage(fData));
    }
  };
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    event.target.value = '';
    sendVoiceMessageData(file);

    // audioElement.addEventListener('loadedmetadata', async () => {

    //   const stream = audioElement.captureStream();
    //   console.log("audioElement:", audioElement)
    //   console.log("stream:", stream)
    //   console.log("Uploaded file:", file.name);

    //   const mimeType = 'audio/webm';
    //   const media = new MediaRecorder(stream, { mimeType });
    //   mediaRecorder.current = media;
    //   mediaRecorder.current.start();
    //   let chunks = [];

    //   mediaRecorder.current.ondataavailable = (event) => {
    //     console.log("loading audio streaming chunk")
    //     chunks.push(event.data);
    //   };

    //   if (mediaRecorder.current.state === 'inactive') {
    //     console.log('Streaming has finished');
    //   }

    //   mediaRecorder.current.addEventListener('stop', () => {
    //     console.log("stopped streaming")
    //     const audioBlob = new Blob(chunks, { type: mimeType });
    //     sendVoiceMessageData(audioBlob);
    //   });
    //   console.log("Uploaded file:", file.name);
    // });


    // formData.append("message", "hello");
    // formData.append("user_type", getLSItem("user_type"));
    // formData.append("receiver", customer);
    // formData.append("language", getLSItem("lang_id_agent"));
    // formData.append("is_reset", isReset);
    // setLoadingFirst(loadingFirst + 1);
    // setLoader(true);
    // dispatch(sendMessage(formData));
  };

  const handleAudioClick = () => {
    console.log("audiofileupload")
    if (request === "accepted" || request === "customer_new_audio_sent") {
      fileInputRef.current.click();
    } else {
      alert("Please accept new call request")
    }

  };

  const handleAudioEnd = () => {
    // Code to run when audio playback has finished
    console.log("Audio playback finished!");
    setAudioLoader(true);
    // Run your other code here
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

  const [customer, setCustomer] = useState();
  const [request, setRequest] = useState("");
  const [websckt, setWebsckt] = useState();
  const [audwebsckt, setAudwebsckt] = useState();
  const [audioData, setAudioData] = useState("");
  const [receivedData, setReceivedData] = useState("");

  useEffect(() => {
    if (recordingStatus === "recording") {
      translate_auto(audioData + " " + receivedData);
      setAudioData(audioData + " " + receivedData);
    } else {
      playFunc(receivedData, getLSItem("lang_id_agent"));
    }
    console.log("audioData: ", audioData);
  }, [receivedData]);

  useEffect(() => {
    if (recordingStatus === "recording") {
      translate_auto(dataAudio);
    } else {
      playFunc(dataAudio, getLSItem("lang_id_agent"));
    }
  }, [dataAudio]);

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
      console.log("request:", JSON.parse(evt.data).request);
      setCustomer(JSON.parse(evt.data).customer);
      setRequest(JSON.parse(evt.data).request);
      setDataAudio(JSON.parse(evt.data).dataaudio);
      console.log("dataaudio:", JSON.parse(evt.data).dataaudio);
    };

    ws.onclose = () => {
      console.log("disconnected");
    };

    setWebsckt(ws);

    return () => {
      ws.close();
    };
  }, []);

  const reject = () => {
    websckt.send(
      JSON.stringify({
        name: JSON.parse(getLSItem("user_data"))?.email,
        customer: customer,
        request: "rejected",
        user: getLSItem("user_type"),
      })
    );
    setRequest("rejected");
    console.log("reject------");
  };

  const accept = () => {
    websckt.send(
      JSON.stringify({
        name: JSON.parse(getLSItem("user_data"))?.email,
        customer: customer,
        request: "accepted",
        user: getLSItem("user_type"),
      })
    );
    setRequest("accepted");
    console.log("accept------");
  };

  useEffect(() => {
    console.log("request:", request)
    if (request === "customer_new_message_sent") {
      console.log("customer_new_message_sent");
      setTranslatedAudio(null);
      setTranslatedAuto("");
      setChatStart("started");
      setTimeout(() => {
        inputRef?.current?.focus();
        scrollToBottom();
      }, 2000);
      setRequest("accepted");
    }
    if (request === "customer_new_audio_sent") {
      console.log("customer_new_audio_sent");
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

    if (request === "accepted") {
      const audws = new WebSocket(
        `wss://44.206.239.174:8000/${JSON.parse(getLSItem("user_data"))?.email
        }/${customer}`
      );

      dispatch(getMessageList());
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
  }, [request]);

  const [isBrowserSupport, setIsBrowserSupport] = useState(true);


  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const stoppingSpeechRecognition = () => {
    SpeechRecognition.stopListening();
    formData.append("message", transcript);
    formData.append("user_type", getLSItem("user_type"));
    formData.append("receiver", customer);
    formData.append("language", getLSItem("lang_id_agent"));
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
    console.log(transcript);
    if (recordingStatus === "recording") {
      websckt.send(
        JSON.stringify({
          name: JSON.parse(getLSItem("user_data"))?.email,
          customer: customer,
          request: "agent_new_audio_sent",
          dataaudio: transcript,
          user: getLSItem("user_type"),
        })
      );
    }

  }, [transcript]);

  // ws.onopen = () => {
  //   console.log("connected");
  //   ws.send(
  //     JSON.stringify({
  //       name: JSON.parse(getLSItem("user_data"))?.email,
  //       request: "none",
  //       user: getLSItem("user_type"),
  //     })
  //   );
  // };

  // ws.onmessage = (evt) => {
  //   console.log(JSON.parse(evt.data));
  // };

  return (
    <CallScreenWrapper>
      {/* {isLoading && (
            <CustomOverlay>
              <img src="/Icons/loader.gif" alt="Loader" />
            </CustomOverlay>
      )} */}
      <CallHeader>
        <NavBar
          showBell={request === "new"}
          reject={reject}
          accept={accept}
          customer={customer}
        />
      </CallHeader>
      <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
        {!isSmallDevice && (
          <div style={{ width: "25%", backgroundColor: "#fff" }}>
            <Predifined>
              <Predifinedtitle>Predefined Message</Predifinedtitle>
              <Predifinedcontent
                onClick={() => {
                  setInput(
                    "Good Morning. This is Michaela from Wix Customer Support team. Reaching you with regard to the Callback request. How are you doing today?"
                  );
                }}
              >
                Good Morning.This is Michaela from Wix Customer Support team.
                Reaching you with regard to the Callback request. How are you
                doing today?
              </Predifinedcontent>
              <Predifinedcontent
                onClick={() => {
                  setInput(
                    "सुप्रभात। मैं विक्स ग्राहक सहायता टीम से मिशेला हूं। कॉलबैक अनुरोध के संबंध में आप तक पहुंच रहा हूं। आज आप कैसे हैं?"
                  );
                }}
              >
                सुप्रभात। मैं विक्स ग्राहक सहायता टीम से मिशेला हूं। कॉलबैक
                अनुरोध के संबंध में आप तक पहुंच रहा हूं। आज आप कैसे हैं?
              </Predifinedcontent>
              <ImageChatBackground
                src="/Icons/humanoid.png"
                alt="chatBackground"
              />
            </Predifined>
          </div>
        )}
        <div
          style={
            !isSmallDevice
              ? { width: "75%", position: "relative" }
              : { width: "100%", position: "relative" }
          }
        >
          <CallBody>
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
            {/* <LeftSection>
              <ImageChatBackground
                src="/Icons/humanoid.png"
                alt="chatBackground"
              />
            </LeftSection> */}
            {(request === "accepted" || request === "customer_new_audio_sent") && <RightSection>
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
                    val?.type == 2 &&
                    messageList[index - 1]?.message !== "line-break"
                  )
                    return (
                      <MessageWrapper>
                        {translationIndex === index && (
                          <ClickAwayListener onClickAway={onCloseTranslation}>
                            <TranslatrionWrapper>
                              <BotMessageTranslation>
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
                              </BotMessageTranslation>
                            </TranslatrionWrapper>
                          </ClickAwayListener>
                        )}
                        <BotMessage key={index}>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span onMouseUp={() => handleMouseUp(index)}>
                              <BotMessageMethod>
                                Transcription
                                {/* <span>{"(" + transcriptLang + ")"}</span> */}
                              </BotMessageMethod>
                              <div>{val?.message}</div>
                              {index === messageList.length - 1 ? (
                                <>
                                  {!audioLoader &&
                                    translate_auto(
                                      val?.message,
                                      getLSItem("lang_id_agent")
                                    )}
                                  <BotMessageMethod>
                                    Translation
                                  </BotMessageMethod>
                                  <div>{translatedAuto}</div>
                                  <BotMessageMethod>
                                    Rephrasing
                                  </BotMessageMethod>
                                  <div>{rephrazedAuto}</div>
                                </>
                              ) : null}
                              {/* {translate_new(val?.message, val?.language, index)} */}
                              {/* {handleTranslate1(val?.message).then((text) => (
                              <>
                                <BotMessageMethod>
                                  Translation<span>(Hindi)</span>
                                </BotMessageMethod>
                                <div>{text}</div>
                              </>
                            ))} */}

                              {/* <BotMessageMethod>
                                Translation<span>(Hindi)</span>
                              </BotMessageMethod>
                              <div>{val?.message[1]}</div>
                              <BotMessageMethod>
                                Rephrasing<span>(Hidni)</span>
                              </BotMessageMethod>
                              <div>{val?.message[2]}</div> */}
                              <DesktopTimeStamp>
                                <TimeStamp>
                                  {getTimeStamp(val?.created_date)}
                                </TimeStamp>
                              </DesktopTimeStamp>
                            </span>
                          </div>

                          {/* <MobileTimeStamp>
                            <TimeStamp>
                              {getTimeStamp(val?.created_date)}
                            </TimeStamp>
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
                                  onHandleSpeak(
                                    val?.message,
                                    getLSItem("lang_id_agent"),
                                    index
                                  );
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
                                getLSItem("lang_id_agent"),
                                index
                              );
                            }}
                          />
                        </MessageActionsBot>
                      </MessageWrapper>
                    );

                  if (val?.type == 1)
                    return (
                      <UserMessageWrapper ref={translationRef}>
                        {translationIndex === index && (
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
                        )}
                        <UserMessage key={index}>
                          <MessageActionsBot>
                            {/* {val?.message && (
                              <img
                                onClick={() =>
                                  onTranslate(
                                    val?.message,
                                    val?.language,
                                    index
                                  )
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
                            )} */}

                            <span onMouseUp={() => handleMouseUp(index)}>
                              {val?.message}
                              <TimeStampWhite style={{ textAlign: "right" }}>
                                {getTimeStamp(val?.created_date)}
                              </TimeStampWhite>
                            </span>
                          </MessageActionsBot>
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
                          Transcription<span>(transcriptLang)</span>
                        </BotMessageMethod>
                        <div>{audioData}</div>
                        <BotMessageMethod>Tranlsation</BotMessageMethod>
                        <div>{translatedAuto}</div>
                        <BotMessageMethod>Rephrasing</BotMessageMethod>
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
                  ) : (request === "customer_new_audio_sent" && (
                    <MessageWrapper>
                      <BotMessage
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <BotMessageMethod>
                          Transcription
                        </BotMessageMethod>
                        <div>{dataAudio}</div>
                        <BotMessageMethod>Tranlsation</BotMessageMethod>
                        <div>{translatedAuto}</div>
                        <BotMessageMethod>Rephrasing</BotMessageMethod>
                        <div>{translatedAuto}</div>
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
        </div>

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
              <ImageIcon_Cancel src="/Icons/cancel_call.png" onClick={() => {
                websckt.send(
                  JSON.stringify({
                    name: JSON.parse(getLSItem("user_data"))?.email,
                    customer: customer,
                    request: "rejected",
                    user: getLSItem("user_type"),
                  })
                );
                setRequest("rejected");
              }} />
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
            {showRecordAnimation === false && recordingStatus === "inactive" ? (
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
                      } else if (request === "accepted" || request === "customer_new_audio_sent") {
                        onStartRecording();
                        setShowRecordAnimation(true);
                      }
                      else {
                        alert("Please accept new call request");
                      }
                    }
                  }}
                />

                <div>
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
                </div>

                {/* <ImageIcon
                  src="/Icons/send.png"
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
      </div>
    </CallScreenWrapper>
  );
}

export default Agent;
