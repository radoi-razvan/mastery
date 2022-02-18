import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Posts = () => {
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
                  <Link to={`/post/${i + 1}`} className="btn btn-primary">
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
