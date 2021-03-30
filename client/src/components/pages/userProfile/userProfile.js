import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../features/axiosSetup";
import { HashLink as Link } from "react-router-hash-link";

import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import Media from "react-bootstrap/esm/Media";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";

const UserProfile = ({ match }) => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const { profileId } = match.params;

  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    if (user._id === profileId) {
      const userRes = await axios({
        method: "GET",
        url: "api/users/me",
        headers: { "x-auth-token": localStorage.getItem(`token`) },
      });
      setUserInfo(userRes.data);
    } else {
      const userRes = await axios({
        method: "GET",
        url: `api/users/profile/${profileId}`,
        headers: { "x-auth-token": localStorage.getItem(`token`) },
      });
      setUserInfo(userRes.data);
    }
  };

  const displayProfileButtons = () => {
    if (profileId === user._id) {
      return (
        <div>
          <div className="userProfileField">
            <Link to="/resetPassword">
              <Button className="seekButton">Change Password</Button>
            </Link>
          </div>
          <div className="userProfileField">
            <Link to="/editProfile">
              <Button className="seekButton">Edit Profile</Button>
            </Link>
          </div>
        </div>
      );
    } else {
      return <div style={{ minHeight: "1rem" }}></div>;
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  //show everything
  //if click edit profile, show edit profile component
  return (
    <Container style={{ marginTop: "4rem" }}>
      <Media className="profileCard">
        <Col>
          <Image
            className="userAvatar"
            src={
              userInfo.avatar !== undefined
                ? userInfo.avatar
                : "./seekLogoSmall.png"
            }
            roundedCircle
          />
          <div style={{ paddingLeft: "1.5rem" }}>
            <div
              style={{
                textAlign: "left",
                display: "inline-block",
                minHeight: "1rem",
              }}
              className="userProfileField"
            >
              <i
                style={{
                  fontSize: "2rem",
                  marginRight: "1rem",
                }}
                className="fab fa-linkedin"
              />
              {"  "}
              <a
                href={
                  userInfo.linkedinUrl !== undefined && userInfo.linkedinUrl
                }
                style={{ display: "inline-block" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>Linkedin</h4>
              </a>
            </div>

            <div
              style={{
                textAlign: "left",
                display: "inline-block",
                minHeight: "1rem",
              }}
              className="userProfileField"
            >
              <i
                style={{ fontSize: "2rem", marginRight: "1rem" }}
                className="fab fa-github"
              />{" "}
              <a
                href={userInfo.githubUrl !== undefined && userInfo.githubUrl}
                style={{ display: "inline-block" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>Github</h4>
              </a>
            </div>
          </div>
        </Col>

        <Media.Body
          style={{
            display: "inline-block",
            minWidth: "80%",
            padding: "1rem",
            fontSize: "1.5rem",
            backgroundColor: "#292929",
            wordWrap: "break-word",
          }}
        >
          <h3 style={{ margin: "1rem", width: "900px !important" }}>
            {userInfo.name}
          </h3>
          <p
            style={{
              paddingLeft: "2rem",
              paddingRight: "2rem",
              minHeight: "10rem",
            }}
          >
            {userInfo.about !== undefined
              ? userInfo.about
              : `Nothing about ${userInfo.name}`}
          </p>
          <Col
            style={{
              marginTop: "2rem",
              justifyContent: "space-between",
              height: "100% !important",
            }}
          >
            <div className="userProfileField">
              <h4>Email</h4>
              {userInfo.email}
            </div>

            <div className="userProfileField">
              <h4>Sex</h4>
              {userInfo.sex}
            </div>

            <div className="userProfileField">
              <h4>Branch</h4>
              {userInfo.branch}
            </div>

            <div
              className="userProfileField"
              style={{ display: "inline-block" }}
            >
              {userInfo.isVerified ? (
                <span>
                  <i
                    style={{ color: "green" }}
                    className="far fa-check-circle"
                  />{" "}
                  Verified Account
                </span>
              ) : (
                <span>
                  <i style={{ color: "red" }} className="far fa-times-circle" />{" "}
                  Not a verified Account
                </span>
              )}
            </div>
            {displayProfileButtons()}
          </Col>
        </Media.Body>
      </Media>
    </Container>
  );
};

export default UserProfile;
