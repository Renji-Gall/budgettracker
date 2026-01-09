import React, { useState } from 'react';


export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignup(ev) {
    ev.preventDefault();
    const res = await fetch(process.env.REACT_APP_API_URL + '/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.message) alert('Signup success! Log in now.');
    else alert(data.error);
  }

  return (
    <form onSubmit={handleSignup}>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Signup</button>
    </form>
  );
}
