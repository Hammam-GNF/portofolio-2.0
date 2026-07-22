import axios from "axios";

import {
    buildContactFormData,
} from "../utils";

const FORM_URL =
  "https://formsubmit.co/hammamgonjil@gmail.com";


class ContactService {


  async sendMessage({
    name,
    email,
    message
  }) {


    const formData =
      buildContactFormData({
          name,
          email,
          message,
      });


    return axios.post(
      FORM_URL,
      formData,
      {
        headers:{
          "Content-Type":
          "multipart/form-data"
        }
      }
    );

  }

}


export default new ContactService();
