import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Course } from "../Course";
import { STATE } from "../../state";
import { useAtom } from "jotai";


export const Courses = () => {
  const [courses, setCourses] = useAtom(STATE.COURSES);

  useEffect(() => {
    setCourses();
  }, []);

  return (
    <>
      {courses.length ? (
        <div className="container-margin-top">
            {courses.map((course, index) => (
              <Course
                name={course.name}
                category={course.category}
                price={course.price}
                description={course.description}
                startingDate={course.startingDate}
                mentorId={course.mentorId}
                courseId={course.courseId}
                key={index}
              />
            ))}
          </div>
      ) : (
        <div className="card">
          <div className="card-container">
            <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4 txt-main-color form-txt-color">
              There are no courses
            </p>
          </div>
        </div>
      )}
    </>
  );
};

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

// export const Courses = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const loader = async () => {
//       const req = await fetch(process.env.REACT_APP_REMOTE_URL + `/posts`);
//       if (req.ok) {
//         const res = await req.json();
//         setPosts(res);
//       }
//     };

//     loader();
//   }, []);

//   return (
//     <main className="container my-3">
//       {posts.length ? (
//         <div className="row">
//           {posts.map((p, i) => (
//             <div className="col" key={i}>
//               <div className="card">
//                 <div className="card-body">
//                   <h5 className="card-title">{p.title}</h5>
//                   <Link to={`/course/${i + 1}`} className="btn btn-primary">
//                     Go somewhere
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         "There are no posts"
//       )}
//     </main>
//   );
// };
