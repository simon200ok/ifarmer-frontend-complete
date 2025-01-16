import { useEffect, useState } from "react";
import "./PopularPosts.css";

function PopularPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const calculateReadTime = (content) => {
    const words = content.split(" ").length;
    const readTime = Math.ceil(words / 200);
    return `${readTime} min read`;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    fetch("http://localhost:8080/api/v1/posts/popularPosts", {
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
      <div className="popular-posts">
        <h6>Popular Posts</h6>
        {posts.length > 0 ? (
          posts.slice(0, 3).map((post) => (
            <div key={post.id} className="popular-post">
              <div className="popular-header">
                <h1>{post.title}</h1>
                <img src={post.image} alt={post.title} />
              </div>
              <p>{calculateReadTime(post.content)}</p>
              <p>{post.content}</p>
              <div className="popular-left-head">
                <div className="popular-left">
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

export default PopularPosts;
