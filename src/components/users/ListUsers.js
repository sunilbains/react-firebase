import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import { getUsers } from '../../store/actions/UserAction';

const ListUsers = (props) => {
  const dispatch = useDispatch();
  const [loading] = useState(false);
  const [totalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { users } = props;

  const columns = useMemo(
    () => [
      {
        name: 'First Name',
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
        cell: () => <button>Delete</button>,
      },
    ],
    [],
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
          <h2 className="content-title">Users</h2>
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
