import axios from "axios";

export const dataManager = {
  // Authentication requests
  postRegister: async (regData) => {
    const response = await axios
      .post(`${process.env.REACT_APP_BASE_URL_BACKEND}/register`, {
        firstName: regData.firstName,
        lastName: regData.lastName,
        addressTest: regData.addressTest,
        testField: regData.testField,
        role: regData.role,
        email: regData.email,
        password: regData.password,
        userRole: regData.userRole,
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
    console.log(response.data);
    return response;
  },
  postLogout: async () => {
    const response = await axios
    .post(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/account/logout`,
      "",
      {
        withCredentials: true,
      }
    )
    .catch((e) => console.error(e));
    console.log(response.data);
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
