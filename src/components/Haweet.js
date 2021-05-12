import { dbService } from "fbase";
import React, { useState } from "react";

const Haweet = ({ haweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newHaweet, setNewHaweet] = useState(haweetObj.text);

  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure want to delete this hawwet?");
    if (ok) {
      //delete
      dbService.doc(`haweets/${haweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewHaweet(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(haweetObj, newHaweet);
    dbService.doc(`haweets/${haweetObj.id}`).update({
      text: newHaweet,
    });
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  value={newHaweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Haweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4> {haweetObj.text} </h4>
          {haweetObj.attachmentUrl && (
            <img
              src={haweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt=""
            />
          )}
          {/* 작성자일 경우에만 tweet 편집 및 삭제 가능 */}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>delete haweet</button>
              <button onClick={toggleEditing}>edit haweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Haweet;
