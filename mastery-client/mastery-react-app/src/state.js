import { atom } from "jotai";
import { dataManager } from "./dataManager";

export const STATE = {
  COURSES_LIST: atom([]),
  COURSES: atom(
    (get) => get(STATE.COURSES_LIST),
    async (get, set) => {
      const courses = await dataManager.getCourses();
      set(STATE.COURSES_LIST, courses);
      set(attendedCoursesSetter);
    }
  ),
  WEEKS_LIST: atom([]),
  WEEKS: atom(
    (get) => get(STATE.WEEKS_LIST),
    async (get, set, value) => {
      const weeks = await dataManager.getWeeks(value);
      set(STATE.WEEKS_LIST, weeks);
    }
  ),
  TESTIMONIALS_LIST: atom([]),
  TESTIMONIALS: atom(
    (get) => get(STATE.TESTIMONIALS_LIST),
    async (get, set, value) => {
      const testimonials = await dataManager.getTestimonials(value);
      set(STATE.TESTIMONIALS_LIST, testimonials);
    }
  ),
  TOTAL_COURSES_MEMBERS: atom([]),
  COURSES_MEMBERS: atom(
    (get) => get(STATE.TOTAL_COURSES_MEMBERS),
    async (get, set) => {
      const courses_members = await dataManager.getTotalClients();
      set(STATE.TOTAL_COURSES_MEMBERS, courses_members);
    }
  ),
  CLIENTS_LIST: atom([]),
  CLIENTS: atom(
    (get) => get(STATE.CLIENTS_LIST),
    async (get, set) => {
      const clients = await dataManager.getClientsDetails();
      set(STATE.CLIENTS_LIST, clients);
    }
  ),
  MENTORS_LIST: atom([]),
  MENTORS: atom(
    (get) => get(STATE.MENTORS_LIST),
    async (get, set) => {
      const mentors = await dataManager.getMentors();
      set(STATE.MENTORS_LIST, mentors);
    }
  ),
};

export const ATTENDED_COURSES = atom([]);
export const attendedCoursesSetter = atom(
  (get) => get(ATTENDED_COURSES),
  async (get, set) => {
    const attendedCourses = await dataManager.getAttendedCourses();
    if (attendedCourses) {
      set(
        ATTENDED_COURSES,
        attendedCourses.map((c) => c.courseId)
      );
    } else {
      set(ATTENDED_COURSES, []);
    }
  }
);

export const USER = atom({});
export const userSetter = atom(
  (get) => get(USER),
  async (get, set) => {
    const user = await dataManager.getUser();
    if (user) {
      set(USER, user);
    } else {
      set(USER, {});
    }
  }
);
