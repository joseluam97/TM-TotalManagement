import React, { useEffect, useMemo } from "react";
import { useTable, useFilters, useGroupBy, useExpanded } from "react-table";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Table = ( { rowsProp, columnsProp, groups } ) => {


  const data = useMemo(
    () => rowsProp,
    [rowsProp]
  );

  const columns = useMemo(
    () => columnsProp
    ,
    [columnsProp]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    footerGroups
  } = useTable(
    {
      columns,
      data,
      initialState: { groupBy: groups },
    },
    useFilters,
    useGroupBy,
    useExpanded
  );

  const handleFilterChange = (e, columnId) => {
    setFilter(columnId, e.target.value);
  };

  const rowStyles = {
    height: "52px",
    verticalAlign: "middle",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  }

  return (
    <div>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} style={rowStyles} >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className={"text-center"}>
                  {column.canGroupBy ? (
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}{" "}
                    </span>
                  ) : null}
                  {column.render("Header")}
                  <div>
                    <input
                      value={column.filterValue || ""}
                      onChange={(e) => handleFilterChange(e, column.id)}
                      className="text-center"
                      placeholder="Filter"
                    />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="border-white">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <React.Fragment key={row.getRowProps().key}>
                <tr {...row.getRowProps()} style={rowStyles}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}

                     className={"text-center"}>
                      {cell.isGrouped ? (
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                          </span>{" "}
                          {cell.render("Cell")} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : (
                        cell.render("Cell")
                      )}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
        <tfoot>
        {footerGroups.map(group => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map(column => (
              <td {...column.getFooterProps()} className={"text-center"}>{column.render('Footer')}</td>
            ))}
          </tr>
        ))}
      </tfoot>
      </table>
    </div>
  );
};

export default Table;










































// import React, { useMemo } from "react";
// import { useTable, useFilters, useGroupBy, useExpanded } from "react-table";
// import CssBaseline from '@material-ui/core/CssBaseline'
// import MaUTable from '@material-ui/core/Table'

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@material-ui/core";

// const CustomTable = ({ columns, data, handleFilterChange }) => {
//   return (
//     <Table className="table table-striped">
//       <TableHead>
//         {columns.map((column) => (
//           <TableCell key={column.id} {...column.getHeaderProps()}>
//             {column.canGroupBy && (
//               <span {...column.getGroupByToggleProps()}>
//                 {column.isGrouped ? "[-]" : "[+]"}{" "}
//               </span>
//             )}
//             {column.render("Header")}
//             <div>
//               <TextField
//                 value={column.filterValue || ""}
//                 onChange={(e) => handleFilterChange(e, column.id)}
//               />
//             </div>
//           </TableCell>
//         ))}
//       </TableHead>
//       <TableBody>
//         {data.map((row) => {
//           return (
//             <React.Fragment key={row.getRowProps().key}>
//               <TableRow {...row.getRowProps()}>
//                 {row.cells.map((cell) => (
//                   <TableCell
//                     key={cell.getCellProps().key}
//                     {...cell.getCellProps()}
//                     style={{
//                       background: cell.isGrouped
//                         ? "#0aff0082"
//                         : cell.isAggregated
//                         ? "#ffa50078"
//                         : cell.isPlaceholder
//                         ? "#ff000042"
//                         : "white",
//                     }}
//                   >
//                     {cell.isGrouped ? (
//                       <>
//                         <span {...row.getToggleRowExpandedProps()}>
//                           {row.isExpanded ? "👇" : "👉"}
//                         </span>{" "}
//                         {cell.render("Cell")} ({row.subRows.length})
//                       </>
//                     ) : cell.isAggregated ? (
//                       cell.render("Aggregated")
//                     ) : cell.isPlaceholder ? null : (
//                       cell.render("Cell")
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//               {row.isExpanded && (
//                 <TableRow>
//                   <TableCell colSpan={columns.length}>
//                     {row.canGroupBy && (
//                       <span {...row.getToggleRowExpandedProps()}>
//                         {row.isExpanded ? "[-]" : "[+]"}{" "}
//                       </span>
//                     )}
//                     Subfila(s) aquí
//                   </TableCell>
//                 </TableRow>
//               )}
//             </React.Fragment>
//           );
//         })}
//       </TableBody>
//     </Table>
//   );
// };

// export default CustomTable;


