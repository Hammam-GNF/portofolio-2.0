import axios from "axios";


const FORM_URL =
  "https://formsubmit.co/hammamgonjil@gmail.com";


class ContactService {


  async sendMessage({
    name,
    email,
    message
  }) {


    const formData = new FormData();


    formData.append(
      "name",
      name
    );

    formData.append(
      "email",
      email
    );

    formData.append(
      "message",
      message
    );


    formData.append(
      "_subject",
      "Pesan Baru dari Website Portfolio"
    );


    formData.append(
      "_captcha",
      "false"
    );


    formData.append(
      "_template",
      "table"
    );


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
