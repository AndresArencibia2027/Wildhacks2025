import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Logs from './pages/Logs';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">Upload</Link> | <Link to="/logs">View Logs</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
