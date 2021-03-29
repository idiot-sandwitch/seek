import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../features/axiosSetup";

import Container from "react-bootstrap/esm/Container";

const UserProfile = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const [userInfo, setUserInfo] = useState(user);

  const getUserInfo = async () => {
    const userRes = await axios({
      method: "GET",
      url: "api/users/me",
      headers: { "x-auth-token": localStorage.getItem(`token`) },
    });
    setUserInfo(userRes.data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  //show everything
  //if click edit profile, show edit profile component
  return (
    <Container style={{ marginTop: "4rem" }}>
      <Container className="profileCard">
        <h3>Edit Profile</h3>
        <h1>User Profile</h1>
        <div>name</div>
        <div>email</div>
        <div>password</div>
        <div>avatar</div>
        <div>isVerified</div>
      </Container>
    </Container>
  );
};

export default UserProfile;
