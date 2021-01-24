import { parse_error_message } from "@twodashes/universal/cjs/requests";
import { message } from "antd";
import axios from "axios";
// import { RX__domain_availability } from "../output"
const NEXT_PUBLIC_DEV_PUBLIC_API_HOST = "//" + process.env.NEXT_PUBLIC_DEV_PUBLIC_API_HOST;
const DEVELOPMENT = process.env.NEXT_PUBLIC_NODE_ENV === "development";

/*
 * WHICH SERVER?
 * Yes, "x-rapidapi-key" is exposed, however if it is used, then captcha_response is required,
 * and the request will be required to come from nlp.domains, nlp.studio, or nlpthesaurus.com.
 * This secret key is ONLY allowed to consume APIs which we produce and secure in this manner.
 */
const endpoint_types = {
  "spellcheck": "tokenize",
  "tokenize": "tokenize",
  "spellcheck-tokenize": "tokenize",
  "wordbreak": "tokenize",
  "word": "word",
  "word-info": "word",
  "synonyms": "word"
};
const apiHeaders = function (endpoint) {
  let endpoint_type = endpoint_types[endpoint];
  if (DEVELOPMENT) {
    return { "content-type": "application/json" };
  } else if (endpoint_type === "tokenize") {
    return {
      "content-type": "application/json",
      "x-rapidapi-host": "spellcheck-tokenization-wordbreak.p.rapidapi.com",
      "x-rapidapi-key": "9407dfdda9msh488197632304125p1b200bjsnff4a5b2f6272",
      "useQueryString": true
    };
  } else if (endpoint_type === "word") {
    return {
      "content-type": "application/json",
      "x-rapidapi-host": "synonyms-word-info.p.rapidapi.com",
      "x-rapidapi-key": "9407dfdda9msh488197632304125p1b200bjsnff4a5b2f6272",
      "useQueryString": true
    };
  }
};
const apiHost = function (endpoint) {
  let endpoint_type = endpoint_types[endpoint];
  if (DEVELOPMENT) {
    return NEXT_PUBLIC_DEV_PUBLIC_API_HOST;
  } else if (endpoint_type === "tokenize") {
    return "https://spellcheck-tokenization-wordbreak.p.rapidapi.com";
  } else if (endpoint_type === "word") {
    return "https://synonyms-word-info.p.rapidapi.com";
  }
};

/*
 * API ABSTRACTION
 */
export default function v1_get_word(endpoint, params) {
  if (!endpoint || !params || !params.str) {
    return;
  }
  return new Promise((resolve) => {
    axios({
      method: "get",
      url: apiHost(endpoint) + "/v1/" + endpoint + "?str=" + encodeURIComponent(params.str),
      headers: apiHeaders(endpoint)
    })
      .then((results) => {
        /*
         * which data
         * expecting server response to have data key
         * but Axios puts its response into data key also
         */
        if (results.data && "data" in results.data) {
          resolve(results.data.data); // correct
        } else {
          console.error('server response did not have "data" key');
          resolve(results.data);
        }
      })
      .catch((err) => {
        message.error(parse_error_message(err), 10);
      });
  });
}
