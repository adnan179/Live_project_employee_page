import React, { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    ColumnFiltersState,
} from "@tanstack/react-table";

import { Employee } from "../types/employee";

interface Props{
    data:Employee[];
    onRowClick: (id:string) => void;
}

const EmployeeTable: React.FC<Props> = ({data, onRowClick}) => {
    const [pagination, setPagination] = useState({
        pageIndex:0,
        pageSize:15,
    });

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);


    // Define the columns for the employee table
    const columns: ColumnDef<Employee>[] = [
        {
            header:() => (
                <div className="flex items-center gap-2 cursor-pointer">
                    Name
                    <span className="text-sm">⇅</span>
                </div>
            ),
            accessorKey:"name",
            cell:(info) => info.getValue(),
            enableSorting:true,
        },
        {
            header:"Team",
            accessorKey:"team",
            enableColumnFilter:true,
        },
        {
            header:"Title",
            accessorKey:"title",
            enableColumnFilter:true
        },
    ];

    const table = useReactTable({
        data,
        columns,
        state:{
            pagination,
            sorting,
            columnFilters,
        },
        onPaginationChange:setPagination,
        onSortingChange:setSorting,
        onColumnFiltersChange:setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
        getSortedRowModel:getSortedRowModel(),
        getFilteredRowModel:getFilteredRowModel(),
    });

    return(
        <div className="space-y-4 hidden md:flex md:flex-col">
            {/* filters */}
            <div className="flex gap-4">
                <input 
                    type="text"
                    placeholder="Filter by Team"
                    value={(table.getColumn("team")?.getFilterValue() as string) ?? ""}
                    onChange={(e) => table.getColumn("team")?.setFilterValue(e.target.value)}
                    className="border px-4 py-2 rounded-md w-48 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input 
                    type="text"
                    placeholder="Filter by Title"
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
                    className="border px-4 py-2 rounded-md w-48 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
            {/* filters */}
            {/* employee table */}
            <table className="w-full border border-gray-200">
                <thead className="bg-gray-300">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th 
                                    key={header.id} 
                                    className="text-left px-4 py-2 border-b" 
                                    onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {{
                                        asc: " 🔼",
                                        desc: " 🔽",
                                    }[header.column.getIsSorted() as string] ?? null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hpver:bg-gray-50 cursor-pointer" onClick={() => onRowClick(row.original.id)}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-4 py-2 border-b">
                                    {flexRender(cell.column.columnDef.cell,cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* employee table */}
            {/* pagination controls */}
            <div className="flex flex-col gap-3 items-center justify-center mt-4">
                <div className="space-x-2">
                    <button onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:scale-105 transition-transform ease-in-out duration-200">
                        Previous
                    </button>
                    <button onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:scale-105 transition-transform ease-in-out duration-200">
                        Next
                    </button>
                </div>
                <span>Page{" "}
                    <strong>{table.getState().pagination.pageIndex+1} of {" "} {table.getPageCount()}</strong>
                </span>
            </div>
            {/* pagination controls */}
        </div>
    )
}

export default EmployeeTable;