import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Transactions from './pages/Transactions';
import PrivateRoute from './PrivateRoute';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/transactions"
          element={
            <PrivateRoute token={token}>
              <Transactions token={token} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={token ? "/transactions" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

