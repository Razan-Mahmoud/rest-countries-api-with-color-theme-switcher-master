import React from 'react';
import Home from './Componants/Home';
import Details from './Componants/Details';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Componants/Layout';
import Filter from './Componants/Filter';
import BorderCountry from './Componants/BorderCountry';




export default function App() {

  let routes = createBrowserRouter([
    {path: "", element: <Layout/>, children: [
      {index: true, element: <Home/>},
      {path: "home", element: <Home/>},
      {path: "filter", element: <Filter/>},
      {path: "details/:country", element: <Details/>},
      {path: "border/:name", element: <BorderCountry/>},
     
    ]}
  ])
  return(

    <RouterProvider router={routes}/>
  
  ) 
  
  
}
