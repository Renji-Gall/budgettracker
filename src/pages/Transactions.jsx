// import './App.css';
// import { useState, useEffect } from 'react';
// import SpendingChart from '../components/myScript';

// function Transactions() {
//   const [name, setName] = useState('');
//     const [datetime, setDatetime] = useState('');
//     const [description, setDescription] = useState('');
//     const [transactions, setTransactions] = useState([]);


//     useEffect(() => {
//         getTransactions().then(setTransactions);
//     }, []);


//     // async function getTransactions() {
//     //     const url = process.env.REACT_APP_API_URL + '/transactions';
//     //     const response = await fetch(url);

//     //     const text = await response.text();
//     //     console.log('response', text);

//     //     //return await response.json();
//     //     return JSON.parse(text);
//     // }

//     async function getTransactions() {
//         if (!token) return [];

//         const res = await fetch(process.env.REACT_APP_API_URL + '/transactions', {
//             headers: { 'Authorization': 'Bearer ' + token }
//         });
//         const data = await res.json();
//         return Array.isArray(data) ? data : [];
//     }


//     // function addNewTransaction(ev) {
//     //     ev.preventDefault();
//     //     //const url = 'http://localhost:4000/api/transactions';
//     //     const url = process.env.REACT_APP_API_URL + '/transactions';
//     //     const price = name.split(' ',)[0];
//     //     const isExpense = ev.nativeEvent.submitter.value === 'false';
//     //     const signedPrice = isExpense ? -Math.abs(Number(price)) : Math.abs(Number(price));

//     //     fetch(url, {
//     //     method: 'POST',
//     //     headers: {'Content-Type': 'application/json'},
//     //     body: JSON.stringify({
//     //         price: signedPrice,
//     //         name:name.substring(price.length+1),
//     //         description,
//     //         datetime,
//     //     })
//     //     }).then(res => {res.json().then(json => {

//     //         setTransactions([...transactions, json]);
//     //         setName('');
//     //         setDatetime('');
//     //         setDescription('');
//     //     });
//     //     });
//     // }

//     function addNewTransaction(ev) {
//         ev.preventDefault();
//         const url = process.env.REACT_APP_API_URL + '/transactions';
//         const price = name.split(' ')[0];
//         const isExpense = ev.nativeEvent.submitter.value === 'false';
//         const signedPrice = isExpense ? -Math.abs(Number(price)) : Math.abs(Number(price));

//         fetch(url, {
//             method: 'POST',
//             headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem('token')
//             },
//             body: JSON.stringify({
//             price: signedPrice,
//             name: name.substring(price.length + 1),
//             description,
//             datetime
//             })
//         })
//             .then(res => res.json())
//             .then(json => {
//             setTransactions([...transactions, json]);
//             setName('');
//             setDatetime('');
//             setDescription('');
//             });
//     }

//     async function login(username, password) {
//         const res = await fetch(process.env.REACT_APP_API_URL + '/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password })
//         });
//         const data = await res.json();
//         if (data.token) {
//             localStorage.setItem('token', data.token);
//             // redirect to transactions page or refresh data
//             getTransactions().then(setTransactions);
//         } else {
//             alert(data.error);
//         }
//     }

//     async function signup(username, password) {
//         const res = await fetch(process.env.REACT_APP_API_URL + '/signup', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password })
//         });
//         const data = await res.json();
//         if (data.message) alert('Signup success! Log in now.');
//         else alert(data.error);
//     }


//     function deleteTransaction(id) {
//         const url = process.env.REACT_APP_API_URL + '/transactions/' + id;

//         fetch(url, {
//         method: 'DELETE',
//         }).then(res => {
//         if (res.ok) {
//             setTransactions(transactions.filter(t => t._id !== id));
//         }
//         });
//     }

//     const balance = transactions
//     .reduce((sum, transaction) => sum + transaction.price, 0)
//     .toFixed(2);

//     const [integer, fraction] = balance.split('.');

