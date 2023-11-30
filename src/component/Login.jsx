import { React, useEffect, useState } from "react";
import "../Style/Login.css";
import Header from "./Header";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  let save = {
    email: "reshma2409@gmail.com",
    password: "Reshma@2409",
  };
  let initialvalue = {
    email: "",
    password: "",
  };

  let value = (values, { resetForm }) => {
    save = {
      email: values.email,
      password: values.password,
    };
    resetForm({ values: "" });
    SignIn();
  };
  let Validation = yup.object({
    email: yup.string().email("Invalid E-Mail Format").required("require"),
    password: yup.string().min(6).max(16).required("require"),
  });

  const SignIn = async () => {
    try {
      let saveData = await axios({
        method: "post",
        url: "/api/signin",
        data: {
          save,
        },
      });
      if (saveData.status === 200) {
        alert("Welcome Back");
      }
    } catch (error) {
      alert(error.response.data.Message);
    }
  };
  return (
    <>
      <Header />
      <div className="container-fluid bg-black" id="bg-color">
        <div className="row">
          <div className="col-sm-12">
            <Formik
              initialValues={initialvalue}
              onSubmit={value}
              validationSchema={Validation}
            >
              <Form>
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <div>
                    <h1
                      className="text-center display-4 text-white-50"
                      id="text-signin"
                    >
                      Sign in
                    </h1>
                    <Field
                      type="text"
                      className="form-control id-gen"
                      placeholder="Login in"
                      name="email"
                    />
                    <ErrorMessage name="email">
                      {(msg) => <p className="text-para">{msg}</p>}
                    </ErrorMessage>
                    <Field
                      type="current-password"
                      className="form-control mt-2 id-gen"
                      placeholder="Password"
                      name="password"
                    />
                    <ErrorMessage name="password">
                      {(msg) => <p className="text-para">{msg}</p>}
                    </ErrorMessage>
                    <div className="d-flex justify-content-between mt-2">
                      <div>
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-label ms-1 text-white-50">
                          Remember Me
                        </label>
                      </div>
                      <Link to="/Password">
                        <p className="text-white-50">Forget Password?</p>
                      </Link>
                    </div>
                    <button className="btn btn-light w-25" type="submit">
                      Login
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
