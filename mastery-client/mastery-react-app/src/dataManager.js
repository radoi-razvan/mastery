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
  // Courses requests
  getCourses: async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL_BACKEND}/courses`, {
        withCredentials: true,
      })
      .catch((e) => console.error(e));
    return response.data;
  },
  getCourse: async (courseId) => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}`, {
        withCredentials: true,
      })
      .catch((e) => console.error(e));
    return response.data;
  },
  postCourse: async (formData) => {
    const response = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses`,
        {
          name: formData.name,
          category: formData.category,
          price: formData.price,
          description: formData.description,
          startingDate: formData.startingDate,
        },
        { withCredentials: true }
      )
      .catch((e) => console.error(e));
    return response;
  },
  putCourse: async function (courseId, formData) {
    const response = await axios
      .put(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}`,
        {
          name: formData.name,
          category: formData.category,
          price: formData.price,
          description: formData.description,
          startingDate: formData.startingDate,
        },
        { withCredentials: true }
      )
      .catch((e) => console.error(e));
    return response;
  },
  deleteCourse: async function (courseId) {
    const response = await axios
      .delete(`${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}`, {
        withCredentials: true,
      })
      .catch((e) => console.error(e));
    return response;
  },
  // Testimonials requests
  getTestimonials: async (courseId) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}/testimonials`,
        {
          withCredentials: true,
        }
      )
      .catch((e) => console.error(e));
    return response.data;
  },
  getTestimonial: async (courseId, testimonialId) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}/testimonials/${testimonialId}`,
        {
          withCredentials: true,
        }
      )
      .catch((e) => console.error(e));
    return response.data;
  },
  postTestimonial: async (courseId, formData) => {
    const response = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}/testimonials`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          comment: formData.comment,
          rating: formData.rating,
        },
        { withCredentials: true }
      )
      .catch((e) => console.error(e));
    return response;
  },
  putTestimonial: async function (courseId, testimonialId, formData) {
    const response = await axios
      .put(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}/testimonials/${testimonialId}`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          comment: formData.comment,
          rating: formData.rating,
        },
        { withCredentials: true }
      )
      .catch((e) => console.error(e));
    return response;
  },
  deleteTestimonial: async function (courseId, testimonialId) {
    const response = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}/testimonials/${testimonialId}`,
        {
          withCredentials: true,
        }
      )
      .catch((e) => console.error(e));
    return response;
  },
  // Weeks requests
  getWeeks: async (courseId) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}/weeks`,
        {
          withCredentials: true,
        }
      )
      .catch((e) => console.error(e));
    return response.data;
  },
  getWeek: async (courseId, weekId) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}/weeks/${weekId}`,
        {
          withCredentials: true,
        }
      )
      .catch((e) => console.error(e));
    return response.data;
  },
  postWeek: async (courseId, formData) => {
    const response = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}/weeks`,
        {
          number: formData.number,
          videoLink: formData.videoLink,
          homeworkTitle: formData.homeworkTitle,
          consultationCallLink: formData.consultationCallLink,
        },
        { withCredentials: true }
      )
      .catch((e) => console.error(e));
    return response;
  },
  putWeek: async function (courseId, weekId, formData) {
    const response = await axios
      .put(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}/weeks/${weekId}`,
        {
          number: formData.number,
          videoLink: formData.videoLink,
          homeworkTitle: formData.homeworkTitle,
          consultationCallLink: formData.consultationCallLink,
        },
        { withCredentials: true }
      )
      .catch((e) => console.error(e));
    return response;
  },
  deleteWeek: async function (courseId, weekId) {
    const response = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}/weeks/${weekId}`,
        {
          withCredentials: true,
        }
      )
      .catch((e) => console.error(e));
    return response;
  },
  // Clients requests
  getTotalClients: async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL_BACKEND}/courses/total/clients`, {
        withCredentials: true,
      })
      .catch((e) => console.error(e));
    return response.data;
  },
  joinCourse: async (courseId, formData) => {
    const response = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}/clients`,
        {
          lastYearIncomeRange: formData.lastYearIncomeRange,
          jobTitle: formData.jobTitle,
        },
        { withCredentials: true }
      )
      .catch((e) => console.error(e));
    return response;
  },
  leaveCourse: async function (courseId) {
    const response = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/${courseId}/clients`,
        {
          withCredentials: true,
        }
      )
      .catch((e) => console.error(e));
    return response;
  },
  getAttendedCourses: async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL_BACKEND}/courses/clients`, {
        withCredentials: true,
      })
      .catch((e) => console.error(e));
    return response.data;
  },
  getCourseClientsDetails: async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/clients/details`,
        {
          withCredentials: true,
        }
      )
      .catch((e) => console.error(e));
    return response.data;
  },
  getCourseMentor: async (menotrId) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/courses/mentor/${menotrId}`,
        {
          withCredentials: true,
        }
      )
      .catch((e) => console.error(e));
    return response.data;
  },
};
