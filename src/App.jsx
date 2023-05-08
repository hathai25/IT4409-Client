import './App.scss'
import Layout from "./pages/Layout/index.jsx";
import {Outlet} from "react-router-dom";
import setupAxiosDefault from "./services/setupAxios.js";

setupAxiosDefault();

function App() {

  return (
    <div className="App">
      <Layout>
        <Outlet/>
      </Layout>
    </div>
  )
}

export default App
