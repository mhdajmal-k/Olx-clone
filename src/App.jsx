import React, { Suspense, lazy, useContext, useEffect } from "react";
import Create from "./Components/Create/Create";
const Home = lazy(() => import("./Pages/Home"));
import Login from "./Components/Login/Login";
import Signup from "../src/Pages/Signup"; 
import ViewPost from "./Pages/ViewPost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./Pages/ErrorBoundary";
import Loading from "./Components/Loading/Loading";
import { AuthContext, FirebaseContext } from "./Store/context.jsx";
import { auth } from "./firbase/config";
import { onAuthStateChanged } from "firebase/auth";
import Post from "./Store/postContext.jsx";
import AuthChecking from "./helpers/auth.jsx";
const App = () => {
  const { user, setUser } = useContext(AuthContext);
  const { Firebase, auth } = useContext(FirebaseContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });
  return (
    <React.Fragment>
      <ErrorBoundary>
        <Post>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loading />}>
                    <Home />
                  </Suspense>
                }
                errorElement={<h3>Oops! something Went wrong</h3>}
              />
              <Route path="SingUp" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route
                path="create"
                element={
                  <AuthChecking>
                    <Create />
                  </AuthChecking>
                }
              />
              <Route path="viewPost" element={<ViewPost />} />
              <Route path="*" element={<h1>404 NOT PAGE FOUND</h1>} />
            </Routes>
          </BrowserRouter>
        </Post>
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default App;
