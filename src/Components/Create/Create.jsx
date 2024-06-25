import React, { useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../Store/context";
import firebase from "firebase/compat/app";
import Loading from "../Loading/Loading";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { failed, success } from "../../helpers/toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [data, setFormData] = useState({
    Name: "",
    category: "",
    Price: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { Firebase, storage, firestore } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...data,
      [name]: value,
    });
  };
  const date = new Date();
  async function handleSubmit(e) {
    if (data.Name.trim()=="") {
      failed("product name is required");
      return;
    }
    if (data.Price.trim()=="") {
      if (data.Price < 0) {
        failed("invalid price");
      } else if (data.Price > 1000000) {
        failed("invalid Price");
      }
      return;
    }
    if (data.category.trim()=="") {
      failed("product category is required");
      return;
    }
    setLoading(true);
    try {
      const imageRef = storageRef(storage, `/image${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      await addDoc(collection(firestore, "product"), {
        product: data.Name,
        Price: data.Price,
        category: data.category,
        url: url,
        userId: user.uid, 
        createdAt: date.toDateString(),
      });
      success("record saved successfully");
      nav("/");
    } catch (error) {
      failed(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <card>
            <div className="centerDiv">
              <label htmlFor="fname">Product</label>
              <br />
              <input
                className="input"
                type="text"
                id="fname"
                name="Name"
                value={data.Name}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="fname">Category</label>
              <br />
              <input
                className="input"
                type="text"
                id="fname"
                name="category"
                value={data.category}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="fname">Price</label>
              <br />
              <input
                className="input"
                type="number"
                id="fname"
                name="Price"
                value={data.Price}
                onChange={handleChange}
              />
              <br />

              <br />
              <img
                alt="Posts"
                width="200px"
                height="200px"
                src={image ? URL.createObjectURL(image) : "select a image"}
              ></img>

              <br />
              <input
                type="file" 
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <br />
              <button
                onClick={handleSubmit}
                type="submit"
                className="uploadBtn"
              >
                upload and Submit
              </button>
            </div>
          </card>
        </>
      )}
    </>
  );
};

export default Create;
