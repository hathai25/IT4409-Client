import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage/index.jsx";
import {Menu} from "./components/Navbar/menu.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          {Menu.map((item, index) =>
            <Route path={item.path} element={item.element} key={index} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
