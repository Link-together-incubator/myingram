import React from 'react'

import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

import s from './SkeletonTable.module.scss'

const TableSkeleton = () => {
  return (
    <div className={s.container}>
      <Skeleton className={s.header} />
      <div className={s.body}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={s.row}>
            <Skeleton className={s.cell} />
            <Skeleton className={s.cell} />
            <Skeleton className={s.cell} />
            <Skeleton className={s.cell} />
            <Skeleton className={s.cell} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableSkeleton
