"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



const data: Courses[] = [
  {
    id: "graphing",
    courseName: "Graphing",
    type: "Interactive",
    start: "Start",
    status: "In progress",
    length: 2,
  },
  {
    id: "solving-equations",
    courseName: "Solving Equations",
    type: "Reading",
    start: "Start",
    status: "Not started",
    length: 1,
  },
  {
    id: "order-of-operations",
    courseName: "Order of Operations",
    type: "Interactive",
    start: "Start",
    status: "Not started",
    length: 3,
  },
]



export type Courses = {
    id: string,
    courseName: string,
    type: "Interactive" | "Reading",
    start: "Start",
    status: "In progress" | "Completed" | "Not started",
    length: number,
}



export const columns: ColumnDef<Courses>[] = [
  {
    accessorKey: "courseName",
    header: "Course Name",
    cell: ({ row }) => (
      <div className="capitalize text-left">{row.getValue("courseName")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="text-left">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "start",
    header: () => <div className="border border-black inline-block px-1.5 py-0.5 rounded-full text-sm bg-main">Start</div>,
    cell: ({ row }) => <div className="border border-black inline-block px-1.5 py-0.5 rounded-full text-sm bg-main hover:bg-gray-400 active:bg-gray-500">{row.getValue("start")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="text-left">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "length",
    header: "Length",
    cell: ({ row }) => <div className="text-left">{`${row.getValue("length")} hours`}</div>,
  },
]


export default function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full font-base text-mtext">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Table className="bg-bg border-none [&_tr:first-child_td]:border-t-0 [&_tr:last-child_td]:border-b-0">
          <TableHeader className="font-heading border-b-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-none">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-mtext bg-bg border-none">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="bg-bg hover:bg-gray-300 active:bg-gray-400 border-none"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}