import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login.js'
import Home from './pages/Home.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
