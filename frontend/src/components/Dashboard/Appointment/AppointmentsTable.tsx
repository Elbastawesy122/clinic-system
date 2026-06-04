"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
interface Props<TData, TValue> {
    columns:
    ColumnDef<TData, TValue>[];

    data: TData[];
}
export function AppointmentsTable
    <TData, TValue>({
        columns,
        data,
    }: Props<TData, TValue>) {

    const table =
        useReactTable({
            data,
            columns,
            getCoreRowModel:
                getCoreRowModel(),
            getPaginationRowModel:
                getPaginationRowModel(),
        });


    return (
        <div className="rounded-3xl border bg-white overflow-hidden">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                        >
                            {headerGroup.headers.map(
                                (header) => (
                                    <TableHead
                                        key={header.id}
                                    >
                                        {header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                )
                            )}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center h-24"
                            >
                                No Results
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Button
                onClick={() =>
                    table.previousPage()
                }
            >
                Previous
            </Button>

            <Button
                onClick={() =>
                    table.nextPage()
                }
            >
                Next
            </Button>
        </div>
    );
}