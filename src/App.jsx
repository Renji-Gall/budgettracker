import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Transactions from './pages/Transactions';
import PrivateRoute from './PrivateRoute';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/transactions" replace />} />
        <Route path="/transactions" element={<Transactions token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

