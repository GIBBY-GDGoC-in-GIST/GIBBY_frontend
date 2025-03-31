import React from 'react';

function HobbyDetails({ hobby }) {
  return (
    <div>
      <h2>{hobby.name}</h2>
      <p>{hobby.description}</p>
      <button>이 취미에 대해 토론하기</button>
    </div>
  );
}

export default HobbyDetails;
