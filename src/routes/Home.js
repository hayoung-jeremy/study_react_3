// main page

import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [haweet, setHaweet] = useState("");
  const [haweets, setHaweets] = useState([]);
  const getHaweets = async () => {
    const dbHaweets = await dbService.collection("haweets").get();
    dbHaweets.forEach((document) => {
      const haweetObject = {
        ...document.data(),
        id: document.id,
      };
      setHaweets((prev) => [haweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getHaweets();
  }, []);
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
  console.log(haweets);
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
          <div key={haweet.id}>
            <h4>{haweet.haweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
