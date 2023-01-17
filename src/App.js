import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import { AuthProvidor } from "./contexts/AuthContext";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
function App() {

  return (
    <div className="App"> 
      <BrowserRouter>
        <AuthProvidor>
          <Routes>
            <Route path='/' element={<PrivateRoute><Dashboard/></PrivateRoute>}/> 
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
          </Routes>
          {/* <Dashboard/> */}
        </AuthProvidor>
      </BrowserRouter>
    </div>
  );
}

export default App;
