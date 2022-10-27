import "./app.scss";

import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import MydocumentList from "./pages/mydocumentList/MydocumentList";
import Landingpage from "./pages/landingpage/Landingpage";
import Library from "./pages/library/Library";
import Aboutus from "./pages/aboutus/Aboutus";
import Todo from "./pages/todo/Todo";

import Sidebar from "./components/sidebar/Sidebar";
// import Topbar from "./components/pg-topbar/pgTopbar";
// import Navbar from "./components/navbar/Navbar";
import ResponsiveAppBar from "./components/navbar/Navbar";

import {
  BrowserRouter,
  Route,
  // Navigate,
  Routes,
  Outlet, Navigate
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
          <Route path="/mydocuments" element={ <MydocumentList /> } />
          <Route path="/library" element={ <Library/> } />
          <Route path="/todo" element={ <Todo/> } />
          <Route path="/account" element={ <Account/> } />
          {/*<Route path="/aboutus" element={ <Aboutus/> } />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
