import React from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'

import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import InfiniteScroll from "react-infinite-scroll-component";

// A great library for fuzzy filtering/sorting items
import {matchSorter} from 'match-sorter'

  // Define a default UI for filtering
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    )
  }
  
  // Define a default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }
  
  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }
  
  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val

  function MyTable({ columns, data, update, showDetails }) {
    const filterTypes = React.useMemo(
        () => ({
          // Add a new fuzzyTextFilterFn filter type.
          fuzzyText: fuzzyTextFilterFn,
          // Or, override the default text filter to use
          // "startWith"
          text: (rows, id, filterValue) => {
            return rows.filter(row => {
              const rowValue = row.values[id]
              return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
          },
        }),
        []
      )
    
      const defaultColumn = React.useMemo(
        () => ({
          // Let's set up our default Filter UI
          Filter: DefaultColumnFilter,
        }),
        []
      )
    
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
      } = useTable(
        {
          columns,
          data,
          defaultColumn, // Be sure to pass the defaultColumn option
          filterTypes,
        },
        useFilters, // useFilters!
        useGlobalFilter // useGlobalFilter!
      )

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
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                        </TableCell>
                    ))}
                    </TableRow>
                  ))}
                  <TableRow>
                    <th
                      colSpan={visibleColumns.length}
                      style={{
                        textAlign: 'left',
                      }}
                    >
                      <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                      />
                    </th>
                  </TableRow>
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