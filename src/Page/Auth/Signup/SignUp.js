import "./Signup.css";
import React, { useState } from "react";
import Logo from "../../../assests/Logo.png";
import Button from "../../../Component/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const schema = yup.object({
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await axios.post(
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
      <div className="signwrap">
        <div className="signContainer">
          <div className="Logoo">
            <img src={Logo} alt="" />
            <p>Create an Account</p>
          </div>

          <form className="signfields" onSubmit={handleSubmit(onSubmit)}>
            <div className="inp">
              <div className="div">
                <input
                  type="text"
                  placeholder="Firstname"
                  className="inpu"
                  {...register("firstName")}
                />
                <p className="p">{errors.firstName?.message} </p>
              </div>

              <div className="div">
                <input
                  type="text"
                  placeholder="Lastname"
                  className="inpu"
                  {...register("lastName")}
                />
                <p className="p">{errors.lastName?.message} </p>
              </div>
            </div>

            <div className="inp">
              <div className="div">
                <input
                  type="text"
                  placeholder="PhoneNumber"
                  className="inpu"
                  {...register("phoneNumber")}
                />
                <p className="p">{errors.phoneNumber?.message} </p>
              </div>
              <div className="div">
                <input
                  type="email"
                  placeholder="Email"
                  className="inpu"
                  {...register("email")}
                />
                <p className="p">{errors.email?.message} </p>
              </div>
            </div>

            <div className="inp">
              <div className="div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="inpu"
                  {...register("password")}
                />

                <p className="p">{errors.password?.message} </p>
              </div>
              <div className="signeyeBtn" onClick={handleTogglePassword}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
              <div className="div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="ConfirmPassword"
                  className="inpu"
                  // {...register("confirmPassword")}
                />

                <p className="p">{errors.password?.message} </p>
              </div>
            </div>
            <div className="signBtn">
              {loading ? (
                <ClipLoader color="#36d7b7" />
              ) : (
                <Button text="Signup" width="220px" type="submit" />
              )}
            </div>
          </form>

          <div className="texxt">
            <p className="texts">
              Already have an Account!
              <Link to="/login" style={{ textDecoration: "none" }}>
                <span style={{ color: "red" }}>Login</span>
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
