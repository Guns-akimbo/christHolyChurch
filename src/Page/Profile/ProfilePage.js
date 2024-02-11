import React from "react";
import Data from "../../utilites/Data";
import Logo from "../../assests/Logo.png";
import Button from "../../Component/Button/Button";
import Input from "../../Component/Input/Input";
import "./ProfilePage.css";
import { FaCamera } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


// import { ClipLoader } from "react-spinners";

const ProfilePage = () => {

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const schema = yup.object({
    firstName: yup.string().required("Firstname is needed"),
    lastName: yup.string().required("lastname is needed"),
    gender: yup.string().required("Valid Email is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required.")
      .matches(/^\d{11}$/, "Phone number must be a 11-digit numeric value."),
    rankInChurch: yup.string().required(),
    district: yup.string().required(),
    station: yup.string().required(),
    yearTransferred: yup.string().required(),
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="register">
        <div className="wrappz">
          <section className="left">
            <div className="clie">
              <div className="Log">
                <img src={Logo} alt="" />
                <p>Welcome Victor</p>
              </div>
            </div>
          </section>
          <section className="right">
            <div className="form">
              <h1>Fill in the Information</h1>
              <div className="registerfield">
                {Data.map((e, id) => (
                  <Input key={id} label={e.label} />
                ))}
                <div className="downer">
                  <p>Add Photo</p>
                  <FaCamera className="cam" />
                  <div className="circle"></div>
                </div>
              </div>
              <footer>
                <Button
                  text=" Submit"
                  type={"submit"}
                  backgroundColor={"#15acff"}
                  fontSize={"17px"}
                  style={{ border: "2px solid white " }}
                />
              </footer>
            </div>
          </section>
        </div>
      </main>
    </form>
  );
};

export default ProfilePage;
