import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Badge } from 'reactstrap';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import { getEmployees } from '../../store/actions/EmployeeAction';

const ListEmployees = (props) => {
  const dispatch = useDispatch();
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { employees, count } = props;

  const columns = useMemo(
    () => [
      {
        name: 'Id',
        selector: 'id',
        sortable: true,
        width: '100px',
      },
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
        name: 'Created At',
        selector: 'createdAt',
        sortable: true,
      },
      {
        cell: () => (
          <>
            <Badge color="info" title="Edit Employee">
              <i className="fa fa-edit" aria-hidden="true" />
            </Badge>
            <Badge color="danger" title="Delete Employee">
              <i className="fa fa-trash" aria-hidden="true" />
            </Badge>
          </>
        ),
        width: '100px',
      },
    ],
    [],
  );

  const fetchEmployees = useCallback(
    (query) => {
      dispatch(getEmployees(query));
    },
    [dispatch],
  );

  const filterRows = () => (
    <>
      <input
        placeholder="Filter by name"
        name="filter"
        onKeyUp={(e) =>
          fetchEmployees(
            `page=${currentPage}&limit=${perPage}&filter=${e.target.value}`,
          )
        }
      />
    </>
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchEmployees(`page=${page}&limit=${perPage}`);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    fetchEmployees(`page=${page}&limit=${perPage}`);
  };

  useEffect(() => {
    fetchEmployees(`page=${currentPage}&limit=${perPage}`);
  }, [fetchEmployees, currentPage, perPage]);

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <Header />
        <section id="content-wrapper">
          <h2 className="content-title">Employees</h2>
          <div className="main">
            <div className="col-lg-12 col-sm-12">
              <DataTable
                columns={columns}
                data={employees}
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
    </>
  );
};

const mapStateToProps = (state) => ({
  employees: state.employees.getEmployees.employees,
  count: state.employees.getEmployees.count,
  errors: state.errors,
});

ListEmployees.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, { getEmployees })(ListEmployees);
