/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef, useState } from "react";
import { Form, Field, FieldMetaState } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import "./FormDemo.css";
import { FormData } from "../../constants/types";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../../constants/types";

const Login = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toastRef = useRef<Toast>(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const validate = (data: FormData) => {
    const errors: Partial<FormData> = {};

    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Invalid email address. E.g. example@email.com";
    }

    if (!data.password) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  const showError = (errorMessage: string) => {
    toastRef.current?.show({
      severity: "error",
      summary: "Error",
      detail: errorMessage,
      life: 3000,
    });
  };
  
  const handleLogin = async (data: FormData) => {
    setLoading(!loading);
    try {
      await axios.post("https://localhost:7292/register", data);
      setShowMessage(true);
      setFormData({ email: "", password: "" });
    } catch (error) {
      let errorMessage = "Registration failed. Please try again!!";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.data?.errors?.DuplicateUserName) {
          errorMessage = axiosError.response.data.errors.DuplicateUserName[0];
        }
      }
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const isFormFieldValid = (meta: FieldMetaState<any>) =>
    !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta: FieldMetaState<any>) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your account is registered under email <b>{formData.email}</b> ;
            it'll be valid next 30 days without activation. Please check{" "}
            <b>{formData.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Register</h5>
          <Form
            onSubmit={handleLogin}
            initialValues={{
              email: "",
              password: ""
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <Field
                  name="email"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText
                          id="email"
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="email"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Email*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="password"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Password
                          id="password"
                          {...input}
                          toggleMask
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
                        />
                        <label
                          htmlFor="password"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Password*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Button type="submit" label="Submit" className="mt-2" />
              </form>
            )}
          />
        </div>
      </div>
      <Toast
        ref={toastRef}
      />
    </div>
  );
};

export default Login;