import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import { Spinner } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';

const UserFields = ({ user, onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    if (Object.values(user).length) {
      setValue('gender', user.gender);
      setValue('dob', new Date(user.dob));
    }
  }, [user, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="col-12">
        <div className="row">
          <div className="form-group col-12">
            <label htmlFor="exampleFormControlFile1">Profile Image</label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              name="image"
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
                  defaultValue={user.name}
                />
                <span className="error-style">
                  {errors.name && errors.name.message}
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
                defaultValue={user.countryCode}
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
                defaultValue={user.phone}
              />
              <span className="error-style">
                {errors.phone && errors.phone.message}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          {Object.values(user).length > 0 || (
            <>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Email address
                  </label>
                  <input
                    type="text"
                    placeholder="Email address"
                    className="form-control"
                    name="email"
                    id="email"
                    ref={register({
                      required: 'Email Address is required.',
                    })}
                    defaultValue={user.email}
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
                        validate: (value) =>
                          value === getValues('password') ||
                          'The passwords do not match',
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
            </>
          )}
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
                id="city"
                defaultValue={user.city}
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
                id="state"
                className="form-control"
                placeholder="State"
                ref={register({
                  required: 'State is required.',
                })}
                defaultValue={user.state}
              />
              <span className="error-style">
                {errors.state && errors.state.message}
              </span>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                className="form-control"
                placeholder="Country"
                ref={register({ required: 'Country is required.' })}
                defaultValue={user.country}
              />
              <span className="error-style">
                {errors.country && errors.country.message}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="exampleRadios1">Gender</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
                ref={register({ required: 'Gender is required.' })}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="female"
                ref={register({ required: 'Gender is required.' })}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="other"
                value="other"
                ref={register({ required: 'Gender is required.' })}
              />
              <label className="form-check-label" htmlFor="other">
                Other
              </label>
            </div>
            <span className="error-style">
              {errors.gender && errors.gender.message}
            </span>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="dob">DOB</label>
              {/* </div> */}
              {/* <div className="form-group"> */}
              <br />
              <Controller
                control={control}
                name="dob"
                defaultValue=""
                rules={{ required: 'DOB is required.' }}
                render={({ onChange, onBlur, value }) => (
                  <DatePicker
                    id="dob"
                    className="form-control"
                    selected={value}
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    onBlur={onBlur}
                    peekNextMonth
                    dateFormat="yyyy-MM-dd"
                    dropdownMode="select"
                    onChange={onChange}
                  />
                )}
              />

              <span className="error-style">
                {errors.dob && errors.dob.message}
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
                defaultValue={user.zipCode}
              />
              <span className="error-style">
                {errors.zipCode && errors.zipCode.message}
              </span>
            </div>
          </div>
        </div>
        <div className="row" />
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
    status: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

export default UserFields;
