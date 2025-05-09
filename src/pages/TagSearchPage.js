import React, { useState } from "react";
import axios from "axios";

function TagSearchPage() {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get("https://api.newbie.gistory.me/api/tags", {
        params: { keyword: keyword }
      });
      setTags(res.data.data);
    } catch (err) {
      console.error("태그 검색 실패:", err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">태그 검색</h2>
      <input
        type="text"
        placeholder="태그를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button onClick={handleSearch} className="w-full bg-blue-500 text-white py-2 rounded">
        검색
      </button>

      <ul className="mt-4">
        {tags.map(tag => (
          <li key={tag.id} className="border-b py-1">{tag.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TagSearchPage;
