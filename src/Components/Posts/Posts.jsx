import React, { useContext, useEffect, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../Store/context";
import { collection, getDocs } from "firebase/firestore";
import Shimmer from "../Shimmer/Shimmer";
import { PostContext } from "../../Store/postContext";
import { useNavigate } from "react-router-dom";

function Posts() {
  const { firebase, firestore } = useContext(FirebaseContext);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { postDetails, setPostDetails } = useContext(PostContext);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getDocs(collection(firestore, "product"));
        const allData = data.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });

        setProduct(allData);
        console.log(allData);
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [firestore]);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
{loading?(
          <Shimmer />
        ):product.length>0?((
          <div className="cards">
            {product.map((productData, id) => {
              return (
                <div
                  className="card"
                  key={id}
                  onClick={() => {
                    setPostDetails(productData);
                    nav("viewPost");
                  }}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={productData?.url} alt="loading" />
                  </div>
                  <div className="content">
                    <p className="rate">Price:&#x20B9; {productData?.Price}</p>
                    <span className="kilometer">
                      Category:{productData?.category}
                    </span>
                    <p className="name">Product: {productData?.product}</p>

                    <span>{productData?.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )):(<p>No product Listed</p>) }

      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
