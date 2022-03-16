import React from "react";
import { Link } from "react-router-dom";
import noImgPlaceholder from "../img/NoImagePlaceholder.jpg";

export const Course = ({
  name,
  category,
  price,
  description,
  startingDate,
  mentorId,
  courseId,
}) => {
  return (
    <>
      <div className="card">
        <div className="card-container">
          <p>{name}</p>
          <p>{category}</p>
          <p>$ {price}</p>
          <p>{description}</p>
          <p>{startingDate.split("T")[0]}</p>
          <p>{mentorId}</p>
          <p>{courseId}</p>
        </div>
      </div>

      <div className="courses-card mb-3">
        <div className="row no-gutters">
          <div className=" d-inline-flex">
            <img
              src={noImgPlaceholder}
              className="card-img courses-img"
              alt="no img"
            />
            {/* <img src="Error.src" onerror="this.src='fallback-img.jpg'"/> */}
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">
                <small className="text-muted">Category: {category}</small>
              </p>
              <p className="card-text">
                <small className="text-muted">Starting Date: {startingDate.split("T")[0]}</small>
              </p>
              <p className="card-text">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

//   return (
//     <main className="container my-3">
//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">{post.title}</h5>
//           {author && (
//             <h6 className="card-subtitle mb-2 text-muted">
//               A post by {author.name}
//             </h6>
//           )}
//           {post.body.split("\n").map((p, i) => (
//             <p className="card-text" key={i}>
//               {p}
//             </p>
//           ))}
//         </div>
//       </div>
//       <p className="mt-3">
//         <Link to="/posts">Back to the posts</Link>
//       </p>
//     </main>
//   );
// };
