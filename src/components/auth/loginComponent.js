import React, { useState } from 'react';
import './login.styles.css';
import { Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { API_URL, Regex } from '../../constants/config';

const Login = (props) => {
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({});
  const [loading] = useState(false);

  const handleChange = (event) => {
    event.persist();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event, errors) => {
    event.persist();
    if (errors.length === 0) {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.status === 200) {
        setMessage('');
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('userEmail', data.data.user.email);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        props.history.push('/users');
      } else if (data.status === 400 || data.status === 404) {
        setMessage(data.message);
        setInterval(() => {
          setMessage('');
        }, 5000);
      }
    }
  };

  return (
    <>
      <div className="Login">
        {message && <p className="error-style">{message}</p>}

        <AvForm className="register-form" onSubmit={handleSubmit}>
          <AvField
            name="email"
            label="Email Address"
            value={values.email || ''}
            type="email"
            onChange={handleChange}
            autoComplete="off"
            validate={{
              required: {
                value: true,
                errorMessage: 'Please enter an email address',
              },
              pattern: {
                value: Regex.email,
                errorMessage: 'Email address should be a valid email',
              },
            }}
          />
          <AvField
            name="password"
            label="Password"
            value={values.password || ''}
            type="password"
            onChange={handleChange}
            autoComplete="off"
            validate={{
              required: {
                value: true,
                errorMessage: 'Please enter a password',
              },
              minLength: {
                value: 4,
                errorMessage:
                  'Your password must be between 4 and 16 characters',
              },
              maxLength: {
                value: 16,
                errorMessage:
                  'You password name must be between 6 and 16 characters',
              },
            }}
          />

          <Button className="primary-btn signup-btn">
            {loading ? 'Loading...' : 'Login'}{' '}
            <i className="material-icons right">send</i>
          </Button>
        </AvForm>
      </div>
    </>
  );
};

export default Login;
