import React, { useState } from 'react';
import { Spinner } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Regex } from '../../constants/config';
import logoWhite from '../../assests/static-images/logo_white.png';

const Register = () => {
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (values) => {
    setLoading(true);
    console.log('s', values);
  };

  return (
    <>
      <div className="wrapper d-flex align-items-stretch register">
        <div className="row">
          <div className="col-md-3 register-left">
            <img src={logoWhite} alt="Register" />
            <h3>Welcome</h3>
            <p>You are 30 seconds away from earning your own money!</p>
            <a href="/login" className="customBtn">
              Login
            </a>
            <br />
          </div>
          <div className="col-md-9 register-right">
            <ul
              className="nav nav-tabs nav-justified"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Employee
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Hirer
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 className="register-heading">Apply as a Employee</h3>
                  <div className="row register-form">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="first_name"
                          className="form-control"
                          placeholder="First Name *"
                          ref={register({
                            required: {
                              value: true,
                              message: 'Please enter First Name.',
                            },
                          })}
                        />{' '}
                        <span className="error-style">
                          {errors.first_name && errors.first_name.message}
                        </span>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password *"
                        />
                      </div>
                      <div className="form-group">
                        <div className="maxl">
                          <label className="radio inline">
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              defaultChecked="checked"
                            />
                            <span> Male </span>
                          </label>
                          <label className="radio inline">
                            <input type="radio" name="gender" value="female" />
                            <span>Female </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="Your Email Address"
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
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          minLength="10"
                          maxLength="10"
                          name="txtEmpPhone"
                          className="form-control"
                          placeholder="Your Phone *"
                        />
                      </div>
                      <div className="form-group">
                        <select className="form-control">
                          <option>Select your Sequrity Question</option>
                          <option>What is your Birthdate?</option>
                          <option>What is Your old Phone Number</option>
                          <option>What is your Pet Name?</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Your Answer *"
                        />
                      </div>
                      <button type="submit" className="btnRegister">
                        {loading && (
                          <Spinner
                            color="primary"
                            style={{ width: '1.5rem', height: '1.5rem' }}
                          />
                        )}{' '}
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div
                className="tab-pane fade show"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <h3 className="register-heading">Apply as a Hirer</h3>
                <div className="row register-form">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name *"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name *"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email *"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        maxLength="10"
                        minLength="10"
                        className="form-control"
                        placeholder="Phone *"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password *"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password *"
                      />
                    </div>
                    <div className="form-group">
                      <select className="form-control">
                        <option className="hidden">
                          Select your Sequrity Question
                        </option>
                        <option>What is your Birthdate?</option>
                        <option>What is Your old Phone Number</option>
                        <option>What is your Pet Name?</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="`Answer *"
                      />
                    </div>
                    <input
                      type="submit"
                      className="btnRegister"
                      value="Register"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
