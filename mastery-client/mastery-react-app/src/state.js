import { atom } from "jotai";
import { dataManager } from "./dataManager";

export const STATE = {
  COURSES_LIST: atom([]),
  COURSES: atom(
    (get) => get(STATE.COURSES_LIST),
    async (get, set) => {
      const courses = await dataManager.getCourses();
      set(STATE.COURSES_LIST, courses);
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
};

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
