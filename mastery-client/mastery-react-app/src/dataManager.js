import axios from "axios";

// const authAxios = axios.create({
//   baseURL: `${process.env.REACT_APP_BASE_URL_BACKEND}`,
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// });

const axiosConfig = (accessToken) => {
  const authAxios = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL_BACKEND}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return authAxios;
};

// axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem("jwt");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

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
        }
        // {
        //   withCredentials: true,
        // }
      )
      .catch((e) => console.error(e));
    console.log(response.data);
    return response;
  },
  postLogout: async (token) => {
    //console.log(localStorage.getItem("user").Token);
    const authAxios = axiosConfig(token);
    const response = await authAxios
      .post(`/account/logout`, "", 
      // {
      //   withCredentials: true,
      // }
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
