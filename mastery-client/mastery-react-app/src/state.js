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
