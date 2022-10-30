import "./app.scss";

import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import MydocumentList from "./pages/practice/MydocumentList";
import Landingpage from "./pages/landingpage/Landingpage";
import Library from "./pages/library/Library";
import Info from "./pages/info/Info";
import Todo from "./pages/learn/Learn";

import Sidebar from "./components/sidebar/Sidebar";
import ResponsiveAppBar from "./components/navbar/Navbar";

import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate
} from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";

const Applayout = ({ user }) => user ? (
  <>
    <Sidebar/>
    <div className="main-container">
      <ResponsiveAppBar/>
      <Outlet/>
    </div>
  </>
) : ( <Navigate to="/auth" replace /> );


const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage/>} />
        <Route path="/auth" element={
        (!user ? <Auth/> : <Navigate to="/home" replace />)

        }/>
        <Route element={<Applayout user = {user}/>} >
          <Route path="/home" element={ <Home /> }/>
          <Route path="/practice" element={ <MydocumentList /> } />
          <Route path="/library" element={ <Library/> } />
          <Route path="/learn" element={ <Todo/> } />
          <Route path="/account" element={ <Account/> } />
          <Route path="/info" element={ <Info/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
