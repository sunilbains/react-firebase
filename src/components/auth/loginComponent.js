import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { API_URL, Regex } from '../../constants/config';

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (data.status === 200) {
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('userEmail', data.data.user.email);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      props.history.push('/users');
    } else if (data.status === 401 || data.status === 404) {
      Swal.fire('Oops...', data.message, 'error');
    }
    setLoading(false);
  };

  return (
    <>
      <div id="wrapper">
        <section id="content-wrapper">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="content-title">Login Form</h3>
              <div className="main">
                <div className="col-md-6 col-sm-12">
                  <div className="login-form">
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          ref={register({
                            required: {
                              value: true,
                              message: 'Please enter an email address.',
                            },
                            pattern: {
                              value: Regex.email,
                              message: 'Email address must be a valid email.',
                            },
                          })}
                        />
                        <span className="error-style">
                          {errors.email && errors.email.message}
                        </span>
                        <Link to="register" className="float-right">
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          ref={register({
                            required: {
                              value: true,
                              message: 'Please enter a password.',
                            },
                            pattern: {
                              value: Regex.password,
                              message: 'Password must be a valid.',
                            },
                          })}
                        />
                        <span className="error-style">
                          {errors.password && errors.password.message}
                        </span>
                      </div>
                      <Link to="register">Register</Link>
                      <button
                        type="submit"
                        className="btn btn-secondary float-right"
                      >
                        {loading && (
                          <Spinner
                            color="primary"
                            style={{ width: '1.5rem', height: '1.5rem' }}
                          />
                        )}{' '}
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
