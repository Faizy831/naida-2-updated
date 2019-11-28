import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  FormFeedback,
  Alert
} from "reactstrap";

import path from "./path.svg";

function SignUp({ register, registerError }) {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    password2: ""
  });
  const [password2Valid, setPassword2Valid] = useState(true);
  const handleInputChange = e =>
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  const handleSubmit = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      password2
    } = userData;
    if (password.trim() !== password2.trim()) {
      setPassword2Valid(false);
    } else {
      register({
        firstName,
        lastName,
        username,
        email,
        password: password.trim()
      });
    }
  };
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    password2
  } = userData;
  return (
    <Container fluid>
      <Row>
        <Col className="login_card login_sidebar">
          <img src={path} alt="path" className="login_path" />
        </Col>
        <Col className="login_card d-flex flex-column justify-content-center align-items-center bg-white">
          <div className="text-center pb-4">
            <h2 className="login_title">Nadia 2.0</h2>
            <p className="login_sub_title">
              Please complete to create your account.
            </p>
          </div>
          {registerError && (
            <Alert color="danger">{registerError.message}</Alert>
          )}
          <form className="login_container" onSubmit={handleSubmit}>
            <FormGroup className="d-flex justify-content-between">
              {/* <Label>Username</Label> */}
              <Input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
                className="login_input login_input_inline "
                required
              />
              <Input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="login_input login_input_inline "
                required
              />
            </FormGroup>
            <FormGroup>
              {/* <Label>Username</Label> */}
              <Input
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
                placeholder="Username"
                className="login_input"
                required
              />
            </FormGroup>
            <FormGroup>
              {/* <Label>Username</Label> */}
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="login_input"
                required
              />
            </FormGroup>
            <FormGroup>
              {/* <Label>Password</Label> */}
              <Input
                type="Password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
                className="login_input"
                required
              />
            </FormGroup>
            <FormGroup>
              {/* <Label>Password</Label> */}
              <Input
                type="Password"
                name="password2"
                value={password2}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="login_input"
                invalid={!password2Valid}
                required
              />
              <FormFeedback>The password must be the same</FormFeedback>
            </FormGroup>
            <div className="mt-5 text-center">
              <Button className="px-5 py-2 login_btn mx-auto ">Sign Up</Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
const mapStateToProps = state => ({
  registerError: state.auth.registerError
});
export default connect(
  mapStateToProps,
  {
    register
  }
)(SignUp);
