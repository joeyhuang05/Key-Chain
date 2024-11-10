import Business from "./Business";
import User from "./User";
import Home from "./Home";
import React, {createContext, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



const MyContext = createContext();

function App() {

  const [userKeys, setUserKeys] = useState([]);

  return (
    <>
    <br></br>
      <Router>
        <Routes>
          <Route path="/" element={
              <Home keys = {userKeys} setKeys={setUserKeys}/>  
            } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
