import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import LOGO from "../../assets/LOGO.png";
import SearchBar from "../HomePage/SearchBar";

const NaviBar = (props) => {
  const navigate = useNavigate();
  const [isUserActive, setUserActive] = useState(false);
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: ", response.credential);
    const userObject = jwt_decode(response.credential);
    console.log("Decoded user object: ", userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;

    const accessToken = response.credential;
    authenticateWithGoogle(accessToken);
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "558497320611-lart3c24hprlkqtmv8l1ibdlftb9m89s.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const authenticateWithGoogle = async (accessToken) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/accounts/google/login/callback/?access_token=${accessToken}`
      );
      const { jwt } = data;
      localStorage.setItem("jwt", jwt);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="n-wrapper" id="Navbar">
      {/* left */}
      <div className="n-left">
        <div className="n-name">
          <Link to="/HomePage" className="l-logo">
            <img className="LOGO-N" src={LOGO} />
          </Link>
        </div>
      </div>
      {/* right */}
      <div className="n-list">
        <SearchBar className="rech" placeholder="Search..." />
      </div>
      <div className="n-right">
        <button
          id="signInDiv"
          onClick={() => {
            navigate("/HomePage");
          }}
        />
           {Object.keys(user).length !=0 && 
          <button onClick={(e)=>handleSignOut(e)}>Sign OUT</button>
          
          }
          
         
         
        </div>
        
      </div>
     );
}
 
export default NaviBar;