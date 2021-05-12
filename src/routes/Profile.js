// showing profile page

import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyHaweets = async () => {
    const haweets = await dbService
      .collection("haweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(haweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyHaweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
