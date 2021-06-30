import {
  Pagination as AtomPagination,
  PaginationItem,
  PaginationLink
} from 'atoms';
import {ChevronLeft, ChevronRight, EllipsisH} from "atoms/icons";
import PropTypes from "prop-types";
import React from "react";

const Pagination = ({ total, skip, limit, loading, onChange, children, ...paginateProps }) => {

  const totalPages = Math.ceil(total / limit)
  let page = Math.floor(skip / limit) + 1
  const isLastPage = page === totalPages
  if(total <= limit) return null

  const clickHandler = p => {
    if (loading || p === page) return
    onChange((p - 1) * limit)
  }

  return (
    <AtomPagination {...paginateProps}>
      <PaginationItem disabled={page === 1} onClick={e => page !== 1 && clickHandler(page - 1)}>
        <PaginationLink previous><ChevronLeft/></PaginationLink>
      </PaginationItem>
      {page > 3 ?
        <PaginationItem onClick={e => clickHandler(1)}>
          <PaginationLink first>1</PaginationLink>
        </PaginationItem>
        : null
      }
      {page > 4 ?
        <PaginationItem disabled>
          <PaginationLink className="page-link text-muted"><EllipsisH /></PaginationLink>
        </PaginationItem>
        : null
      }
      {page > 2 ?
        <PaginationItem onClick={e => clickHandler(page - 2)}>
          <PaginationLink>{page-2}</PaginationLink>
        </PaginationItem>
        : null
      }
      {page > 1 ?
        <PaginationItem onClick={e => clickHandler(page - 1)}>
          <PaginationLink>{page-1}</PaginationLink>
        </PaginationItem>
        : null
      }
      <PaginationItem active>
        <PaginationLink href="javascript: void(0)">{page}</PaginationLink>
      </PaginationItem>
      {page < totalPages ?
        <PaginationItem onClick={e => clickHandler(page + 1)}>
          <PaginationLink>{page+1}</PaginationLink>
        </PaginationItem>
        : null
      }
      {page < totalPages - 1 ?
        <PaginationItem onClick={e => clickHandler(page + 2)}>
          <PaginationLink>{page+2}</PaginationLink>
        </PaginationItem>
        : null
      }
      {page < totalPages - 3 ?
        <PaginationItem disabled>
          <PaginationLink className="page-link text-muted"><EllipsisH /></PaginationLink>
        </PaginationItem>
        : null
      }
      {page < totalPages - 2 ?
        <PaginationItem onClick={e => clickHandler(totalPages)}>
          <PaginationLink last>{totalPages}</PaginationLink>
        </PaginationItem>
        : null
      }
      <PaginationItem disabled={isLastPage} onClick={e => !isLastPage && clickHandler(page + 1)}>
        <PaginationLink next><ChevronRight/></PaginationLink>
      </PaginationItem>
      {children && <li className="ms-auto">{children}</li>}
    </AtomPagination>
  )
}

export default Pagination

Pagination.propTypes = {
  ...AtomPagination.propTypes,
  total: PropTypes.number.isRequired,
  skip: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
}

Pagination.defaultProps = {
  ...AtomPagination.defaultProps,
  listClassName: "d-flex justify-contents-center align-items-center",
  loading: false,
  onChange: (skip) => {
    console.log('$skip', skip)
  }
}
