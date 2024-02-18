import "./Signup.css";
import React, { useState } from "react";
import Logo from "../../assests/Logo.png";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import signUpData from "../../utilites/signUpData";
import Input from "../Input/Input";

const schema = yup
  .object({
    firstName: yup.string().required("Firstname is needed"),
    lastName: yup.string().required("lastname is needed"),
    email: yup.string().required("Valid Email is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required.")
      .matches(/^\d{11}$/, "Phone number must be a 11-digit numeric value."),
    password: yup
      .string()
      .min(8)
      .max(20)
      .required("Password is required,minimum of 8 "),
  })
  .required();

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const values = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
    },

    {
      label: "Last Name",
      name: "lastName",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "tel",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      // type:{showPassword ? "text" : "password"}
    },
  ];

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const Submit = async (data) => {
    console.log("data");
    console.log("Form submitted with data:", data);
    try {
      setLoading(true);
      await axios.post(
        "https://christholychurch.onrender.com/api/signup",
        data
      );
      setLoading(false);
      toast.success("signup sucessfull");
      setTimeout(() => {
        nav("/login");
      }, 5000);
      setLoading(false);
    } catch (err) {
      if (err.response.data.message) {
        toast.error(err.response.data.message);
        setLoading(false);
      }
      setLoading(false);
    }
  };

  return (
    <div className="sign">
      <div className="signupcontainer">
        <div className="signupLogo">
          <img src={Logo} alt="" />
          <p>Create an Account</p>
        </div>
        <form onSubmit={handleSubmit(Submit)} className="signupInputFields">
          {values.map((data) => (
            <div className="signupinputstyle" key={data.name}>
              <Input
                key={data.name}
                register={register}
                name={data.name}
                className="styleInput"
                {...data}
                errors={errors}
                type={
                  data.name === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : "text"
                }
              />

              {data.name === "password" && (
                <div className="eyebtn" onClick={handleTogglePassword}>
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              )}
            </div>
          ))}

          <div className="signupBtn">
            {loading ? (
              <ClipLoader color="#36d7b7" />
            ) : (
              <Button text="Signup" width="280px" type="submit" />
            )}
            <div className="texxt">
              <p className="texts">
                Already have an Account!
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <span style={{ color: "red" }}>Login</span>
                </Link>{" "}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
