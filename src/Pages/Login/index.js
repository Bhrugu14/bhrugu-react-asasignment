import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form, Button, Card } from "react-bootstrap";

import { AuthContext } from "../../main";
import { validateEmail } from "../../utils";

import styles from "./loginStyles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CurrentUser } from "../../redux/action";

const Login = () => {
  const AllUsers = useSelector((state) => state.allReducers.users);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { SetToast } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    console.log("ALL", AllUsers);
    if (validateEmail(email)) {
      let isExist = AllUsers.find(
        (i) => i.email === email && i.password === password
      );
      if (isExist) {
        SetToast("Login Successful");
        await dispatch(CurrentUser(isExist));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        SetToast("Email or password is incorrect");
      }
    } else {
      SetToast("Enter Valid Email");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeText}>Have an Account?</h1>
      <label className={styles.welcomeText}>
        {"or "}
        <a href="/register" className={styles.register}>
          Register
        </a>
        {"  to create new account"}
      </label>
      <Card className={styles.card}>
        <FloatingLabel label="Email address" className={styles.inputStyle}>
          <Form.Control
            value={email}
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className={styles.inputStyle}
        >
          <Form.Control
            value={password}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FloatingLabel>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.submitButton}
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default Login;
