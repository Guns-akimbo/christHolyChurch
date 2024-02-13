import "./App.css";

import Login from "./Page/Auth/login/Login";
import { Route, Routes } from "react-router-dom";
import Homescreen from "./Page/Home/Homescreen";
import Signup from "./Component/signup/Signup";
import ProfilePage from "./Page/Profile/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
