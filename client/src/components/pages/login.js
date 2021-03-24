import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
import Alert from "react-bootstrap/esm/Alert";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearState,
  loginUser,
  logoutUser,
} from "../../features/user/userSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, user, status } = useSelector((state) => state.auth);
  //Redirect to home page if user already logged in.

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (user && token) {
      history.push("/");
    }
    if (status === "failed") {
      clearState();
      reset();
    }
    // eslint-disable-next-line
  }, [user, token, status, reset]);

  if (user && token) {
    return (
      <Container style={{ marginTop: "3rem" }}>
        {" "}
        <Alert variant="success">
          Hello, {user.name}, You're already logged in, happy seeking!
        </Alert>
        <Button href="/" variant="primary">
          Home
        </Button>{" "}
        <Button href="/" variant="danger" onClick={onLogout}>
          Logout
        </Button>
      </Container>
    );
  } else
    return (
      //background video CREDIT to CyberWebFX
      // className="backgroundContainer"
      <div>
        <video
          playsinline
          autoPlay
          muted
          loop
          poster="./LoginPage/Loginbg.png"
          id="bgVid"
        >
          <source src="./LoginPage/bgVideo.mp4" type="video/mp4" />
        </video>
        <div className="vidCredit">BACKGROUND VIDEO CREDIT: CyberWebFX</div>
        <Container
          style={{
            marginTop: "6rem",
            marginLeft: "auto",
            marginRight: "auto",
            minWidth: "90rem",
          }}
        >
          <Container
            style={{
              padding: "1rem",
              minWidth: "100%",
            }}
          >
            <Row style={{ textAlign: "center", width: "100%", margin: "auto" }}>
              <Col className="loginCard">
                <h1 style={{ fontWeight: "bolder", marginTop: "2rem" }}>
                  Welcome Back!
                </h1>
                <h2 style={{ color: "#757575" }}>
                  We're so excited to see you!
                </h2>
                <Form
                  className="seekForm"
                  as="form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      className="seekInput"
                      name="email"
                      ref={register}
                      type="email"
                      placeholder="Enter your email"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className="seekInput"
                      name="password"
                      ref={register}
                      type="password"
                      placeholder="Enter your password"
                    />
                  </Form.Group>
                  <Link to="/forgotPassword">{"Forgot Password?"}</Link>
                  <Button className="seekButton" type="submit">
                    SIGN IN
                  </Button>
                  <Button className="seekButton" type="submit">
                    SIGN UP INSTEAD
                  </Button>
                </Form>
                <span
                  style={{
                    fontSize: "2rem",
                  }}
                >
                  OR
                </span>
                <Row
                  className="seekForm"
                  style={{
                    justifyContent: "space-around",
                    paddingLeft: "10%",
                    paddingRight: "10%",
                  }}
                >
                  <Button className="altLoginButton">
                    <i className=" fab fa-google" />
                  </Button>
                  <Button className="altLoginButton">
                    <i className=" fab fa-github" />
                  </Button>
                  <Button className="altLoginButton">
                    <i className=" fab fa-linkedin-in" />
                  </Button>
                  <Button className="altLoginButton">
                    <i className=" fab fa-reddit-alien" />
                  </Button>
                </Row>
              </Col>
              <Col className="loginCard">
                <Image
                  src="./LoginPage/loginIllustration.png"
                  style={{ width: "100%" }}
                />
                {/* <div style={{ marginTop: "10px !important" }}>
                  <a href="http://www.freepik.com">
                    Illustration Designed by macrovector / Freepik
                  </a>
                </div> */}
              </Col>{" "}
            </Row>
          </Container>
        </Container>
      </div>
    );
};
