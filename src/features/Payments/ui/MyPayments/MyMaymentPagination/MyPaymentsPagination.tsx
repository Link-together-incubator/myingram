import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '@/shared/lib/css'
import { Button } from '@/shared/ui'
import { getPageNumbers } from '@/shared/ui/Pagination/lib/getPageNumbers'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select/select'

import s from './MyPaymentsPagination.module.scss'

type Props = {
  currentPage: number
  pageSize: number
  totalPages: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export const DataTablePagination = ({
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: Props) => {
  const pageNumbers = getPageNumbers(totalPages, currentPage)
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }
  const canGoPrevious = currentPage > 1 && totalPages > 0
  const canGoNext = currentPage < totalPages && totalPages > 0

  return (
    <div className={s.paginationWrapper}>
      <div className={s.container}>
        <div className={s.paginationButton}>
          <Button
            variant="link"
            className={s.arrowButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!canGoPrevious}
            aria-label="Previous page"
          >
            <ChevronLeft className={s.arrowIcon} />
          </Button>

          {pageNumbers.map((page, index) => {
            if (page === 'ellipsis-start' || page === 'ellipsis-end') {
              return (
                <span key={`ellipsis-${index}`} className={s.ellipsis}>
                  <MoreHorizontal className={s.ellipsisIcon} />
                </span>
              )
            }

            return (
              <button
                key={index}
                onClick={() => handlePageChange(Number(page))}
                className={cn(
                  s.pageButton,
                  currentPage === Number(page) && s.active,
                )}
              >
                {page}
              </button>
            )
          })}
          <Button
            variant="link"
            className={s.arrowButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!canGoNext}
            aria-label="Next page"
          >
            <ChevronRight className={s.arrowIcon} />
          </Button>
        </div>
        <div className={s.pageSizeControl}>
          <p className={s.label}>Show</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              onPageSizeChange(Number(value))
            }}
          >
            <SelectTrigger className={s.selectTrigger}>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((size) => (
                <SelectItem key={`size-${size}`} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className={s.label}>on page</p>
        </div>
      </div>
    </div>
  )
}
