import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../features/axiosSetup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import Media from "react-bootstrap/esm/Media";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";

const EditProfile = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const [userInfo, setUserInfo] = useState({});
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const getUserInfo = async () => {
    const userRes = await axios({
      method: "GET",
      url: "api/users/me",
      headers: { "x-auth-token": localStorage.getItem(`token`) },
    });
    setUserInfo(userRes.data);
  };

  const onSubmit = async (data) => {
    data["avatar"] = userInfo.avatar;
    const userProperties = [
      "about",
      "branch",
      "email",
      "githubUrl",
      "linkedinUrl",
      "name",
      "sex",
    ];

    userProperties.forEach((element) => {
      if (data[element] === "") {
        data[element] = userInfo[element];
      }
    });

    const resCourse = await axios({
      method: "PUT",
      url: "api/users/edit",
      headers: { "x-auth-token": localStorage.getItem(`token`) },
      data: JSON.stringify({
        name: data.name,
        avatar: data.avatar,
        about: data.about,
        branch: data.branch,
        email: data.email,
        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl,
        sex: data.sex,
      }),
    });

    await setTimeout(() => {
      history.push(`profile/${user._id}`);
    }, 1500);
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  //show everything
  //if click edit profile, show edit profile component
  return (
    <Container style={{ marginTop: "4rem" }}>
      <Form onSubmit={handleSubmit(onSubmit)} as="form">
        <Media className="profileCard">
          <Col>
            <Image className="userAvatar" src={userInfo.avatar} roundedCircle />
            <div style={{ paddingLeft: "1.5rem" }}>
              <Form.Group
                style={{ textAlign: "left", display: "inline-block" }}
                className="userProfileField"
              >
                <Form.Label>
                  <i
                    style={{
                      fontSize: "2rem",
                      marginRight: "1rem",
                    }}
                    className="fab fa-linkedin"
                  />
                  {"  "}
                  <a
                    href={userInfo.linkedinUrl !== `` && userInfo.linkedinUrl}
                    style={{ display: "inline-block" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4>Linkedin</h4>
                  </a>
                </Form.Label>

                <Button
                  className="deleteButton"
                  onClick={() => {
                    setUserInfo({ ...userInfo, linkedinUrl: "" });
                  }}
                >
                  <i class="fas fa-times"></i>
                </Button>

                <Form.Control
                  className="seekInput"
                  name="linkedinUrl"
                  ref={register}
                  type="text"
                  placeholder="Update linkedin URL"
                />
              </Form.Group>

              <Form.Group
                style={{ textAlign: "left", display: "block" }}
                className="userProfileField"
              >
                <Form.Label>
                  <i
                    style={{ fontSize: "2rem", marginRight: "1rem" }}
                    className="fab fa-github"
                  />{" "}
                  <a
                    href={userInfo.githubUrl !== `` && userInfo.githubUrl}
                    style={{ display: "inline-block" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4>Github</h4>
                  </a>
                </Form.Label>

                <Button
                  className="deleteButton"
                  onClick={() => {
                    setUserInfo({ ...userInfo, githubUrl: "" });
                  }}
                >
                  <i class="fas fa-times"></i>
                </Button>

                <Form.Control
                  className="seekInput"
                  name="githubUrl"
                  ref={register}
                  type="text"
                  placeholder="Update github URL"
                />
              </Form.Group>
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
            <Form.Group>
              <Form.Label>
                <h3 style={{ margin: "1rem", width: "900px !important" }}>
                  {userInfo.name}
                </h3>
              </Form.Label>

              <Button
                className="deleteButton"
                onClick={() => {
                  setUserInfo({ ...userInfo, name: "" });
                }}
              >
                <i class="fas fa-times"></i>
              </Button>

              <Form.Control
                className="seekInput"
                name="name"
                ref={register}
                type="text"
                placeholder="Update your Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <p style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
                  {userInfo.about}
                </p>
              </Form.Label>

              <Button
                className="deleteButton"
                onClick={() => {
                  setUserInfo({ ...userInfo, about: "" });
                }}
              >
                <i class="fas fa-times"></i>
              </Button>

              <Form.Control
                style={{
                  height: "15rem",
                  resize: "none",
                }}
                maxLength="500"
                className="seekInput"
                as="textarea"
                name="about"
                ref={register}
                placeholder="Update About field"
              />
            </Form.Group>

            <Col
              style={{
                marginTop: "2rem",
                justifyContent: "space-between",
                height: "100% !important",
              }}
            >
              <Form.Group className="userProfileField">
                <Form.Label>
                  <h4>Email</h4>
                  {userInfo.email}
                </Form.Label>

                <Button
                  className="deleteButton"
                  onClick={() => {
                    setUserInfo({ ...userInfo, email: "" });
                  }}
                >
                  <i class="fas fa-times"></i>
                </Button>

                <Form.Control
                  className="seekInput"
                  name="email"
                  ref={register}
                  type="text"
                  placeholder="Update your email"
                />
              </Form.Group>

              <Form.Group className="userProfileField">
                <Form.Label>
                  <h4>Sex</h4>
                  {userInfo.sex}
                </Form.Label>

                <Button
                  className="deleteButton"
                  onClick={() => {
                    setUserInfo({ ...userInfo, sex: "" });
                  }}
                >
                  <i class="fas fa-times"></i>
                </Button>

                <Form.Control
                  className="seekInput"
                  name="sex"
                  ref={register}
                  type="text"
                  placeholder="Update your sex"
                />
              </Form.Group>

              <Form.Group className="userProfileField">
                <Form.Label>
                  <h4>Branch</h4>
                  {userInfo.branch}
                </Form.Label>

                <Button
                  className="deleteButton"
                  onClick={() => {
                    setUserInfo({ ...userInfo, branch: "" });
                  }}
                >
                  <i class="fas fa-times"></i>
                </Button>

                <Form.Control
                  className="seekInput"
                  name="branch"
                  ref={register}
                  type="text"
                  placeholder="Update your branch"
                />
              </Form.Group>

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
                    <i
                      style={{ color: "red" }}
                      className="far fa-times-circle"
                    />{" "}
                    Not a verified Account
                  </span>
                )}
              </div>

              <div className="userProfileField">
                <Button className="seekButton" type="submit">
                  Update Profile
                </Button>
              </div>
            </Col>
          </Media.Body>
        </Media>
      </Form>
    </Container>
  );
};

export default EditProfile;
