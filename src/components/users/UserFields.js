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
      <div className="form-row">
        <div className="col-3">
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
        <div className="col-3">
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
        <div className="col-3">
          <input
            type="text"
            name="zip"
            className="form-control"
            placeholder="Zip"
            ref={register({ required: 'Zip is required.' })}
          />
          <span className="error-style">
            {errors.zip && errors.zip.message}
          </span>
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
