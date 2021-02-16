import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BreadcrumbCom = ({ items }) => (
  <>
    {items.length ? (
      <Breadcrumb>
        {items.map((item, i) => (
          <BreadcrumbItem key={i} active={item.active}>
            {item.active ? item.label : <Link to={item.to}>{item.label}</Link>}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    ) : (
      ''
    )}
  </>
);

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      to: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

export default BreadcrumbCom;
