import React, { useEffect, useState, useMemo } from 'react';
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
  const [totalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { users, deletedUser } = props;

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

  const filterRows = () => (
    <>
      <input placeholder="Filter by name, email" name="filter" />
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
    console.log('pafe', page);
    // fetchUsers(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log('pafe newPerPage', newPerPage, page);
    // fetchUsers(page, newPerPage);
    // setPerPage(page, newPerPage);
  };

  useEffect(() => {
    if (Object.values(deletedUser).length && deletedUser.status === 200) {
      dispatch(getUsers());
    }
  }, [deletedUser, dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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
              paginationTotalRows={totalRows}
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
  users: state.users.getUsers,
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
