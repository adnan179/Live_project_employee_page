import React from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef
} from "@tanstack/react-table";

import { Employee } from "../types/employee";

interface Props{
    data:Employee[];
    onRowClick: (id:string) => void;
}

const columns: ColumnDef<Employee>[] = [
    {
        header:"Name",
        accessorKey:"name"
    },
    {
        header:"Team",
        accessorKey:"team"
    },
    {
        header:"Title",
        accessorKey:"title"
    },
];

const EmployeeTable: React.FC<Props> = ({data, onRowClick}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return(
        <table className="w-full border border-gray-200">
            <thead className="bg-gray-300">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="text-left px-4 py-2 border-b">
                                {flexRender(header.column.columnDef.header, header.getContext())}
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
    )
}

export default EmployeeTable;