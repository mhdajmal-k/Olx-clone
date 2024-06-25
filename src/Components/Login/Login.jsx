import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../Store/context";
import Logo from "../../olx-logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";
import { success, failed } from "../../helpers/toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { firebase, auth } = useContext(FirebaseContext);
  const handelChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.email.trim()==""){
      failed("email is requried")
      return
    }else if(formData.password.trim()==""){
      failed("password is required")
      return
    }
    setLoading(true);
    try {
      const authentication = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (authentication) {
        const user = authentication.user;
        success("Login successFully");
        navigate("/");
      }
    } catch (error) {
      failed(error.message);
    }finally{
      setLoading(false)
    }
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="loginParentDiv">
          <img
            style={{ width: "150px", height: "200px", paddingRight: "100px" }}
            src={Logo}
          ></img>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              id="fname"
              name="email"
              value={formData.email}
              onChange={handelChange}
            />
            <br />
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              id="lname"
              name="password"
              value={formData.password}
              onChange={handelChange}
            />
            <br />
            <br />
            <button className="login">Login</button>
          </form>
        
           <a className="signup" onClick={()=>navigate("/Singup")}>
           new user? Signup
            </a>
        
          
          
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Login;
