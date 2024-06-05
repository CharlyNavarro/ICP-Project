import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Total from './Total';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/exam",
    element: <div>ejemplo </div>,
  },
  {
    path: "/reservTotal",
    element: <Total></Total>,
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
);
