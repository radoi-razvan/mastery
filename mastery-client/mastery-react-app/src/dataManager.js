import axios from "axios";

export const dataManager = {
  // Authentication requests
  postRegister: async (registerData) => {
    const response = await axios
      .post(`${process.env.REACT_APP_BASE_URL_BACKEND}/account/register`, {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        password: registerData.password,
        role: registerData.role,
        country: registerData.country,
        city: registerData.city,
        phoneNumber: registerData.phoneNumber,
      })
      .catch((e) => console.error(e));
    return response;
  },
  postLogin: async (logData) => {
    const response = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/account/login`,
        {
          email: logData.email,
          password: logData.password,
        },
        {
          withCredentials: true,
        }
      )
      .catch((e) => console.error(e));
    return response;
  },
  postLogout: async () => {
    const response = await axios
      .post(`${process.env.REACT_APP_BASE_URL_BACKEND}/account/logout`, "", {
        withCredentials: true,
      })
      .catch((e) => console.error(e));
    return response;
  },
  getUser: async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL_BACKEND}/account/user`, {
        withCredentials: true,
      })
      .catch((e) => console.error(e));
    return response.data;
  },
};
