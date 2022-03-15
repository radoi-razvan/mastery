import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Course = () => {
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  const [author, setAuthor] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const loader = async () => {
      const req = await fetch(
        process.env.REACT_APP_REMOTE_URL + `/posts/` + id
      );
      if (req.ok) {
        const res = await req.json();
        setPost(res);

        const auth = res.userId;
        const req2 = await fetch(
          process.env.REACT_APP_REMOTE_URL + `/users/` + auth
        );

        if (req2.ok) {
          const res = await req2.json();
          setAuthor(res);
        }
      }
    };

    loader();
  }, []);

  return (
    <main className="container my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          {author && (
            <h6 className="card-subtitle mb-2 text-muted">
              A post by {author.name}
            </h6>
          )}
          {post.body.split("\n").map((p, i) => (
            <p className="card-text" key={i}>
              {p}
            </p>
          ))}
        </div>
      </div>
      <p className="mt-3">
        <Link to="/posts">Back to the posts</Link>
      </p>
    </main>
  );
};
