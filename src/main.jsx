import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { FirebaseContext } from "./Store/context.jsx";
import {Firebase,auth, firestore, storage} from "../src/firbase/config.js"
import Context from "./Store/context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  
  <FirebaseContext.Provider value={{Firebase,auth,firestore,storage}}>
   <Context>
    <App />
   </Context>
  </FirebaseContext.Provider>
);
