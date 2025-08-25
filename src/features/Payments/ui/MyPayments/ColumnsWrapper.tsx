'use client'

import { ColumnDef } from '@tanstack/react-table'
import { useState, useEffect, ReactNode } from 'react'

export default function ColumnsWrapper<TData>({
  children,
}: {
  children: (props: { columns: ColumnDef<TData>[] }) => ReactNode
}) {
  const [columns, setColumns] = useState<ColumnDef<TData>[]>([])

  useEffect(() => {
    import('@/features/Payments/ui/MyPayments/columns')
      .then((module) => {
        const loadedColumns = module.columns as ColumnDef<TData>[]
        setColumns(loadedColumns)
      })
      .catch((error) => console.error('Failed to load columns:', error))
  }, [])

  if (columns.length === 0) {
    return <div>Loading columns...</div>
  }

  return <>{children({ columns })}</>
}
