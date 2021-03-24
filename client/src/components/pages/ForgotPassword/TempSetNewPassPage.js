import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { joiResolver } from "@hookform/resolvers/joi";
import passwordComplexity from "joi-password-complexity";
import Joi from "joi";
import { clearState } from "../../../features/user/userSlice";
import axios from "../../../features/axiosSetup";
import { useSelector, useDispatch } from "react-redux";

const TempSetNewPassPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const complexityOptions = {
    min: 4,
    max: 1024,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 3,
  };
  const resetPassSchema = Joi.object({
    otp: Joi.string().length(8).required(),
    password: passwordComplexity(complexityOptions).required(),
    confirm_password: Joi.string().valid(Joi.ref("password")).required(),
  });
  const { register, handleSubmit } = useForm({
    resolver: joiResolver(resetPassSchema),
  });
  const resetUserPassword = async ({ otp, password }) => {
    try {
      const res = await axios({
        method: "PUT",
        url: "api/users/setNewPassword",
        data: JSON.stringify({ otp, password }),
      });
      if (res.status === 200) {
        toast.success(res.data);
        history.push("/login");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    if (user && token) {
      history.push("/");
    }
    dispatch(clearState());
    //eslint-disable-next-line
  }, []);

  const onSubmit = (data) => {
    resetUserPassword(data);
  };
  return (
    <Container style={{ marginTop: "4rem" }}>
      <Form as='form' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} controlId='formHorizontalName'>
          <Form.Label column sm={2}>
            New Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name='password'
              type='password'
              placeholder='enter new account password'
              ref={register}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalName'>
          <Form.Label column sm={2}>
            Confirm Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name='confirm_password'
              type='password'
              placeholder='re-enter the new password'
              ref={register}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalName'>
          <Form.Label column sm={2}>
            secure otp
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name='otp'
              type='password'
              placeholder='enter the 8-digit otp sent to registered email'
              ref={register}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type='submit'>Reset Password</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default TempSetNewPassPage;
