import React from 'react';
import { useAuth0 } from '../providers/auth0-provider';

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button className="btn btn-link" onClick={() => loginWithRedirect({})}>
          Log in with Google
        </button>
      )}

      {isAuthenticated && (
        <button className="btn btn-link" onClick={() => logout()}>
          Log out
        </button>
      )}
    </div>
  );
};

export default LoginButton;
