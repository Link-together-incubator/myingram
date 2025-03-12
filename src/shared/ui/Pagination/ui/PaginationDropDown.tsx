'use client'

import { ChevronDown } from 'lucide-react'

type PaginationDropDownProps = {
  itemsPerPage: number
  onItemsPerPageChange: (items: number) => void
}

export const PaginationDropDown = ({
  itemsPerPage,
  onItemsPerPageChange,
}: PaginationDropDownProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span>Show</span>
      <div className="relative">
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="h-6 w-[60px] rounded-md border border-foreground bg-background px-2 text-sm appearance-none cursor-pointer hover:bg-foreground transition-colors duration-300 ease-out"
        >
          {[10, 20, 30, 50, 100].map((value) => (
            <option className="hover:bg-amber-400" key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
          <ChevronDown size={20} strokeWidth={0.75} />
        </div>
      </div>
      <span>on page</span>
    </div>
  )
}
