import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js'
import Home from './pages/Home.js'
import { useState } from 'react';

function App() {

  const [user, setUser] = useState('admin')

  const logg = (user) => {
    setUser(user)
    // console.log(user)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login function={(user) => logg(user)}/>} />
        {user ? <Route path="home/" element={<Home user={user}/>} /> : null}
        
        <Route path="*" element={<h1>Error 404 page not found / You must Log in</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
