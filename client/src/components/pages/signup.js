import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/esm/Image";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "../../features/user/userSlice";
import toast from "react-hot-toast";

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && token) {
      history.push("/");
    } else if (user && !token) history.push("/verify");
    // eslint-disable-next-line
  }, [user, token, status]);

  const complexityOptions = {
    min: 4,
    max: 1024,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 3,
  };
  const registerUserSchema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    email: Joi.string()
      .min(7)
      .max(255)
      .email({ tlds: { allow: false } })
      .required(),
    password: passwordComplexity(complexityOptions).required(),
    confirmPassword: passwordComplexity(complexityOptions)
      .valid(Joi.ref("password"))
      .required(),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(registerUserSchema),
  });

  const onSubmit = (data) => {
    dispatch(signupUser(data));
  };

  const showError = (message) => {
    toast.error(message);
  };

  return (
    <div>
      <video
        playsinline
        autoPlay
        muted
        loop
        poster='./LoginPage/Loginbg.png'
        id='bgVid'
      >
        <source src='./LoginPage/bgVideo.mp4' type='video/mp4' />
      </video>
      <div className='vidCredit'>BACKGROUND VIDEO CREDIT: CyberWebFX</div>
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
            <Col className='loginCard'>
              <Image
                src='./LoginPage/loginIllustration.png'
                style={{ width: "100%" }}
              />
              {
                <Row className='artCredit'>
                  <a href='http://www.freepik.com'>
                    Illustration Designed by macrovector / Freepik
                  </a>
                </Row>
              }
            </Col>
            <Col className='loginCard'>
              <h1 style={{ fontWeight: "bolder", marginTop: "2rem" }}>
                Welcome
              </h1>
              <h2 style={{ color: "#757575" }}>We're so excited to see you!</h2>
              <Form
                className='seekForm'
                as='form'
                onSubmit={handleSubmit(onSubmit)}
              >
                <Form.Group as={Row} controlId='formHorizontalName'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className='seekInput'
                    name='name'
                    type='text'
                    placeholder='John Doe'
                    ref={register}
                  />
                </Form.Group>

                {errors.name && showError(errors.name.message)}

                <Form.Group as={Row} controlId='formHorizontalEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className='seekInput'
                    name='email'
                    type='email'
                    placeholder='Email'
                    ref={register}
                  />
                </Form.Group>

                {errors.email && showError(errors.email.message)}
                <Form.Group as={Row}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className='seekInput'
                    name='password'
                    type='password'
                    placeholder='Password'
                    ref={register}
                  />
                  <Form.Control.Feedback type='invalid'>
                    This field is required
                  </Form.Control.Feedback>
                </Form.Group>
                {errors.password && showError(errors.password.message)}

                <Form.Group as={Row}>
                  <Form.Label>
                    Confirm Password
                    {errors.confirmPassword &&
                      showError(errors.confirmPassword.message)}
                  </Form.Label>
                  <Form.Control
                    className='seekInput'
                    name='confirmPassword'
                    type='password'
                    placeholder='Re-enter password'
                    ref={register}
                  />
                </Form.Group>

                <Form.Group as={Row}>
                  <Button className='seekButton' type='submit'>
                    Create Account
                  </Button>
                </Form.Group>
              </Form>
              <span
                style={{
                  fontSize: "2rem",
                }}
              >
                OR
              </span>
              <Row
                className='seekForm'
                style={{
                  justifyContent: "space-around",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                }}
              >
                <Button className='altLoginButton'>
                  <i className=' fab fa-google' />
                </Button>
                <Button className='altLoginButton'>
                  <i className=' fab fa-github' />
                </Button>
                <Button className='altLoginButton'>
                  <i className=' fab fa-linkedin-in' />
                </Button>
                <Button className='altLoginButton'>
                  <i className=' fab fa-reddit-alien' />
                </Button>
              </Row>
            </Col>{" "}
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default SignUp;
