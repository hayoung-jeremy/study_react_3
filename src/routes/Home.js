// main page

import Haweet from "components/Haweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [haweet, setHaweet] = useState("");
  const [haweets, setHaweets] = useState([]);
  useEffect(() => {
    dbService.collection("haweets").onSnapshot((snapshot) => {
      const haweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHaweets(haweetArray);
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
        <input type="submit" value="Haweet" />
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
