'use client'
import {
  ColumnDef,
  getCoreRowModel,
  flexRender,
  useReactTable,
} from '@tanstack/react-table'

import { DataTablePagination } from '@/features/Payments/ui/MyPayments/MyMaymentPagination/MyPaymentsPagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui'

import s from './MyPayments.module.scss'

type Props<TData> = {
  columns: ColumnDef<TData>[]
  data: TData[]
  totalPages: number
  pagination: {
    pageNumber: number
    pageSize: number
  }
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export const MyPayments = <TData,>({
  columns,
  data,
  totalPages,
  pagination,
  onPageChange,
  onPageSizeChange,
}: Props<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div>
      <div className={s.tableWrapper}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={s.head}>
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
                  data-state={row.getIsSelected() && 'selected'}
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

      <DataTablePagination
        currentPage={pagination.pageNumber}
        pageSize={pagination.pageSize}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}
