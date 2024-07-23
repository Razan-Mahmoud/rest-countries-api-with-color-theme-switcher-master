import React from 'react';
import Home from './Componants/Home';
import Details from './Componants/Details';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Componants/Layout';
import Filter from './Componants/Filter';
import BorderCountry from './Componants/BorderCountry';




export default function App() {

  let routes = createBrowserRouter([
    {
      path: "/rest-countries-api-with-color-theme-switcher-master/", element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "/rest-countries-api-with-color-theme-switcher-master/home", element: <Home /> },
        { path: "/rest-countries-api-with-color-theme-switcher-master/filter", element: <Filter /> },
        { path: "/rest-countries-api-with-color-theme-switcher-master/details/:country", element: <Details /> },
        { path: "/rest-countries-api-with-color-theme-switcher-master/border/:name", element: <BorderCountry /> },

      ]
    }
  ])
  return (

    <RouterProvider router={routes} />

  )


}
