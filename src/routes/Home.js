// main page

import Haweet from "components/Haweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [haweet, setHaweet] = useState("");
  const [haweets, setHaweets] = useState([]);
  const [attachment, setAttachment] = useState();
  useEffect(() => {
    dbService.collection("haweets").onSnapshot((snapshot) => {
      const haweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHaweets(haweetArray);
      const reader = new FileReader();
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("haweets").add({
      text: haweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setHaweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setHaweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment(null);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={haweet}
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Haweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {haweets.map((haweet) => (
          <Haweet
            key={haweet.id}
            haweetObj={haweet}
            isOwner={haweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
