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
import { ClipLoader } from "react-spinners";

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
  const [imageMime, setImageMime] = useState(null);
  const [imageFilename, setImageFilename] = useState(null);
  const [imageFileExtension, setImageFileExtension] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [imageFile, setImageFile] = useState(null);



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


  const getFileExtension = (fileName) => {
    return `.${fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2)}`;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Set profile picture file
      setProfilePicture(file);
      setImagePreview(URL.createObjectURL(file)); // Display image preview

      // Set other image-related states as needed
      setImageMime(file.type);
      setImageFilename(file.name);
      setImageFileExtension(getFileExtension(file.name)); // Call getFileExtension function
    } else {
      // Reset image-related states if no file is selected
      setProfilePicture(null);
      setImagePreview(null);
      setImageMime(null);
      setImageFilename(null);
      setImageFileExtension(null);
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

      console.log("FormData before sending:", formData);
      console.log("firstName:", firstName);
      console.log("lastName:", lastName);
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

  console.log(
    firstName,
    lastName,
    gender,
    phoneNumber,
    district,
    rankInChurch,
    station,
    yearTransferred,
    profilePicture
  );

  

  return (
    <form onSubmit={handleSubmit}>
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
                  <div key={e.label}>
                    <Input
                      {...e}
                      label={e.label}
                      name={e.name}
                      onChange={(event) => handleChange(event, e.name)}
                    />
                  </div>
                ))}
                <div className="downer">
                  <label htmlFor="imageUpload">Add Photo</label>
                  <FaCamera className="cam" />
                  <div className="circle">
                    {imagePreview && <img src={imagePreview} alt="Preview" />}{" "}
                    {/* Display image preview if available */}
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      name="addImage"
                      onChange={handleImageChange}
                    />
                  </div>
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
