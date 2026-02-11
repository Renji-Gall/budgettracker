import React, { useState, useEffect } from 'react';

// Mock SpendingChart component
function SpendingChart({ transactions }) {
  return (
    <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>Spending Overview</h3>
      <p>Total Transactions: {transactions.length}</p>
    </div>
  );
}

function Transactions() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  // Fetch transactions when token changes (only if logged in)
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token) return;
      
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [token]);

  // Add a new transaction
  async function addNewTransaction(ev) {
    ev.preventDefault();

    const price = name.split(' ')[0];
    if (isNaN(Number(price))) return alert('Enter a valid price at the start of name.');

    const isExpense = ev.nativeEvent.submitter.value === 'false';
    const signedPrice = isExpense ? -Math.abs(Number(price)) : Math.abs(Number(price));

    const newTransaction = {
      _id: Date.now().toString(), // Temporary ID for local storage
      price: signedPrice,
      name: name.substring(price.length + 1),
      description,
      datetime
    };

    // If logged in, save to backend
    if (token) {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            price: signedPrice,
            name: name.substring(price.length + 1),
            description,
            datetime
          })
        });

        const json = await res.json();
        setTransactions([...transactions, json]);
      } catch (error) {
        console.error('Error saving transaction:', error);
        alert('Failed to save transaction to server');
      }
    } else {
      // Just store locally if not logged in
      setTransactions([...transactions, newTransaction]);
    }

    setName('');
    setDatetime('');
    setDescription('');
  }

  // Delete a transaction
  async function deleteTransaction(id) {
    if (token) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + token }
        });
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
    
    setTransactions(transactions.filter(t => t._id !== id));
  }

  // Login function
  async function login(ev) {
    ev.preventDefault();

    setLoginError('');


    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error('Login response is not JSON:', text);
        return alert('Server error: ' + text);
      }

      if (data.token) {
        setToken(data.token);
        setIsLoggedIn(true);
        setPassword('');
        setShowAuthModal(false);
      } else {
          setLoginError('Wrong password or username!');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Network error. Please try again.');
    }
  }

  // Signup function
  async function signup(ev) {
    ev.preventDefault();
    
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!hasLength || !hasUppercase || !hasNumber) {
      setPasswordError(
        'Password must be at least 8 characters long and include an uppercase letter and a number.'
      );
      setSignupSuccess('');
      return;
    }

    // clear error if valid
    setPasswordError('');
    setPasswordError('');

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (data.message) {
        setSignupSuccess('Signup succesful! Please log in!')
        setAuthMode('login');
        setPassword('');
      } else {
        setPasswordError(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Network error. Please try again.');
    }
  }

  // Logout
  function logout() {
    if (window.confirm('Logging out will clear your local transactions. Are you sure?')) {
      setToken('');
      setIsLoggedIn(false);
      setTransactions([]);
      setUsername('');
      setPassword('');
    }
  }

  // Calculate balance
  const balance = transactions.reduce((sum, t) => sum + t.price, 0).toFixed(2);
  const [, fraction] = balance.split('.');

  return (
    <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h1 style={{ color: '#bb0000', margin: 0 }}>Buckeye Budget Tracker</h1>
        <div>
          {!isLoggedIn ? (
            <button 
              onClick={() => setShowAuthModal(true)} 
              style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Save My Data
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#666', fontSize: '14px' }}>Logged in as {username}</span>
              <button 
                onClick={logout} 
                style={{ padding: '8px 16px', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {!isLoggedIn && (
        <div style={{ background: '#fff3cd', border: '1px solid #ffc107', padding: '10px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px' }}>
          ⚠️ You're using the app without an account. Your data won't be saved when you refresh. Click "Save My Data" to create an account.
        </div>
      )}
      
      <h1 style={{ fontSize: '48px', margin: '20px 0' }}>
        ${balance}<span style={{ fontSize: '24px', color: '#999' }}>.{fraction}</span>
      </h1>

      <SpendingChart transactions={transactions} />

      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="+200 groceries"
            style={{ width: '60%', padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={e => setDatetime(e.target.value)}
            style={{ width: '35%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); addNewTransaction({ preventDefault: () => {}, nativeEvent: { submitter: { value: 'true' } } }); }}
          style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
        >
          Add Income
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); addNewTransaction({ preventDefault: () => {}, nativeEvent: { submitter: { value: 'false' } } }); }}
          style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Add Expense
        </button>
      </div>

      <div>
        {transactions.length > 0 ? transactions.map(t => (
          <div key={t._id} style={{ background: 'white', padding: '15px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{t.name}</div>
              <div style={{ color: '#666', fontSize: '14px' }}>{t.description}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'bold', fontSize: '18px', color: t.price < 0 ? '#dc3545' : '#28a745' }}>
                ${Math.abs(t.price).toFixed(2)}
              </div>
              <div style={{ color: '#999', fontSize: '12px', marginBottom: '5px' }}>
                {t.datetime ? new Date(t.datetime).toLocaleDateString() : ''}
              </div>
              <button 
                onClick={() => deleteTransaction(t._id)}
                style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
              >
                Delete
              </button>
            </div>
          </div>
        )) : (
          <p style={{ textAlign: 'center', color: '#999' }}>No transactions yet. Add your first transaction above!</p>
        )}
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', maxWidth: '400px', width: '90%', position: 'relative' }}>
            <button 
              onClick={() => setShowAuthModal(false)}
              style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#999' }}
            >
              ×
            </button>
            
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setAuthMode('login')}
                style={{ flex: 1, padding: '10px', background: authMode === 'login' ? '#bb0000' : '#ddd', color: authMode === 'login' ? 'white' : '#666', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Login
              </button>
              <button 
                onClick={() => setAuthMode('signup')}
                style={{ flex: 1, padding: '10px', background: authMode === 'signup' ? '#bb0000' : '#ddd', color: authMode === 'signup' ? 'white' : '#666', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Sign Up
              </button>
            </div>

            {authMode === 'login' ? (
              <div>
                <h2 style={{ marginTop: 0 }}>Login</h2>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                />
                <button 
                  onClick={login}
                  style={{ width: '100%', padding: '12px', background: '#bb0000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
                >
                  Login
                </button>
                {loginError && (
                  <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '4px' }}>
                    {loginError}
                  </p>
                )}
                {signupSuccess && (
                  <p style={{ color: 'green', fontSize: '0.9rem', marginTop: '6px' }}>
                    {signupSuccess}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <h2 style={{ marginTop: 0 }}>Sign Up</h2>
                <p style={{ fontSize: '14px', color: '#666' }}>Create an account to save your transactions across sessions.</p>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                />
                <button 
                  onClick={signup}
                  style={{ width: '100%', padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
                >
                  Sign Up
                </button>
                {passwordError && (
                  <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '4px' }}>
                    {passwordError}
                  </p>
                )}
                
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Transactions;