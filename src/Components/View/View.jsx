import React, { useContext, useEffect, useState } from "react";
import "./View.css";
import { PostContext } from "../../Store/postContext";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { FirebaseContext } from "../../Store/context";
function View() {
 
  const [user, setUser] = useState(null);
  const { postDetails, setPostDetails } = useContext(PostContext);
  const { firebase, firestore } = useContext(FirebaseContext);
  useEffect(() => {
    const fetchData=async ()=>{
      console.log("inside the fetch")
      if(postDetails?.userId){
        console.log("again fetch");
        const q=query(collection(firestore,"users"),where("uid","==",postDetails.userId))
      
        const querySnap=await getDocs(q)
      console.log(querySnap)
        querySnap.forEach((doc)=>{
          console.log("hddddi")
          console.log(doc.data())
          setUser(doc.data())
        })
    
      }
    }
  fetchData()
  console.log(user)
  },[postDetails,firestore]);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails?.url} alt="product Photo" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.Price}</p>
          <span>{postDetails.product}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createdAt}</span>
        </div>
        {user && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{user?.username.toUpperCase()}</p>
            <p>{user?.email.toUpperCase()}</p>
            <p>{user?.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
