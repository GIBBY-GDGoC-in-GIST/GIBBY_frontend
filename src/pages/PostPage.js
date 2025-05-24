
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostPage = ({ currentUser }) => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://3.25.186.102:3333/recruit');
      setPosts(res.data.data);
    } catch (err) {
      console.error('게시글 불러오기 실패:', err);
      setError('❌ 게시글을 불러오지 못했습니다.');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (postText.trim() === '') return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://3.25.186.102:3333/recruit',
        { text: postText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPostText('');
      setMessage('✅ 게시글이 작성되었습니다.');
      fetchPosts();
    } catch (err) {
      console.error('게시글 작성 실패:', err);
      setMessage('❌ 게시글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-400 to-blue-300 p-6">
    
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Post</h1>
        <p className="text-gray-600 text-center mb-4">Welcome, {currentUser?.email}!</p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Write your post..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handlePost}
            className="w-full p-2 bg-gray-500 text-white rounded"
          >
            Post
          </button>
        </div>

        {message && <p className="mt-4 text-blue-600">{message}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">📌 Postings</h2>
          {posts.length === 0 ? (
            <p className="text-gray-600">There are no postings yet.</p>
          ) : (
            <ul>
              {posts.map((post, index) => (
                <li key={index} className="bg-gray-200 p-2 rounded mb-2">
                  <strong>{post.author}:</strong> {post.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
