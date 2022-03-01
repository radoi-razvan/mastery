import { atom } from "jotai";
import { dataManager } from "./dataManager";

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
