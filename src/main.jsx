import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MENU} from "./components/Navbar/menu.jsx";
import { Provider } from 'react-redux'
import store from './redux/store/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App/>}>
          {MENU.map((item, index) =>
            <Route path={item.path} element={item.element} key={index}/>
          )}
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>,
)
