import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Spinner } from 'reactstrap';

const UserFields = ({ user, onSubmit, loading }) => {
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    // if (Object.values(user).length) {
    // }
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="col-12">
        <div className="row">
          <div className="form-group col-12">
            <label htmlFor="exampleFormControlFile1">Example file input</label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
            />
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="full_name">Full Name</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="full name"
                  ref={register({
                    required: 'Full name is required.',
                  })}
                  name="name"
                  id="full_name"
                />
                <span className="error-style">
                  {errors.name && errors.name.message}
                </span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Email address</label>
              <input
                type="text"
                placeholder="Email address"
                className="form-control"
                name="email"
                id="email"
                ref={register({
                  required: 'Email Address is required.',
                })}
              />
              <span className="error-style">
                {errors.email && errors.email.message}
              </span>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                id="password"
                className="form-control"
                placeholder="Password"
                ref={register({ required: 'Password is required.' })}
              />
              <span className="error-style">
                {errors.password && errors.password.message}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Confirm Password"
                  ref={register({
                    required: 'Confirm Password is required.',
                  })}
                  name="confirmPassword"
                  id="confirmPassword"
                />
                <span className="error-style">
                  {errors.confirmPassword && errors.confirmPassword.message}
                </span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="countryCode">Country Code</label>
              <input
                type="text"
                placeholder="Country Code"
                className="form-control"
                name="countryCode"
                id="countryCode"
                ref={register({
                  required: 'Country Code is required.',
                })}
              />
              <span className="error-style">
                {errors.countryCode && errors.countryCode.message}
              </span>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Phone number"
                ref={register({ required: 'Phone number is required.' })}
              />
              <span className="error-style">
                {errors.phone && errors.phone.message}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                placeholder="City"
                ref={register({
                  required: 'City is required.',
                })}
                name="city"
              />
              <span className="error-style">
                {errors.city && errors.city.message}
              </span>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                placeholder="State"
                ref={register({
                  required: 'State is required.',
                })}
              />
              <span className="error-style">
                {errors.state && errors.state.message}
              </span>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                className="form-control"
                placeholder="Zip Code"
                ref={register({ required: 'Zip Code is required.' })}
              />
              <span className="error-style">
                {errors.zipCode && errors.zipCode.message}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="form-check">
              {/* <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="option1"
                checked
              /> */}
              <label className="form-check-label" htmlFor="exampleRadios1">
                Default radio
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="option2"
              />
              <label className="form-check-label" htmlFor="exampleRadios2">
                Second default radio
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios3"
                value="option3"
                disabled
              />
              <label className="form-check-label" htmlFor="exampleRadios3">
                Disabled radio
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="dob">DOB</label>
              <input
                type="text"
                name="dob"
                id="dob"
                className="form-control"
                placeholder="Zip Code"
                ref={register({ required: 'Zip Code is required.' })}
              />
              <span className="error-style">
                {errors.dob && errors.dob.message}
              </span>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-secondary float-right">
          {loading && (
            <Spinner
              color="primary"
              style={{ width: '1.5rem', height: '1.5rem' }}
            />
          )}{' '}
          Login
        </button>
      </div>
    </form>
  );
};

UserFields.propTypes = {
  user: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }).isRequired,
};

export default UserFields;
