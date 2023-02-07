import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider,Route } from 'react-router-dom';
import './index.css';
import App from './App';
import AddAnnounce from './Components/AddAnnounce/AddAnnounce';
import reportWebVitals from './reportWebVitals';
import Profile from './Components/Profile/Profile';
import MyAnnounce from './Components/Profile/MyAnnounce';
import Chat from './Components/Profile/Chat';
import Api from './Components/Api/Api';
import DetailsAnn from './Components/DetailsAnn/DetailsAnn';
import { HomePage } from './Components/HomePage/HomePage';
const router = createBrowserRouter([
  {
  path:"/",
  element:<App/>,
},
{
  path:"AddAnnounce",
  element:<AddAnnounce id="upload" label="photo"/>,
},

{
  path:"Profile",
  element:<Profile/>,
},
{
  path:"Chat",
  element:<Chat/>,
},
{
  path:"Api",
  element:<Api/>,
},
{
  path:"DetailsAnn/:id",
  element:<DetailsAnn/>,
},
{
  path:"HomePage",
  element:<HomePage/>,
},

   
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();