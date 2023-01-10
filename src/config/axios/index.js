import axios from "axios";

const client = axios.create({
  timeout: 1000 * 35,
});

export const requestInstance = ({ ...options }) => {
  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error.response) {
      if (error?.response?.status === 401) {
        // sessionStorage.clear();
        // window.location = REACT_APP_AUTH_REDIRECT_URL;
      } else if (error?.response?.status === 403) {
        // const alertPanel = document.getElementById("alert-root");
        // if (alertPanel) {
        //   alertPanel.style.display = "flex";
        // }
      }
    }
    throw error;
  };

  return client(options).then(onSuccess).catch(onError);
};
