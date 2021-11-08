import React from 'react';
import {useTable} from 'react-table';

import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import InfiniteScroll from "react-infinite-scroll-component";

function MyTable({ columns, data, update, showDetails }) {
    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
          columns,
          data
        },
    );

   
  
    // Render the UI for your table
    return (
        <InfiniteScroll
            dataLength={rows.length}
            next={update}
            hasMore={true}
            loader={<h4>Loading latest posts...</h4>}
        >
            <MaUTable {...getTableProps()}>
                <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <TableCell {...column.getHeaderProps()}>
                        {column.render('Header')}
                        </TableCell>
                    ))}
                    </TableRow>
                ))}
                </TableHead>
                <TableBody>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                    <TableRow {...row.getRowProps()} onClick={() => showDetails(row.original)}>
                        {row.cells.map(cell => {
                        return (
                            <TableCell {...cell.getCellProps()}>
                            {cell.render('Cell')}
                            </TableCell>
                        )
                        })}
                    </TableRow>
                    )
                })}
                </TableBody>
            </MaUTable>
        </InfiniteScroll>
    )
  }

  export default MyTable;