import React from "react";

const Haweet = ({ haweetObj, isOwner }) => {
  return (
    <div>
      <h4> {haweetObj.text} </h4>
      {/* 작성자일 경우에만 tweet 편집 및 삭제 가능 */}
      {isOwner && (
        <>
          <button>delete haweet</button>
          <button>edit haweet</button>
        </>
      )}
    </div>
  );
};

export default Haweet;
