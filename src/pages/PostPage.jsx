import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PostPage.css";
import axios from "axios";
import dayjs from "dayjs";

// Importing custom icons from assets folder
import likeWhiteIcon from "../assets/like-white.png";
import likeRedIcon from "../assets/like-red.png";
import commentIcon from "../assets/comment.png";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);

  const { postId } = useParams();

  const POST_ENDPOINT = `http://localhost:8080/api/v1/posts/${postId}`;
  const LIKE_ENDPOINT = `http://localhost:8080/api/v1/posts/${postId}/likes`;
  const ADD_COMMENT_ENDPOINT = `http://localhost:8080/api/v1/posts/${postId}/comments`;

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const postResponse = await axios.get(POST_ENDPOINT, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(postResponse.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [POST_ENDPOINT]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        LIKE_ENDPOINT,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost((prevPost) => ({
        ...prevPost,
        liked: !prevPost.liked, // Toggle like state
        likes: prevPost.liked ? prevPost.likes - 1 : prevPost.likes + 1,
      }));
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        ADD_COMMENT_ENDPOINT,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");

      const postResponse = await axios.get(POST_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPost(postResponse.data);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const toggleCommentInput = () => {
    setShowCommentInput((prevState) => !prevState);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-page">
      <div className="post-image-container">
        <img src={post.postImage} alt={post.title} className="post-image" />
      </div>

      <div className="post-details-container">
        <div className="post-info">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-header1">
            <img
              src={post.postOwnerPicture || "default-profile.png"}
              alt="Profile"
              className="post-profile-picture"
            />
            <h5>{post.postOwner}</h5>
          </div>
          <p className="post-stats">
            {post.likes} likes · {post.commentCount} comments
          </p>
        </div>

        <div className="post-actions">
          <div className="like-button" onClick={handleLike}>
            <img
              src={post.liked ? likeRedIcon : likeWhiteIcon}
              alt="Like Icon"
              className="like-icon"
            />
          </div>
          <div className="add-comment-button" onClick={toggleCommentInput}>
            <img src={commentIcon} alt="Comment Icon" className="comment-icon" />
          </div>
        </div>
      </div>

      <div className="post-content">{post.content}</div>

      {showCommentInput && (
        <>
          <textarea
            className="comment-input"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button className="add-comment-button" onClick={handleAddComment}>
            Submit Comment
          </button>
        </>
      )}

      <div className="comments">
        <h2>Comments</h2>
        {post.comments.slice().reverse().map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <img
                src={comment.profilePicture || "default-profile.png"}
                alt="Profile"
                className="comment-profile-picture"
              />
              <div className="comment-author-details">
                <h5 className="comment-author">{comment.userName}</h5>
              </div>
            </div>
            <p className="comment-content">{comment.content}</p>
            <p className="comment-date">
              {dayjs(comment.createdAt).format("MMMM D, YYYY h:mm A")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
