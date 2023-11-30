import React from "react";
import "./Signup.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { FaSpeakerDeck } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import "../Style/Header.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  let navigation = useNavigate();
  let signUp = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  let initialvalue = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  let submit = (values, { resetForm }) => {
    signUp = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    resetForm({ values: "" });
    signup();
  };

  let Validation = yup.object({
    firstname: yup.string().required("Require"),
    lastname: yup.string().required("Require"),
    email: yup.string().email("Invalid E-Mail Format").required("require"),
    password: yup.string().min(6).max(16).required("require"),
    confirmPassword: yup
      .string()
      .required("Please Enter Confirm password")
      .oneOf([yup.ref("password")], "confirm Password Does Not Match."),
  });

  const signup = async () => {
    try {
      let signUserCreate = await axios({
        method: "post",
        url: "/api/signup",
        data: { signUp },
      });
      navigation("/");
      alert("Signup Success");
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
                <FaSignInAlt className="h2 text-white mt-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid color-cover p-4">
        <div className="row">
          <div className="col-sm-12">
            <div className="d-flex justify-content-center">
              <div className="black-color rounded-start-5">
                <img
                  width={"300px"}
                  src="https://i.pinimg.com/564x/41/c9/44/41c944b5decac49b724e95e4e4831130.jpg"
                  className="img img-fluid rounded-3 mx-auto d-none d-md-block"
                />
              </div>
              <div className="d-flex align-items-end flex-column justify-content-center color-change p-2  rounded-end-5">
                <Formik
                  initialValues={initialvalue}
                  onSubmit={submit}
                  validationSchema={Validation}
                >
                  <Form className="d-flex flex-column gap-2">
                    <h1 className="text-center text-white-50">Sign up</h1>
                    <div className="d-flex gap-2">
                      <div>
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="firstname"
                          name="firstname"
                        />
                        <ErrorMessage name="firstname">
                          {(msg) => <p className="message-point">{msg}</p>}
                        </ErrorMessage>
                      </div>
                      <div className="">
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="lastname"
                          name="lastname"
                        />
                        <ErrorMessage name="lastname">
                          {(msg) => <p className="message-point">{msg}</p>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <Field
                      type="text"
                      className="form-control"
                      placeholder="email"
                      name="email"
                    />
                    <ErrorMessage name="email">
                      {(msg) => <p className="message">{msg}</p>}
                    </ErrorMessage>
                    <Field
                      type="text"
                      className="form-control"
                      placeholder="password"
                      name="password"
                    />
                    <ErrorMessage name="password">
                      {(msg) => <p className="message">{msg}</p>}
                    </ErrorMessage>
                    <Field
                      type="text"
                      className="form-control"
                      placeholder="confirm password"
                      name="confirmPassword"
                    />
                    <ErrorMessage name="confirmPassword">
                      {(msg) => <p className="message">{msg}</p>}
                    </ErrorMessage>
                    <button className="btn btn-info" type="submit">
                      Sign up
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
