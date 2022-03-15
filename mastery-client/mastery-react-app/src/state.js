import { atom } from "jotai";
import { dataManager } from "./dataManager";

// export const STATE = {
//   GYM_LIST: atom([]),
//   GYMS: atom(
//     (get) => get(STATE.GYM_LIST),
//     async (get, set) => {
//       // const gyms = await dataHandler.getGyms();
//       // set(STATE.GYM_LIST, gyms.data);
//       // set(ownedGymsSetter);
//     }
//   ),

//   MY_GYMS_CHECK: atom(false),
//   GYMS_CHECKER: atom(
//     (get) => get(STATE.MY_GYMS_CHECK),
//     (get, set, value) => {
//       set(STATE.MY_GYMS_CHECK, value);
//     }
//   ),
// };

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
