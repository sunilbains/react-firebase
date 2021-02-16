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
import { getUsers } from '../../store/actions/UserAction';

const ListUsers = (props) => {
  const dispatch = useDispatch();
  const [loading] = useState(false);
  const [totalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { users } = props;

  const BreadItems = [
    { to: '/', label: 'Dashboard' },
    { label: 'Users', to: '/users', active: true },
  ];

  const columns = useMemo(
    () => [
      {
        name: 'Full Name',
        selector: 'name',
        sortable: true,
      },
      {
        name: 'Email',
        selector: 'email',
        sortable: true,
      },
      {
        // eslint-disable-next-line react/button-has-type
        cell: () => (
          <>
            <Link to="/" className="nav-link text-success">
              <i className="fa fa-edit" aria-hidden="true" />
            </Link>
            <Badge
              color="danger"
              title="Delete User"
              onClick={() => {
                Swal.fire('Oops...', 'data.message', 'error');
              }}
            >
              <i className="fa fa-trash" aria-hidden="true" />
            </Badge>
          </>
        ),
      },
    ],
    [],
  );

  const filterRows = () => (
    <>
      <input placeholder="Filter by name, email" name="filter" />
      <Link to="/" className="btn btn-info btn-sm" title="Edit Employee">
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
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <div id="wrapper">
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
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.users.getUsers,
  errors: state.errors,
});

ListUsers.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, { getUsers })(ListUsers);
