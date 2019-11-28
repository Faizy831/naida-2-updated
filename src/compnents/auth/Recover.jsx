import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { sendRecoverCode } from "../../actions/authActions";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Alert
} from "reactstrap";

import path from "./path.svg";
function Recover({ sendRecoverCode, recoverMsg }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const sendRecCode = async e => {
    e.preventDefault();
    setDone(true);
    await sendRecoverCode(email);
  };

  useEffect(() => {
    if (recoverMsg && recoverMsg.error) {
      setDone(false);
    }
  }, [recoverMsg]);
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
              Enter your email and we send you a password reset link.
            </p>
          </div>
          {recoverMsg && (
            <Alert color={recoverMsg.error ? "danger" : "success"}>
              {recoverMsg.message}
            </Alert>
          )}
          <form className="login_container" onSubmit={sendRecCode}>
            <fieldset disabled={done}>
              <FormGroup>
                <Input
                  type="email"
                  placeholder="Email"
                  className="login_input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup>

              <div className="mt-5 text-center">
                <Button className="px-4 py-2 login_btn mx-auto">
                  Send request
                </Button>
              </div>
            </fieldset>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
const mapStateToProps = state => ({
  recoverMsg: state.auth.recoverMsg
});
export default connect(
  mapStateToProps,
  { sendRecoverCode }
)(Recover);
