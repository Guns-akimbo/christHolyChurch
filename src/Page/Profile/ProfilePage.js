import React from "react";
import Data from "../../utilites/Data";
import Logo from "../../assests/Logo.png";
import Button from "../../Component/Button/Button";
import "./ProfilePage.css";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import { ClipLoader } from "react-spinners";
import Input from "../../Component/Input/Inputz";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [rankInChurch, setRankInChurch] = useState("");
  const [station, setStation] = useState("");
  const [yearTransferred, setYearTransferred] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [resetInput, setResetInput] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e, data) => {
    const value = e.target.value;
    switch (data) {
      case "firstName":
        setFirstname(value);
        break;
      case "lastName":
        setLastname(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "district":
        setDistrict(value);
        break;
      case "rankInChurch":
        setRankInChurch(value);
        break;
      case "station":
        setStation(value);
        break;
      case "yearTransferred":
        setYearTransferred(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Set profile picture file
      setProfilePicture(file);
      setImagePreview(URL.createObjectURL(file)); // Display image preview
    } else {
      setProfilePicture(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("gender", gender);
      formData.append("phoneNumber", phoneNumber);
      formData.append("district", district);
      formData.append("rankInChurch", rankInChurch);
      formData.append("station", station);
      formData.append("yearTransferred", yearTransferred);
      formData.append("addImage", profilePicture); // Append the image file

      await axios.post(
        "https://christholychurch.onrender.com/api/newpriest",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResetInput((prev) => !prev);
      setLoading(false);
      toast.success("Successful");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        console.error("An error occurred while submitting the form:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <main className="register">
        <div className="wrappz">
          <section className="left">
            <div className="clie">
              <div className="Log">
                <img src={Logo} alt="" />
                <p>Welcome</p>
              </div>
            </div>
          </section>
          <section className="right">
            <div className="form">
              <h1 className="h1">Fill in the Information</h1>
              <div className="registerfield">
                {Data.map((e, id) => (
                  <div key={e.label}>
                    <Input
                      key={resetInput ? "reset" : "normal"}
                      ref={fileInputRef}
                      {...e}
                      label={e.label}
                      name={e.name}
                      onChange={(event) => handleChange(event, e.name)}
                    />
                  </div>
                ))}
                <div className="downer">
                  <label htmlFor="imageUpload">
                    <p> Add Photo</p>
                    <div className="circle">
                      {!imagePreview && <FaCamera className="cam" />}
                      {imagePreview && <img src={imagePreview} alt="Preview" />}
                      <input
                        key={resetInput ? "reset" : "normal"}
                        ref={fileInputRef}
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        name="addImage"
                        onChange={handleImageChange}
                      />
                    </div>
                  </label>
                </div>
              </div>
              <footer>
                {loading ? (
                  <ClipLoader />
                ) : (
                  <Button
                    text=" Submit"
                    type={"submit"}
                    backgroundColor={"#15acff"}
                    fontSize={"17px"}
                    style={{ border: "2px solid white " }}
                    onClick={handleSubmit}
                  />
                )}
              </footer>
            </div>
          </section>
        </div>
      </main>
    </form>
  );
};

export default ProfilePage;
