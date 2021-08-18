import axios from "axios";
import { isEmpty } from "lodash";
import * as _ from "lodash";
import UserStore from "../store/user-store";

export default class AuthenticatedApiClient {
  static instance;

  constructor() {
    //EMPTY
    this.userStore = UserStore.getInstance();
  }

  static getInstance() {
    if (!AuthenticatedApiClient.instance) {
      AuthenticatedApiClient.instance = new AuthenticatedApiClient();
    }

    return AuthenticatedApiClient.instance;
  }

  async get(url, options = {}) {
    url = this.addQueryParamsToUrl(url, options);
    const authorization = await this.getCurrentUserAuthorization();
    const data = await axios.get(url, {
      headers: {
        Authorization: authorization,
      },
    });
    return data.data;
  }

  async post(url, body, options) {
    url = this.addQueryParamsToUrl(url, options);

    const authorization = await this.getCurrentUserAuthorization();

    return (
      await axios.post(url, body, {
        headers: {
          Authorization: authorization,
        },
      })
    ).data;
  }

  async put(url, body, options) {
    url = this.addQueryParamsToUrl(url, options);

    const authorization = await this.getCurrentUserAuthorization();

    return (
      await axios.put(url, body, {
        headers: {
          Authorization: authorization,
        },
      })
    ).data;
  }

  async putFormData(url, body, options) {
    url = this.addQueryParamsToUrl(url, options);

    const authorization = await this.getCurrentUserAuthorization();

    return (
      await axios.put(url, body, {
        headers: {
          Authorization: authorization,
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }

  async patch(url, body, options) {
    url = this.addQueryParamsToUrl(url, options);

    const authorization = await this.getCurrentUserAuthorization();

    return (
      await axios.patch(url, body, {
        headers: {
          Authorization: authorization,
        },
      })
    ).data;
  }

  async delete(url, body, options) {
    url = this.addQueryParamsToUrl(url, options);
    const authorization = await this.getCurrentUserAuthorization();
    return (
      await axios.delete(url, {
        headers: {
          Authorization: authorization,
        },
        data: body,
      })
    ).data;
  }

  objectToQueryString(options = {}) {
    const cleanedObject = this.cleanObject(options);
    return Object.keys(cleanedObject)
      .map((key) => {
        if (_.isArray(cleanedObject[key])) {
          return cleanedObject[key].map((v) => `${key}=${v}`).join("&");
        } else {
          return `${key}=${cleanedObject[key]}`;
        }
      })
      .join("&");
  }

  addQueryParamsToUrl(url, options) {
    console.log("options", options);
    return !isEmpty(options)
      ? url.trim() + "?" + this.objectToQueryString(options)
      : url;
  }

  getCurrentUserAuthorization() {
    const currentUser = this.userStore.authUser;
    console.log("currentUser", this.userStore.authUser);
    if (currentUser) {
      const token = currentUser.accessToken;
      return `Bearer ${token}`.trim();
    } else {
      return "";
    }
  }
  cleanObject(obj) {
    return _.pickBy(obj, _.identity);
  }
}
