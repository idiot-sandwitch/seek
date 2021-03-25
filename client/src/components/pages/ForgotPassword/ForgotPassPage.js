import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { clearState } from "../../../features/user/userSlice";
import axios from "../../../features/axiosSetup";
import toast from "react-hot-toast";

const ForgotPassPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const { register, handleSubmit } = useForm({});
  const onSubmit = (data) => {
    sendResetPassRequest(data);
  };
  const sendResetPassRequest = async ({ email }) => {
    try {
      const res = await axios({
        method: "POST",
        url: "/api/users/forgotPassword",
        data: JSON.stringify({ email }),
      });
      if (res.status === 200) {
        toast.success(res.data);
        history.push("/setNewPassword");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    if (user && token) {
      toast.error(
        "Already logged in, please use the profile page to edit your password or logout to reset it."
      );
      history.push("/");
    }
    dispatch(clearState());
    //eslint-disable-next-line
  }, []);

  return (
    <Container style={{ marginTop: "4rem" }}>
      <Form className="seekForm" as="form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} controlId="formHorizontalName">
          <Form.Label column sm={2}>
            Enter your email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              className="seekInput"
              name="email"
              type="email"
              placeholder="enter registered email address"
              ref={register}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button className="seekButton" type="submit">
              Create Account
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ForgotPassPage;
