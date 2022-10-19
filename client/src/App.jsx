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


import {
  BrowserRouter,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);


  return (
    <BrowserRouter>
      <Routes>
        <Route>
          {user ? <Route path="/" element={<Landingpage/>} />: 
          // <Redirect to="/auth" />
          <Route render={() => <Navigate to="/home" element={<Home/>}/>} />
          }
        </Route>
        {/* <Route path="/auth">{!user ? <Route path="/auth" element={<Auth/>} /> : <Navigate to="/home"/>}</Route> */}
        <Route path="/auth" element={<Auth/>}/>
        {user && (
          <>
          <Sidebar/>
          <div className="main-container">
            {/* <Route path="/home" element={<Home/>} /> */}
            <Route path="/mydocuments" element={<MydocumentList />} />
            <Route path="/library" element={<Library/>} />
            <Route path="/todo" element={<Todo/>} />
            <Route path="/account" element={<Account/>} />
            <Route path="/aboutus" element={<Aboutus/>} />
          </div>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
