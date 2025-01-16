import { useEffect, useState } from "react";

import "./Post.css";

function Post() {
  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Night";
    }
  };

  const [firstName, setFirstName] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const calculateReadTime = (content) => {
    const words = content.split(" ").length;
    const readTime = Math.ceil(words / 200);
    return `${readTime} min read`;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedFirstName = localStorage.getItem("firstName");

    setFirstName(storedFirstName);

    if (!token) {
      console.error("No token found");
      return;
    }

    fetch("http://localhost:8080/api/v1/posts/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Expected an array but got:", data);
          setPosts([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="greeting">
        <h1>
          {getCurrentGreeting()}, {firstName}
        </h1>
      </div>
      <div className="posts">
        <h6>My Posts</h6>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <h1>{post.title}</h1>
                <img src={post.image} alt={post.title} />
              </div>
              <p>{post.content}</p>
              <div className="post-left-head">
                <div className="post-left">
                  <h1>{calculateReadTime(post.content)}</h1>
                  <h2>{post.comments} comments</h2>
                  <h3>{post.likes} Like(s)</h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>
    </div>
  );
}

export default Post;
