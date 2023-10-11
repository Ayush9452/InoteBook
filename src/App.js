import './App.css';
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from './components/About';
import Alert from './components/Alert';
import Notestate from './context/notes/Notestate';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setalert] = useState(null)
  const showalert = (message,type) =>{
    setalert({
      message:message,
      type:type
    })
    setTimeout(() => {
      setalert(null)
    }, 1500);
  }
  return (
    <>
      <Notestate>
        <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showalert={showalert}/>}/>
              <Route exact path="/about" element={<About/>}/>
              <Route exact path="/login" element={<Login showalert={showalert}/>}/>
              <Route exact path="/signup" element={<Signup showalert={showalert}/>}/>
            </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;