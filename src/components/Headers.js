import React from 'react';
import { useAuth } from './Auth/AuthProvider';

const Header = () => {
  const { user, login, logout } = useAuth();

  return (
    <header>
      <h1>Beer List</h1>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </header>
  );
};

export default Header;
