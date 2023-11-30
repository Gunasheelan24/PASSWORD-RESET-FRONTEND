import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSpeakerDeck } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { Formik, ErrorMessage, Field, Form } from "formik";
import axios from "axios";
import "../Style/forget.css";
import * as yup from "yup";

const Forget = () => {
  let navigation = useNavigate();
  const [isPasswordChange, setisPasswordChange] = useState(false);
  let initialValue = {
    email: "",
  };

  let submit = (value) => {
    forgetPassword(value);
  };

  let forgetPassword = async (value) => {
    try {
      let otp = await axios({
        method: "patch",
        url: "/api/forgetPassword",
        data: {
          value,
        },
      });
      setisPasswordChange(true);
      alert("Check You email");
    } catch (error) {
      console.log(error);
    }
  };

  let startValue = {
    password: "",
    confirmpassword: "",
    otp: "",
  };

  let Validation = yup.object({
    password: yup.string().min(6).max(16).required("require"),
    confirmpassword: yup
      .string()
      .required("Please Enter Confirm password")
      .oneOf([yup.ref("password")], "confirm Password Does Not Match."),
    otp: yup
      .number()
      .required("Required")
      .min(5)
      .max(1234567, "Otp Is Incorrect"),
  });

  let Sub = async (value) => {
    try {
      let changePassword = await axios({
        method: "patch",
        url: "/api/password",
        data: {
          value,
        },
      });
      navigation("/");
      alert("Password Changer");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 color-header d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <h1 className="display-4 text-white">
                <FaSpeakerDeck />
              </h1>
            </div>
            <div className="logo">
              <Link to="/">
                <ImExit className="h2 text-warning mt-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid p-5 bg-black" id="full-width">
        <div className="row">
          <div className="col-sm-12 bg-black p-5">
            {isPasswordChange === false ? (
              <>
                <h1 className="text-center text-white-50 ">RESET PASSWORD</h1>
                <Formik initialValues={initialValue} onSubmit={submit}>
                  <Form>
                    <Field
                      type="text"
                      placeholder="Enter You Email Address"
                      className="form-control mt-3"
                      name="email"
                    />
                    <button type="submit" className="btn btn-dark mt-2">
                      SEND OTP
                    </button>
                  </Form>
                </Formik>
              </>
            ) : (
              <Formik
                initialValues={startValue}
                onSubmit={Sub}
                validationSchema={Validation}
              >
                <Form>
                  <Field
                    type="text"
                    name="password"
                    className="form-control"
                    placeholder="Enter The Password"
                  />
                  <ErrorMessage name="password">
                    {(msg) => <p className="text-white kkkk">{msg}</p>}
                  </ErrorMessage>
                  <Field
                    type="text"
                    name="confirmpassword"
                    className="form-control mt-2"
                    placeholder="Enter The Confirm Password"
                  />
                  <ErrorMessage name="confirmpassword">
                    {(msg) => (
                      <p className="text-white" id="message">
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                  <Field
                    type="number"
                    name="otp"
                    className="form-control mt-2"
                    placeholder="Enter Your Otp"
                  />
                  <ErrorMessage name="otp">
                    {(msg) => (
                      <p className="text-white" id="message">
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                  <button type="submit" className="btn btn-info mt-1">
                    Change Password
                  </button>
                </Form>
              </Formik>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Forget;
