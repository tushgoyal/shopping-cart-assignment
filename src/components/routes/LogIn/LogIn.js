import React, { useState } from "react";
import "./LogIn.scss";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginRequest } from "../../../redux/login/loginAction";

const initialState = {
  email: "",
  password: "",
};

export default function LogIn() {
  const [formDetails, setformDetails] = useState(initialState);
  const [validationMsg, setvalidationMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    //checking userdetails from local storage
    if (formDetails.email && formDetails.password) {
      let allUserData = JSON.parse(localStorage.getItem("user-details"));
      let userData =
        allUserData &&
        allUserData.filter((el) => el.email === formDetails.email)[0];
      if (!userData) {
        setvalidationMsg("No User Found In Record, Please Register First !");
        return;
      }
      if (userData.password !== formDetails.password) {
        setvalidationMsg("Woops! Invalid Credentials");
        return;
      }
      setvalidationMsg("Successfully Logged In");
      setIsSuccess(true);

      //setting logged in status in storage
      let loginData = {
        status: "logged",
        name: userData.name,
      };
      localStorage.setItem("user-status", JSON.stringify(loginData));
      dispatch(userLoginRequest());
      setTimeout(() => history.push("/"), 1000);
    } else {
      setvalidationMsg("Please Fill All The Fields");
      return;
    }
  };

  const onChangeHandler = (e) => {
    setvalidationMsg("")
    setformDetails({ ...formDetails, [e.target.id]: e.target.value });
  };
  return (
    <section className="login">
      <div className="login-text">
        <h1>Login</h1>
        <p>Get access to your Orders, Wishlist and Recommedations</p>
      </div>
      <div className="login-action">
        <form onSubmit={onSubmit} className="login-action-form">
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
          {validationMsg && (
            <span className={isSuccess ? "msg success-msg" : "msg error-msg"}>
              {validationMsg}
            </span>
          )}
          <button>Login</button>
        </form>
      </div>
    </section>
  );
}
