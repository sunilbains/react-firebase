import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { API_URL, Regex } from '../../constants/config';

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    console.log('values', values);
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
      <div className="form-layout">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <input
            name="email"
            type="text"
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

          <input
            name="password"
            type="password"
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
          <button type="submit" className="primary-btn signup-btn">
            {loading ? 'Loading...' : 'Login'}{' '}
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
