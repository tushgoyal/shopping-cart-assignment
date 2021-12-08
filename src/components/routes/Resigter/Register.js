import React, { useState } from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPwd: "",
};

export default function Register() {
  const [formDetails, setformDetails] = useState(initialState);
  const [validationMsg, setvalidationMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    const regPassword = /^(?!.* )(?=.*\d)(?=.*[A-Z]).{6,18}$/;
    if (formDetails.firstName && formDetails.email && formDetails.password) {
      if (formDetails.password !== formDetails.confirmPwd) {
        setvalidationMsg("Please check again, entered passwords are not matching");
        return;
      }
      //password format validation
      if (!regPassword.test(formDetails.password)) {
        setvalidationMsg(
          "Passwords Must Contain 6 Characters, A Number And A Alphabet"
        );
        return;
      }

      //checking for existing entry in storage
      let allUserData = JSON.parse(localStorage.getItem("user-details")) || [];
      if (
        allUserData.length &&
        allUserData.filter((el) => el.email === formDetails.email).length
      ) {
        setvalidationMsg("Email is already registered, Please goto login");
        return;
      }

      let userData = {
        email: formDetails.email,
        password: formDetails.password,
        name: `${formDetails.firstName} ${formDetails.lastName}`,
      };

      setvalidationMsg("User Registered Successfully");
      setIsSuccess(true);
      allUserData.push(userData);
      localStorage.setItem("user-details", JSON.stringify(allUserData));

      setTimeout(() => history.push("/login"), 1500);
    } else {
      setvalidationMsg("Fill All The Fields");
      return;
    }
  };
  const onChangeHandler = (e) => {
    setformDetails({ ...formDetails, [e.target.id]: e.target.value });
  };
  return (
    <section className="register">
      <div className="register-text">
        <h1>Signup</h1>
        <p>We do not share your personal details with anyone.</p>
      </div>
      <div className="register-action">
        <form onSubmit={onSubmit} className="register-action-form">
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={formDetails.firstName}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={formDetails.lastName}
            onChange={onChangeHandler}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formDetails.email}
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formDetails.password}
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            id="confirmPwd"
            placeholder="Confirm Password"
            value={formDetails.confirmPwd}
            onChange={onChangeHandler}
            required
          />
          {validationMsg && (
            <span className={isSuccess ? "msg success-msg" : "msg error-msg"}>
              {validationMsg}
            </span>
          )}
          <button>Signup</button>
        </form>
      </div>
    </section>
  );
}
