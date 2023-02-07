import { useState,useEffect ,StrictMode} from "react";
import { HomePage } from "./Components/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import api from './api/Post'
import Axios from 'axios'

import LandingPage from "./Components/LandingPage/LandingPage";
function App() {
  const [isToggeled,setIsToggeled]=useState(false)
  
  return (
    <div className="App">
      <Routes>
        
          <Route exact path="/" element={<LandingPage/>}/>
          
       
      </Routes>
      

    </div>
  );
}

export default App;