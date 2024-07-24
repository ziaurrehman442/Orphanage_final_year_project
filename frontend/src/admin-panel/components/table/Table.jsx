import React from 'react';
import './table.scss'; // Import custom styles

const CustomTable = ({ data, columns }) => {
  return (
    <div className="custom-table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.field} style={{ width: column.width }}>
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              {columns.map(column => (
                <td key={column.field} style={{ width: column.width }}>
                  {row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
