import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
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
  };

  return (
    <>
      <div id="wrapper">
        <section id="content-wrapper">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="content-title">Test</h2>
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
                              message: 'Please enter an email address',
                            },
                            pattern: {
                              value: Regex.email,
                              message: 'Email address must be a valid email',
                            },
                          })}
                        />
                        <span className="error-style">
                          {errors.email && errors.email.message}
                        </span>
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
                              message: 'Please enter a password',
                            },
                            pattern: {
                              value: Regex.password,
                              message: 'Password must be a valid',
                            },
                          })}
                        />
                        <span className="error-style">
                          {errors.password && errors.password.message}
                        </span>
                      </div>
                      <button type="submit" className="btn btn-secondary">
                        {loading ? 'Loading...' : 'Login'}{' '}
                        <i className="material-icons right">send</i>
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
