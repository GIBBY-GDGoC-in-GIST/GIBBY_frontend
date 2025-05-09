import React, { useState } from 'react';

const PostPage = ({ currentUser }) => {
  const [postText, setPostText] = useState("");  // 입력값 저장
  const [posts, setPosts] = useState([]);        // 게시물 목록 저장

  const handlePost = () => {
    if (postText.trim() === "") return; // 빈 값 방지

    // 새 게시물 추가
    setPosts([...posts, { text: postText, author: currentUser?.email }]);

    setPostText(""); // 입력값 초기화
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Post</h1>
        <p className="text-gra
        y-600 text-center">Welcome, {currentUser?.email}!</p>
        
        <div className="mt-6">
          <input 
            type="text"
            placeholder="Writing post..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button 
            onClick={handlePost}
            className="w-full p-2 bg-blue-500 text-white rounded">
            Post
          </button>
        </div>

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
