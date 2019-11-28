import React, { useState } from "react";
import { connect } from "react-redux";
import { googleLogin, login } from "../../actions/authActions";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  CustomInput,
  Button,
  Alert
} from "reactstrap";

import path from "./path.svg";

function SignIn({ googleLogin, login, loginError }) {
  const [fetching, setFetching] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const handleInputChange = e =>
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  const handleLogin = async e => {
    e.preventDefault();
    setFetching(true);
    const { email, password } = loginData;
    await login({
      email,
      password
    });
  };

  const { email, password } = loginData;

  return (
    <Container fluid>
      <fieldset disabled={fetching}>
        <Row>
          <Col className="login_card login_sidebar">
            <img src={path} alt="path" className="login_path" />
          </Col>
          <Col className="login_card d-flex flex-column justify-content-center align-items-center bg-white">
            <div className="text-center pb-4">
              <h2 className="login_title">Nadia 2.0</h2>
              <p className="login_sub_title">
                Welcome back! Please login to your account.
              </p>
            </div>
            {loginError && <Alert color="danger">{loginError.message}</Alert>}
            <form className="login_container" onSubmit={handleLogin}>
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
              <div className="mt-4">
                <FormGroup className="d-flex justify-content-between">
                  <CustomInput
                    type="checkbox"
                    label="Remember Me"
                    id="remember"
                  />
                  <Link to="/recover" className="login_forget_password">
                    Forget Password
                  </Link>
                </FormGroup>
                <div className="mt-5 d-flex flex-column  align-items-center ">
                  <Button className="px-5 py-2 login_btn w-75 mb-2">
                    Login
                  </Button>
                  <Button
                    className="px-5 py-2 login_btn w-75 "
                    onClick={googleLogin}
                  >
                    Login with Google
                  </Button>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </fieldset>
    </Container>
  );
}
const mapStateToProps = state => ({
  loginError: state.auth.loginError
});
export default connect(
  mapStateToProps,
  { googleLogin, login }
)(SignIn);