//     return (
//         <main>
//         <h1>Buckeye Budget Tracker</h1>
//         <h1>${balance}<span>{fraction}</span></h1>
//         <SpendingChart transactions={transactions}/>
//         <form onSubmit={(ev) => addNewTransaction(ev)}>
//             <div className="basic">
//             <input type="text" 
//                             value={name} 
//                             onChange={ev => setName(ev.target.value)}
//                             placeholder={'+200 samsung tv'}/>
//             <input value={datetime} 
//                     onChange={ev => setDatetime(ev.target.value)} 
//                     type="datetime-local"/>
//             </div>
//             <div className="description">
//             <input type="text" 
//                     value={description} 
//                     onChange={ev => setDescription(ev.target.value)} 
//                     placeholder={'description'}/>
//             </div>
//             <button type="submit" value={true}>Add new income</button>        
//             <button type="submit" value={false}>Add new expense</button>
//         </form>
//         <div className="transactions">
//             {transactions.length > 0 && transactions.map(transaction => (
//             <div className="transaction">
//                 <div className="left">
//                 <div className="name">{transaction.name}</div>
//                 <div className="description">{transaction.description}</div>
//                 </div>
//                 <div className="right">
//                 <div className={"price " + (transaction.price<0?'red':'green')}>   
//                     {transaction.price}
//                 </div>
//                 <div className="datetime">{transaction.datetime}</div>
//                 <button className="delete-btn"onClick={() => deleteTransaction(transaction._id)}>
//                     Delete
//                 </button>
//                 </div>
//             </div>
//             ))}
//         </div>
//         </main>
//     );
// }

// export default Transactions;

// import React, { useState, useEffect } from 'react';
// import SpendingChart from '../components/myScript';
// import './App.css';

// function Transactions() {

//   const [name, setName] = useState('');
//   const [datetime, setDatetime] = useState('');
//   const [description, setDescription] = useState('');
//   const [transactions, setTransactions] = useState([]);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [isLoggedIn, setIsLoggedIn] = useState(!!token);

//   // Fetch transactions when component mounts or after login/signup
//   useEffect(() => {
//     const fetchTransactions = async () => {
//     if (!token) return;
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
//       headers: { 'Authorization': 'Bearer ' + token }
//     });
//     const data = await res.json();
//     setTransactions(Array.isArray(data) ? data : []);
//   };

//   fetchTransactions();
// }, [token]); 


//   // Fetch transactions for the logged-in user
//   async function getTransactions(tokenToUse) {
//     if (!tokenToUse) return [];

//     const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
//       headers: { 'Authorization': 'Bearer ' + tokenToUse }
//     });
//     const data = await res.json();
//     return Array.isArray(data) ? data : [];
//   }

//   // Add a new transaction
//   async function addNewTransaction(ev) {
//     ev.preventDefault();
//     if (!token) return alert('You must log in first.');

//     const url = `${process.env.REACT_APP_API_URL}/transactions`;
//     const price = name.split(' ')[0];
//     if (isNaN(Number(price))) return alert('Enter a valid price at the start of name.');

//     const isExpense = ev.nativeEvent.submitter.value === 'false';
//     const signedPrice = isExpense ? -Math.abs(Number(price)) : Math.abs(Number(price));

//     const res = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + token
//       },
//       body: JSON.stringify({
//         price: signedPrice,
//         name: name.substring(price.length + 1),
//         description,
//         datetime
//       })
//     });

//     const json = await res.json();
//     setTransactions([...transactions, json]);
//     setName('');
//     setDatetime('');
//     setDescription('');
//   }

//   // Delete a transaction
//   async function deleteTransaction(id) {
//     if (!token) return;

//     await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`, {
//       method: 'DELETE',
//       headers: { 'Authorization': 'Bearer ' + token }
//     });
//     setTransactions(transactions.filter(t => t._id !== id));
//   }

//   // Login function
//   async function login(ev) {
//     ev.preventDefault();

//     const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password })
//     });

//     const text = await res.text();
//     let data;
//     try {
//       data = JSON.parse(text);
//     } catch {
//       console.error('Login response is not JSON:', text);
//       return alert('Server error: ' + text);
//     }

//     if (data.token) {
//       localStorage.setItem('token', data.token);
//       setToken(data.token);
//       setIsLoggedIn(true);

//       // Use the token from login immediately
//       const transactions = await getTransactions(data.token);
//       setTransactions(transactions);
//     } else {
//       alert(data.error);
//     }
//   }


//   // Signup function
//   async function signup(ev) {
//     ev.preventDefault();
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password })
//     });
//     const data = await res.json();

//     if (data.message) alert('Signup successful! Please log in.');
//     else alert(data.error);
//   }

//   // Logout
//   function logout() {
//     localStorage.removeItem('token');
//     setToken('');
//     setIsLoggedIn(false);
//     setTransactions([]);
//   }

//   // Calculate balance
//   const balance = transactions.reduce((sum, t) => sum + t.price, 0).toFixed(2);
//   const [, fraction] = balance.split('.');

