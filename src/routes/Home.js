// main page

import Haweet from "components/Haweet";
import HaweetFactory from "components/HaweetFacotry";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
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

  return (
    <div className="container">
      <HaweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
