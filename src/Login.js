import React, { useState, useContext } from "react";
import Input from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { SignInUser } from "./services/login_service";
import { Store } from "./store";
import { useHistory } from "react-router-dom";
import CONSTANTS from "./constants";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const LoginScreen = () => {
  const [email, setEmail] = useState({
    value: "",
    error: false,
    errorText: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    errorText: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const { dispatch } = useContext(Store);
  const history = useHistory();

  const validData = (emailId, passwordValue) => {
    let isValid = true;
    isValid = validateEmail(emailId);
    isValid = isValid && validatePassword(passwordValue);

    return isValid;
  };

  const signInUser = async () => {
    try {
      let emailId = email.value;
      let passwordValue = password.value;
      if (validData(emailId, passwordValue)) {
        let user = await SignInUser(emailId, passwordValue, isAdmin);
        dispatch({ type: "user", payload: user });
        history.push("/stories");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const validateEmail = (value) => {
    let isValid = true;
    if (!value) {
      setEmail({
        value: value,
        error: true,
        errorText: CONSTANTS.VALIDATION.REQUIRED,
      });
      isValid = false;
    }
    if (!/^[a-zA-Z0-9.#]+@+[a-zA-Z0-9]+.+[A-z]/.test(value)) {
      setEmail({
        value: "",
        error: true,
        errorText: CONSTANTS.VALIDATION.INVALID_EMAIL,
      });
      isValid = false;
    }
    return isValid;
  };

  const validatePassword = (value) => {
    let isValid = true;
    if (!value) {
      setPassword({
        value: value,
        error: true,
        errorText: CONSTANTS.VALIDATION.REQUIRED,
      });
      isValid = false;
    }
    return isValid;
  };

  return (
    <div className="row login-container">
      <div className="col-lg-3 login-col">
        <Card>
          <CardHeader> Sign In</CardHeader>
          <CardContent>
            <div className="row">
              <div className="col-lg-12 ">
                <Input
                  name="EmailId"
                  id="EmailId"
                  type="email"
                  label="Email"
                  style={{ width: "100%" }}
                  error={email.error}
                  helperText={email.error ? email.errorText : ""}
                  onChange={(event) => {
                    setEmail({
                      value: event.target.value,
                      error: false,
                      errorText: "",
                    });
                  }}
                />
              </div>{" "}
            </div>
            <div className="row">
              <div className="col-lg-12 ">
                <Input
                  name="Password"
                  id="Password"
                  type="password"
                  label="Password"
                  style={{ width: "100%" }}
                  error={password.error}
                  helperText={password.error ? password.errorText : ""}
                  onChange={(event) => {
                    setPassword({
                      value: event.target.value,
                      error: false,
                      errorText: "",
                    });
                  }}
                />
              </div>
            </div>
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col-lg-3 ">
                <FormControlLabel
                  control={
                    <Switch
                      checked={isAdmin}
                      onChange={() => {
                        setIsAdmin(!isAdmin);
                      }}
                      name="Admin"
                    />
                  }
                  label="Admin"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 ">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                  onClick={signInUser}
                >
                  Login
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
