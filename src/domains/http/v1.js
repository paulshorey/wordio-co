import { parse_error_message } from "@twodashes/universal/cjs/requests";
import { message } from "antd";
import axios from "axios";
// import { RX__domain_availability } from "../output"
const NEXT_PUBLIC_DEV_PUBLIC_API_HOST = "//" + process.env.NEXT_PUBLIC_DEV_PUBLIC_API_HOST;
const DEVELOPMENT = process.env.NODE_ENV === "development";

/*
 * WHICH SERVER?
 * Yes, "x-rapidapi-key" is exposed, however if it is used, then captcha_response is required,
 * and the request will be required to come from nlp.domains, nlp.studio, or nlpthesaurus.com.
 * This secret key is ONLY allowed to consume APIs which we produce and secure in this manner.
 */
const apiHeaders = function (name) {
  if (DEVELOPMENT) {
    return { "content-type": "application/json" };
  } else if (name === "domain-single") {
    return {
      "content-type": "application/json",
      "x-rapidapi-host": "domain-search-tools.p.rapidapi.com",
      "x-rapidapi-key": "11dc13858emshc2393c506bb7d52p12d7e3jsnc48d54772625",
      "useQueryString": true
    };
  } else if (name === "availability") {
    return {
      "content-type": "application/json",
      "x-rapidapi-host": "domain-availability-bulk.p.rapidapi.com",
      "x-rapidapi-key": "9407dfdda9msh488197632304125p1b200bjsnff4a5b2f6272",
      "useQueryString": true
    };
  } else if (name === "suggestions") {
    return {
      "content-type": "application/json",
      "x-rapidapi-host": "domain-suggestions-tlds.p.rapidapi.com",
      "x-rapidapi-key": "9407dfdda9msh488197632304125p1b200bjsnff4a5b2f6272",
      "useQueryString": true
    };
  }
};
const apiHost = function (name) {
  if (DEVELOPMENT) {
    return NEXT_PUBLIC_DEV_PUBLIC_API_HOST;
  } else if (name === "domain-single") {
    return "https://domain-search-tools.p.rapidapi.com";
  } else if (name === "thesaurus") {
    return "https://nlp-studio3.p.rapidapi.com";
  } else if (name === "availability") {
    return "https://domain-availability-bulk.p.rapidapi.com";
  } else if (name === "suggestions") {
    return "https://domain-suggestions-tlds.p.rapidapi.com";
  }
};

/*
 * WHOIS
 */
export function v1_whois(params = {}) {
  return new Promise((resolve) => {
    if (params.domain) {
      if (typeof window === "object" && window.isLoading) window.isLoading("data");
      axios({
        method: "get",
        url: apiHost("domain-single") + "/v1/whois?domain=" + params.domain,
        headers: apiHeaders("domain-single")
      })
        .then((results) => {
          if (results.data && "data" in results.data) {
            resolve(results.data.data); // correct
          } else {
            console.error("whois response did not have data");
            resolve({});
          }
        })
        .catch((err) => {
          message.error(parse_error_message(err), 10);
        })
        .then(() => {
          if (typeof window === "object" && window.doneLoading) window.doneLoading("data");
        });
    } else {
      resolve();
    }
  });
}

/*
 * API METHOD: AVAILABILITY
 */
export function v1_domain_availability(params = {}) {
  return new Promise((resolve) => {
    // console.warn("received                        v1_domain_availability")
    // console.timeEnd("/ds")
    if (params.domains && params.domains.length) {
      axios({
        method: "post",
        url: apiHost("availability") + "/v1/availability",
        data: params,
        headers: apiHeaders("availability")
      })
        .then((results) => {
          if (results.data && "data" in results.data) {
            resolve(results.data.data); // correct
          } else {
            console.error("availability response did not have data");
            resolve({});
          }
        })
        .catch((err) => {
          message.error(parse_error_message(err), 10);
        })
        .then(() => {
          /*
           * done loading
           */
          if (typeof window === "object" && window.doneLoading) window.doneLoading("data");
        });
    } else {
      resolve();
    }
  });
}

/*
 * API METHOD: SUGGESTIONS
 */
export function v1_domain_suggestions(params = {}) {
  if (!params || !params.str) {
    return;
  }
  return new Promise((resolve) => {
    /*
     * start loading
     */
    if (typeof window === "object" && window.isLoading) window.isLoading("data");
    let postParams = {
      str: params.str,
      tld: params.tlds_use && params.tlds_use[0] ? params.tlds_use[0] : "com",
      site_id: params.site_id
    };
    let timeStart = Date.now();
    axios({
      method: "post",
      url: apiHost("suggestions") + "/v1/suggestions",
      params: postParams,
      data: { ...params },
      headers: apiHeaders("suggestions")
    })
      .then((results) => {
        let data = {};
        if (results.data && "data" && "data" in results.data) {
          data = results.data.data;
        }
        /*
         * track success
         */
        let req_str = postParams.str + "." + postParams.tld;
        let res_time = ((Date.now() - timeStart) / 1000).toFixed(2) * 100;
        let res_suggestions = {};
        let res_total = 0;
        if (data.domains) {
          for (let type in data.domains) {
            res_suggestions[type] = data.domains[type] ? data.domains[type].length : 0;
            res_total += res_suggestions[type];
          }
        }
        if (typeof window === "object" && window.ga) {
          window.ga("send", {
            hitType: "event",
            eventCategory: "suggestions success",
            eventAction: req_str,
            eventValue: res_time,
            eventLabel: `"${req_str}" @${res_time} ${JSON.stringify(res_suggestions)}`,
            user_id: data ? data.user_id : ""
          });
        }
        /*
         * output data
         */
        resolve(data);
      })
      .catch((err) => {
        message.error(parse_error_message(err), 10);
        /*
         * track error
         */
        let req_str = postParams.str + "." + postParams.tld;
        let res_time = ((Date.now() - timeStart) / 1000).toFixed(2) * 100;
        if (typeof window === "object" && window.ga) {
          window.ga("send", {
            hitType: "event",
            eventCategory: "suggestions error",
            eventAction: req_str,
            eventValue: res_time,
            eventLabel: `"${req_str}" @${res_time} ${err.toString()}`
          });
        }
      })
      .then(() => {
        /*
         * done loading
         */
        if (typeof window === "object" && window.doneLoading) window.doneLoading("data");
      });
  });
}
