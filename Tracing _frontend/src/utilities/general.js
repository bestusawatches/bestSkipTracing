import axios from "axios";

import { googleApiKey, openaiApiKey, openaiOrgId, microsoftApiKey } from "../config";
const { v4: uuidv4 } = require('uuid');
export const handleSpeak = async (text, lang) => {
  if (text) {
    try {
      const response = await axios.post(
        "https://texttospeech.googleapis.com/v1/text:synthesize",
        {
          input: { text },
          voice: {
            // languageCode: lang == 1 ? "en" : "zh-CN",
            languageCode: lang == 1 ? "en" : "hi",
            ssmlGender: "FEMALE",
          }, // Spanish (Spain), Fe voice
          audioConfig: { audioEncoding: "MP3" },
        },
        {
          params: { key: googleApiKey }, // 'AIzaSyBFdl_BqKkFfBd0_L0tAvuQZ8vpRGzydoA'  Replace with your actual Google Cloud API key
        }
      );
      return response?.data;
    } catch (error) {
      return error;
    }
  }
};

export const getLSItem = (type) => {
  return localStorage.getItem(type);
};

export const setLSItem = (type, data) => {
  return localStorage.setItem(type, data); // token
};

export const handleTranslate1 = async (text, lang) => {
  if (text) {
    try {
      const response = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {
          q: [text],
          target: lang == 1 ? "en" : "hi",
        },
        {
          params: { key: googleApiKey },
        }
      );
      return response?.data?.data?.translations[0];
    } catch (error) {
      return error;
    }
  }
};

export const handleTranslate2 = async (text, lang) => {
  if (text) {
    const key = microsoftApiKey;
    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const location = "eastus";

    try {
      const response = await axios.post(`${endpoint}/translate`, [{
        'text': text
      }], {
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Ocp-Apim-Subscription-Region': location,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        },
        params: {
          'api-version': '3.0',
          'to': lang == 1 ? "en" : "hi",
        },
        responseType: 'json'
      });
      return JSON.parse(JSON.stringify(response.data))[0].translations[0].text;
      // return response?.data?.data?.translations[0];
    } catch (error) {
      return error;
    }
  }
};

export const handleRephraze = async (text, lang) => {
  if (text) {
    const headers = {
      "OpenAI-Organization": openaiOrgId,
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + openaiApiKey,
    };

    const current_message = {
      role: "user",
      content:
        "Plz paraphrase the following sentences to make them easier to understand and don't change the detected language. for example, if detected language is hindi, the paraphrased senteces' language must be hindi. if detected language is english, the paraphrased senteces' language must be english. " +
        text,
    };

    const payload = {
      model: "gpt-3.5-turbo",
      messages: [current_message],
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        payload,
        { headers }
      );
      return JSON.parse(response?.request?.response).choices[0].message.content;
    } catch (error) {
      return error;
    }
  }
};
