import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './AuthService';

const Login = () => {
  const [mail, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(mail, btoa(password));
      navigate('/dashboard'); // Redirigir al dashboard si el login es exitoso
    } catch (err) {
      setError(err.message);
    }
  };

  return (


    <div className="content-container">
    <div className="absolute-container2"> 
  
  
    <div align="left">
      <h2></h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin} className="responsive-form">
        <div align="left">
        
          <input
          className="responsive-input"
            type="text"
            value={mail}
             placeholder="Usuario:"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
       
          <input
          className="responsive-input"
            type="password"
             placeholder="Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="orange-button" className="responsive-button" type="submit">Login</button>
      </form>
    </div>

    </div>
    </div>
  );
};

export default Login;
