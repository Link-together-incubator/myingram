'use client'

import { Suspense } from 'react'

import { usePagination } from '../lib/usePagination'

import { PaginationDropDown } from './PaginationDropDown'
import { PaginationNums } from './PaginationNums'

type PaginationProps = {
  totalItems: number
}

function PaginationLayout({ totalItems }: PaginationProps) {
  const {
    currentPage,
    itemsPerPage,
    onChangeCurrentPage,
    onChangeItemsPerPage,
  } = usePagination()

  const totalPages = Math.ceil(totalItems / Number(itemsPerPage))

  return (
    <div className="flex items-center gap-2 justify-start rounded-md p-2 bg-background text-popover-foreground">
      <PaginationNums
        currentPage={Number(currentPage)}
        onPageChange={onChangeCurrentPage}
        totalPages={totalPages}
      />
      <PaginationDropDown
        itemsPerPage={Number(itemsPerPage)}
        onItemsPerPageChange={onChangeItemsPerPage}
      />
    </div>
  )
}

export function Pagination({ totalItems }: PaginationProps) {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <PaginationLayout totalItems={totalItems} />
    </Suspense>
  )
}
