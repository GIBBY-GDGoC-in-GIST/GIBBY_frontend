import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostPage = ({ currentUser }) => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');  // ✅ 사용자 이름 state 추가

  // ✅ 사용자 프로필(name) 가져오기
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Profile fetch token:', token);  // ✅ 토큰 확인용 추가!
      const res = await axios.get('http://3.25.186.102:3333/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ 프로필 정보:", res.data);
      setUserName(res.data.name || '');
    } catch (err) {
      console.error('프로필 조회 실패:', err.response?.data || err.message || err);
      setUserName('');  // 실패 시 빈 값
    }
  };

  // ✅ 게시글 목록 가져오기
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Current token:', token);

      const res = await axios.get('http://3.25.186.102:3333/recruit', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(res.data || []);
    } catch (err) {
      console.error('게시글 불러오기 실패:', err.response?.data || err.message || err);
      setError('❌ 게시글을 불러오지 못했습니다.');
    }
  };

  // ✅ mount 시 프로필 + 게시글 불러오기
  useEffect(() => {
    fetchUserProfile();
    fetchPosts();
  }, []);

  // ✅ 게시글 작성
  const handlePost = async () => {
    if (postText.trim() === '') return;

    try {
      const token = localStorage.getItem('token');
      console.log('Current token:', token);

      await axios.post(
        'http://3.25.186.102:3333/recruit',
        {
          sport: 'Soccer',
          description: postText,
        },
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
      console.error('게시글 작성 실패:', err.response?.data || err.message || err);
      setMessage('❌ 게시글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-400 to-blue-300 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Post</h1>

        {/* ✅ Welcome 옆에 사용자 이름 표시 */}
        <p className="text-gray-600 text-center mb-4">
          Welcome{userName ? `, ${userName}` : ''}!
        </p>

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
        {error && <p className="mt-4 text-red-600">{error}</p>}

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
          {posts?.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">No posts yet!</p>
          ) : (
            posts?.map((post, index) => (
              <div
                key={index}
                className="border p-2 rounded mb-2 bg-gray-100 shadow-sm"
              >
                <p>{post?.description || 'No content'}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
