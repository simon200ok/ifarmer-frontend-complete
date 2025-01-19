import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PostPage.css';
import axios from 'axios';
import dayjs from 'dayjs'; // Import dayjs for date formatting

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false); // Track visibility of comment input box

  const { postId } = useParams(); // Get postId from route parameters

  const POST_ENDPOINT = `http://localhost:8080/api/v1/posts/${postId}`;
  const LIKE_ENDPOINT = `http://localhost:8080/api/v1/posts/${postId}/likes`;
  const ADD_COMMENT_ENDPOINT = `http://localhost:8080/api/v1/posts/${postId}/comments`;

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const postResponse = await axios.get(POST_ENDPOINT, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(postResponse.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [POST_ENDPOINT]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        LIKE_ENDPOINT,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost({ ...post, likes: post.likes + 1 });
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        ADD_COMMENT_ENDPOINT,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment('');

      // Refresh post details to update comments
      const postResponse = await axios.get(POST_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPost(postResponse.data);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Toggle comment input visibility
  const toggleCommentInput = () => {
    setShowCommentInput(prevState => !prevState); // Toggle the state
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-page">
      <div className="post">
        <img src={post.imageUrl} alt={post.title} className="post-image" />
        <h1 className="post-title">{post.title}</h1>
        <p className="post-author">By {post.author} · {dayjs(post.timeCreated).format('MMMM D, YYYY h:mm A')}</p>
        <p className="post-details">{post.likes} likes · {post.commentCount} comments</p>
        <p className="post-content">{post.content}</p>
        <button className="like-button" onClick={handleLike}>Like</button>
      </div>

      {/* Button to toggle comment input */}
      <button className="add-comment-button" onClick={toggleCommentInput}>
        {showCommentInput ? 'Cancel' : 'Write a Comment'}
      </button>

      {/* Comment input box */}
      {showCommentInput && (
        <>
          <textarea
            className="comment-input"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button className="add-comment-button" onClick={handleAddComment}>Submit Comment</button>
        </>
      )}

      {/* Comments Section */}
      <div className="text1"><h2>Comments</h2></div>
      <div className="comments">
        {post.comments.slice().reverse().map((comment) => (
          <div key={comment.id} className="comment">
            <p className="comment-author">{comment.author}</p>
            <h1 className="comment-content">{comment.content}</h1>
            <p className="comment-date">{dayjs(comment.createdAt).format('MMMM D, YYYY h:mm A')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
