import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Badge } from 'reactstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import BreadcrumbCom from '../partials/BreadcrumbCom';
import { getUsers, deleteUser } from '../../store/actions/UserAction';

const ListUsers = (props) => {
  const dispatch = useDispatch();
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { users, deletedUser, count } = props;

  const BreadItems = [
    { to: '/', label: 'Dashboard' },
    { to: '/users', label: 'Users', active: true },
  ];

  const getColor = (gender) => {
    switch (gender) {
      case 'male':
        return 'success';
      case 'female':
        return 'warning';
      case 'other':
        return 'info';
      default:
        return 'danger';
    }
  };

  const columns = useMemo(
    () => [
      {
        name: 'Full Name',
        selector: 'name',
        sortable: true,
      },
      {
        name: 'Gender',
        selector: 'gender',
        sortable: true,
        cell: (e) => <Badge color={getColor(e.gender)}>{e.gender}</Badge>,
      },
      {
        name: 'Phone',
        selector: 'phone',
        sortable: true,
      },
      {
        name: 'Email',
        selector: 'email',
        sortable: true,
      },
      {
        name: 'DOB',
        selector: 'dob',
      },
      {
        // eslint-disable-next-line react/button-has-type
        cell: (e) => (
          <>
            <Link to={`/users/${e.id}`} className="nav-link text-success">
              <i className="fa fa-edit" aria-hidden="true" />
            </Link>
            <Badge
              color="danger"
              title="Delete User"
              onClick={() => {
                Swal.fire({
                  icon: 'warning',
                  title: 'Are you sure?',
                  text: 'You want to delete this user?',
                  showConfirmButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  showCancelButton: true,
                  cancelButtonText: 'No, keep it',
                }).then((confirm) => {
                  if (confirm.value) {
                    dispatch(deleteUser(e.id));
                  }
                });
              }}
            >
              <i className="fa fa-trash" aria-hidden="true" />
            </Badge>
          </>
        ),
      },
    ],
    [dispatch],
  );

  const fetchEmployees = useCallback(
    (query) => {
      dispatch(getUsers(query));
    },
    [dispatch],
  );

  const filterRows = () => (
    <>
      <input
        placeholder="Filter by name, email"
        name="filter"
        onKeyUp={(e) =>
          fetchEmployees(
            `page=${currentPage}&limit=${perPage}&filter=${e.target.value}`,
          )
        }
      />
      <Link
        to="/add-user"
        className="btn btn-info btn-sm"
        title="Edit Employee"
      >
        <i className="fa fa-plus" aria-hidden="true" /> User
      </Link>
    </>
  );

  const handlePageChange = (page) => {
    // console.log('pafe', page);
    // fetchUsers(page);
    setCurrentPage(page);
    fetchEmployees(`page=${page}&limit=${perPage}`);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // console.log('pafe newPerPage', newPerPage, page);
    setPerPage(newPerPage);
    fetchEmployees(`page=${page}&limit=${perPage}`);
    // fetchUsers(page, newPerPage);
    // setPerPage(page, newPerPage);
  };

  useEffect(() => {
    if (Object.values(deletedUser).length && deletedUser.status === 200) {
      dispatch(getUsers());
    }
  }, [deletedUser, dispatch]);

  useEffect(() => {
    fetchEmployees(`page=${currentPage}&limit=${perPage}`);
    // dispatch(getUsers());
  }, [fetchEmployees, currentPage, perPage]);

  return (
    <div>
      <Sidebar />
      <Header />
      <section id="content-wrapper">
        <BreadcrumbCom items={BreadItems} />
        <div className="main">
          <div className="col-lg-12 col-sm-12">
            <DataTable
              columns={columns}
              data={users}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={count}
              paginationDefaultPage={currentPage}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              selectableRows
              subHeader
              subHeaderComponent={filterRows()}
              onSelectedRowsChange={({ selectedRows }) =>
                console.log(selectedRows)
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users.getUsers.users,
  count: state.users.getUsers.count,
  deletedUser: state.users.deleteUser,
  errors: state.errors,
});

ListUsers.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
  deletedUser: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, { getUsers, deleteUser })(ListUsers);
