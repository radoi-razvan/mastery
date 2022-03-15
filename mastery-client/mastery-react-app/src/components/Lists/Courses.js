import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import { Course } from "../Course";
// import { STATE, userSetter, loggedInSetter, ownedGymsSetter } from "../../state";
// import { useAtom } from "jotai";
// import { useAtomValue, useUpdateAtom } from "jotai/utils";

// export const Courses = () => {
//   const [gyms, setGyms] = useAtom(STATE.GYMS);
//   const [user] = useAtom(userSetter);
//   const [loggedIn] = useAtom(loggedInSetter);
//   const ownedGyms = useAtomValue(ownedGymsSetter);
//   const setTotalGymsMembers = useUpdateAtom(STATE.GYMS_MEMBERS);
//   const [myGymsCheck, setMyGymsCheck] = useAtom(STATE.GYMS_CHECKER);

//   useEffect(() => {
//     setGyms();
//     setTotalGymsMembers();
//   }, []);

//   const setCheckText = (isChecked) => {
//     const label = document.getElementById("checkboxLabel");
//     label.innerHTML = isChecked ? `My <em>Gyms</em>` : `All <em>Gyms</em>`;
//   };

//   return (
//     <div id="trainers">
//       {loggedIn && "Gyms" in user ? (
//         <>
//           <NavLink className="btn-1 btn-fixed-left" exact to="/gyms/add">
//             Add <em>Gym</em>
//           </NavLink>
//           <div className="area-fixed-right">
//             <input
//               type="checkbox"
//               className="btn-check"
//               id="btn-check-outlined"
//               autoComplete="off"
//               onClick={(e) => {
//                 setMyGymsCheck(e.target.checked);
//                 setCheckText(e.target.checked);
//               }}
//             />
//             <label
//               className="btn btn-outline-primary styled-outline-btn"
//               htmlFor="btn-check-outlined"
//               id="checkboxLabel"
//             >
//               All <em>Gyms</em>
//             </label>
//           </div>
//         </>
//       ) : (
//         ""
//       )}

//       {myGymsCheck
//         ? gyms
//             .filter((gym) => ownedGyms.includes(gym.GymId))
//             .map((gym, index) => (
//               <Gym
//                 name={gym.Name}
//                 address={gym.Address}
//                 description={gym.Description}
//                 gymId={gym.GymId}
//                 key={index}
//               />
//             ))
//         : gyms.map((gym, index) => (
//             <Gym
//               name={gym.Name}
//               address={gym.Address}
//               description={gym.Description}
//               gymId={gym.GymId}
//               key={index}
//             />
//           ))}
//     </div>
//   );
// };




export const Courses = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loader = async () => {
      const req = await fetch(process.env.REACT_APP_REMOTE_URL + `/posts`);
      if (req.ok) {
        const res = await req.json();
        setPosts(res);
      }
    };

    loader();
  }, []);

  return (
    <main className="container my-3">
      {posts.length ? (
        <div className="row">
          {posts.map((p, i) => (
            <div className="col" key={i}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{p.title}</h5>
                  <Link to={`/course/${i + 1}`} className="btn btn-primary">
                    Go somewhere
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        "There are no posts"
      )}
    </main>
  );
};
