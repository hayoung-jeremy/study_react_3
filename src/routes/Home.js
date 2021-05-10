// main page

import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
  const [haweet, setHaweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("haweets").add({
      haweet: haweet,
      createdAt: Date.now(),
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
    </div>
  );
};

export default Home;
