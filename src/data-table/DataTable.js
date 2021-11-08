import React from 'react';

const renderEmptyState = cols => (
    <tr colSpan="3">
        <td colSpan={cols.length}>There is no data in this table</td>
    </tr>
   );

const renderData = (data, cols) =>
   data.map(row =>
      <tr key={row.objectID}>
          {cols.map(col =>
             <td key={col.name}>{row[col.name]}</td>
          )}
      </tr>
   );

const DataTable = props => {
   return (
      <table>
         <thead>
            <tr>
               {props.cols.map(col =>
                  <th key={col.name}>{col.header}</th>
               )}
            </tr>
         </thead>
         <tbody>
            {props.data.length > 0 ? renderData(props.data, props.cols) : renderEmptyState(props.cols)}
         </tbody>
      </table>
  );
}

export default DataTable;