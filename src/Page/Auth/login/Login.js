import React from "react";
import "./Login.css";
import Button from "../../../Component/Button/Button";
import Logo from "../../../assests/Logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    console.log("Toggle password visibility:", showPassword);
  };

  const schema = yup.object({
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
        "https://christholychurch.onrender.com/api/signin",
        data
      );
      setLoading(false);
      toast.success("login sucessfull");
      setTimeout(() => {
        nav("/register");
      }, 5000);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div className="log">
    //     <div className="logWrap">
    //       <div className="logs">
    //         <div className="Logoo">
    //           <img src={Logo} alt="" />
    //           <p>Welcome Back</p>
    //         </div>
    //         <div className="LoginFields">
    //           <input
    //             type="text"
    //             className="inpp"
    //             placeholder="Phone Number"
    //             {...register("phoneNumber")}
    //           />
    //           <p className="p">{errors.phoneNumber?.message} </p>
    //           <input
    //             type={showPassword ? "text" : "password"}
    //             className="inpp"
    //             placeholder="Password"
    //             {...register("password")}
    //           />

    //           <p className="p">{errors.password?.message} </p>
    //           <div className="eyeBtn" onClick={handleTogglePassword}>
    //             {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
    //           </div>
    //         </div>

    //         {loading ? (
    //           <ClipLoader color="#36d7b7" />
    //         ) : (
    //           <Button text="Login" width="" />
    //         )}

    //         <div className="acc">
    //           <p className="texts">
    //             Don't have An Account ?
    //             <Link to="/signup" style={{ textDecoration: "none" }}>
    //               <span style={{ color: "red" }}>Signup</span>
    //             </Link>{" "}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </form>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="log">
        <div className="logWrap">
          <div className="logs">
            <div className="Logoo">
              <img src={Logo} alt="" />
              <p>Welcome Back</p>
            </div>
            <div className="LoginFields">
              <input
                type="text"
                className="inpp"
                placeholder="Email"
                {...register("phoneNumber")}
              />
              <p className="p">{errors.phoneNumber?.message} </p>
              <input
                type={showPassword ? "text" : "password"}
                className="inpp"
                placeholder="Password"
                {...register("password")}
              />

              <p className="p">{errors.password?.message} </p>
              <div className="eyeBtn" onClick={handleTogglePassword}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>

              <Button text="Login" style={{ width: "230px" }} />
            </div>

            {/* <Button text="Login" width="200px" />F */}
            <div className="acc">
              <p className="texts">
                Don't have An Account ?
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <span style={{ color: "red" }}>Signup</span>
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;