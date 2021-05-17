import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Haweet = ({ haweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newHaweet, setNewHaweet] = useState(haweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure want to delete this hawwet?");
    if (ok) {
      //delete
      await dbService.doc(`haweets/${haweetObj.id}`).delete();
      await storageService.refFromURL(haweetObj.attachmentUrl).delete();
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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              value={newHaweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Haweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4> {haweetObj.text} </h4>
          {haweetObj.attachmentUrl && (
            <img src={haweetObj.attachmentUrl} alt="" />
          )}
          {/* 작성자일 경우에만 tweet 편집 및 삭제 가능 */}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Haweet;
