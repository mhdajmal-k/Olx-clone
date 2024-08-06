import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseContext } from "../../Store/context";
import { ToastContainer } from "react-toastify";
import { doc, setDoc, collection } from "firebase/firestore";
import { failed, success } from "../../helpers/toastify";
import ClipLoader from "react-spinners/ClipLoader";
export default function Signup() {
  //state
  const [formData, setFormData] = useState({
    Username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading,setLoading]=useState(false)
  const { auth, firestore } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData){
     
      const {Username,email,phone,password}=formData
      if (Username.trim() === '') {
        failed("User name is empty");
        return;
    } 
    if (email.trim() === '') {
        failed("Email is empty");
        return;
    }
    if (phone.trim() === '') {
        failed("Phone number is empty");
        return;
    }
    
    if (password.trim() === '') {
        failed("Password is empty");
        return;
    }  
    }
    setLoading(true)
    try {
      console.log("error from here ")
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (userCredential) {
        success("success");
        const user = userCredential.user;
        console.log("expecting Error")
        await updateProfile(user, { displayName: formData.Username });
        await setDoc(doc(collection(firestore, "users"), user.uid), {
          username: formData.Username,
          email: formData.email,
          phone: formData.phone,
          uid: user.uid,
        });      
       
        navigate("/login");
        console.log("success");
      } else {
        failed();
      }
    } catch (error) {
      failed(error.message);
      console.log(error.message);
    } finally{
      setLoading(false)
    }
  };

  return (
    <div>

      <div className="signupParentDiv">
        <img className="Logo" width="200px" height="200px" src={Logo}></img>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            autoComplete=""
            onChange={handleChange}
          />
          <br />
          <br />
          {loading && <ClipLoader color={"red"} loading={loading} size={50}/>}
          <button type="submit">Signup</button>
        </form>
        <a onClick={()=>navigate("/login")}> already signUp!Login</a>
      </div>
        {<ToastContainer />}
    </div>
  );
}
