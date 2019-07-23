import React from 'react';
import useForm from './useForm';
import LoginButton from '../../components/LoginButton';

function Login({ login }) {
  const loginCallback = () => {
    login(values);
  };
  const { values, handleChange, handleSubmit } = useForm(loginCallback);

  return (
    <div className="container">
      <section>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="username"
              onChange={handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </section>
      <section>
        <LoginButton />
      </section>
    </div>
  );
}

export default Login;