//   // Render login/signup if not logged in
//   if (!isLoggedIn) {
//     return (
//       <main>
//         <h1>Buckeye Budget Tracker</h1>
//         <form onSubmit={login}>
//           <h2>Login</h2>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={e => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>

//         <form onSubmit={signup}>
//           <h2>Signup</h2>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={e => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Signup</button>
//         </form>
//       </main>
//     );
//   }

//   // Render transactions if logged in
//   return (
//     <main>
//       <h1>Buckeye Budget Tracker</h1>
//       <button onClick={logout}>Logout</button>
//       <h1>${balance}<span>{fraction}</span></h1>

//       <SpendingChart transactions={transactions} />

//       <form onSubmit={addNewTransaction}>
//         <div className="basic">
//           <input
//             type="text"
//             value={name}
//             onChange={e => setName(e.target.value)}
//             placeholder="+200 groceries"
//           />
//           <input
//             type="datetime-local"
//             value={datetime}
//             onChange={e => setDatetime(e.target.value)}
//           />
//         </div>
//         <div className="description">
//           <input
//             type="text"
//             value={description}
//             onChange={e => setDescription(e.target.value)}
//             placeholder="Description"
//           />
//         </div>
//         <button type="submit" value={true}>Add Income</button>
//         <button type="submit" value={false}>Add Expense</button>
//       </form>

//       <div className="transactions">
//         {transactions.length > 0 && transactions.map(t => (
//           <div className="transaction" key={t._id}>
//             <div className="left">
//               <div className="name">{t.name}</div>
//               <div className="description">{t.description}</div>
//             </div>
//             <div className="right">
//               <div className={"price " + (t.price < 0 ? 'red' : 'green')}>
//                 {t.price}
//               </div>
//               <div className="datetime">{t.datetime}</div>
//               <button className="delete-btn" onClick={() => deleteTransaction(t._id)}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

// export default Transactions;

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
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch transactions when token changes
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
    if (!token) return alert('You must log in first.');

    const url = `${process.env.REACT_APP_API_URL}/transactions`;
    const price = name.split(' ')[0];
    if (isNaN(Number(price))) return alert('Enter a valid price at the start of name.');

    const isExpense = ev.nativeEvent.submitter.value === 'false';
    const signedPrice = isExpense ? -Math.abs(Number(price)) : Math.abs(Number(price));

    const res = await fetch(url, {
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
    setName('');
    setDatetime('');
    setDescription('');
  }

  // Delete a transaction
  async function deleteTransaction(id) {
    if (!token) return;

    await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    setTransactions(transactions.filter(t => t._id !== id));
  }

  // Login function
  async function login(ev) {
    ev.preventDefault();

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
        setPassword(''); // Clear password after login
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Network error. Please try again.');
    }
  }

  // Signup function
  async function signup(ev) {
    ev.preventDefault();
    
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (data.message) {
        alert('Signup successful! Please log in.');
        setPassword(''); // Clear password after signup
      } else {
        alert(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Network error. Please try again.');
    }
  }

  // Logout
  function logout() {
    setToken('');
    setIsLoggedIn(false);
    setTransactions([]);
    setUsername('');
    setPassword('');
  }

  // Calculate balance
  const balance = transactions.reduce((sum, t) => sum + t.price, 0).toFixed(2);
  const [, fraction] = balance.split('.');

  // Render login/signup if not logged in
  if (!isLoggedIn) {
    return (
      <main style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#bb0000' }}>🌰 Buckeye Budget Tracker</h1>
        
        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <form onSubmit={login}>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
            <button type="submit" style={{ padding: '10px 20px', background: '#bb0000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Login
            </button>
          </form>
        </div>

        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <form onSubmit={signup}>
            <h2>Signup</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
            <button type="submit" style={{ padding: '10px 20px', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Signup
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Render transactions if logged in
  return (
    <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#bb0000' }}>🌰 Buckeye Budget Tracker</h1>
        <button onClick={logout} style={{ padding: '8px 16px', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
      
      <h1 style={{ fontSize: '48px', margin: '20px 0' }}>
        ${balance}<span style={{ fontSize: '24px', color: '#999' }}>.{fraction}</span>
      </h1>

      <SpendingChart transactions={transactions} />

      <form onSubmit={addNewTransaction} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
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
        <button type="submit" value={true} style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
          Add Income
        </button>
        <button type="submit" value={false} style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Expense
        </button>
      </form>

      <div>
        {transactions.length > 0 ? transactions.map(t => (
          <div key={t._id} style={{ background: 'white', padding: '15px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #8d8a8aff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
    </main>
  );
}

export default Transactions;