import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Table as AtomTable } from 'atoms';
import getByDot from 'lodash/get'

const InnerTd = ({ row, col }) => {
  return useMemo(() => {
    const defaultValue = col.default || null
    const propName = col.propName || 'data'
    if (col.key) return getByDot(row, col.key, defaultValue);
    else if (col.render) return col.render(row) || defaultValue;
    else if (col.Component) return React.createElement(col.Component, { [propName]: row }, col.children);
    else return defaultValue
  }, [row, col])
}

const TableConfig = {

}

const Table = ({ data, map, index, skip, footer, ...tableProps }) => {
  return (
    <AtomTable {...tableProps}>
      <thead>
        <tr>
          {!index ? null : <th scope="col">#</th>}
          {map.map((col, j) => (
            <th scope="col" key={j} className={col.className} width={col.width || 'auto'}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {!index ? null : <th scope="row" className="vertical-align-middle">{i + 1 + skip}</th>}
          {map.map((col, j) => (
            <td className={`vertical-align-middle ${col.className}`} key={j}><InnerTd col={col} row={row}/></td>
          ))}
        </tr>
      ))}
      </tbody>
      {footer && (
        <tfoot>
          <tr>
            <td colspan={map.length + +index}>{footer}</td>
          </tr>
        </tfoot>
      )}
    </AtomTable>
  )
}

export default Table;

const mapItemCommonKeys = {
  title: PropTypes.node.isRequired,
  default: PropTypes.string,
  className: PropTypes.string,
}

Table.propTypes = {
  ...AtomTable.propTypes,
  index: PropTypes.bool,
  data: PropTypes.array.isRequired,
  skip: PropTypes.number,
  map: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      ...mapItemCommonKeys,
      key: PropTypes.string.isRequired
    }),
    PropTypes.shape({
      ...mapItemCommonKeys,
      render: PropTypes.func.isRequired
    }),
    PropTypes.shape({
      ...mapItemCommonKeys,
      propName: PropTypes.string.isRequired,
      Component: PropTypes.elementType.isRequired
    })
  ])).isRequired,
  footer: PropTypes.node
}

Table.defaultProps = {
  ...AtomTable.defaultProps,
  striped: true,
  hover: true,
  size: "sm",
  index: true,
  data: [],
  skip: 0,
  map: [{
    title: 'ID',
    key: '_id'
  }],
  footer: null,
}
