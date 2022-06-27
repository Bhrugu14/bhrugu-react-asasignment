import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form, Button, Card } from "react-bootstrap";

import { AuthContext } from "../../main";
import { validateEmail, validateName, validatePassword } from "../../utils";

import styles from "./registerStyles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AddUser } from "../../redux/action";

const Register = () => {
  const AllUsers = useSelector((state) => state.allReducers.users);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { SetToast } = useContext(AuthContext);

  const [signupFields, setSignupFields] = useState([
    {
      label: "Enter Name",
      type: "text",
      placeholder: "user name",
      value: "",
    },
    {
      label: "Enter Email",
      type: "email",
      placeholder: "Email address",
      value: "",
    },
    {
      label: "Enter Password",
      type: "password",
      placeholder: "Email password",
      value: "",
    },
  ]);
  const [extra, setExtra] = useState(0);

  const handleSubmit = async () => {
    console.log("signupFields", signupFields);
    let error = false;
    let newUser = {};
    signupFields.forEach((item, index) => {
      if (item.label === "Enter Name") {
        if (!validateName(item.value)) {
          error = true;
          SetToast("Name should be more then 4 digit");
        } else {
          newUser.name = item.value;
        }
      } else if (item.label === "Enter Email") {
        if (!validateEmail(item.value)) {
          error = true;
          SetToast("Enter Valid Email");
        } else {
          newUser.email = item.value;
        }
      } else {
        if (!validatePassword(item.value)) {
          error = true;
          SetToast("Enter 5 digit password");
        } else {
          newUser.password = item.value;
        }
      }
    });
    if (!error) {
      let isExist = AllUsers.find((i) => i.email === newUser.email);
      console.log("NEWUSER", newUser);
      if (isExist) {
        SetToast("Email already exists");
      } else {
        AllUsers.push(newUser);
        console.log("NEWUSERRes", AllUsers);
        dispatch(AddUser(AllUsers));
        SetToast("user created successfully");
        navigate("/");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeText}>Create New Account</h1>
      <Card className={styles.card}>
        {signupFields.map((item, index) => (
          <FloatingLabel label={item.label} className={styles.inputStyle}>
            <Form.Control
              value={item.value}
              type={item.type}
              placeholder={item.placeholder}
              onChange={(e) => {
                signupFields[index].value = e.target.value;
                setSignupFields(signupFields);
                setExtra(extra + 1);
              }}
            />
          </FloatingLabel>
        ))}
        <div className={styles.buttonContainer}>
          <Button
            className={styles.submitButton}
            onClick={() => handleSubmit()}
          >
            Continue to login
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default Register;
