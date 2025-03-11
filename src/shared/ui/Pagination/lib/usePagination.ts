'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const usePagination = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPage = searchParams.get('page') ?? 1 // Номер страницы
  const itemsPerPage = searchParams.get('size') ?? 10 // кол-во айтемов на странице

  const onChangeCurrentPage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString())

      params.set('page', String(newPage))

      router.push(`?${params.toString()}`)
    },
    [router, searchParams],
  )
  const onChangeItemsPerPage = useCallback(
    (newSize: number) => {
      const params = new URLSearchParams(searchParams.toString())

      params.set('size', String(newSize))

      router.push(`?${params.toString()}`)
    },
    [router, searchParams],
  )

  return {
    currentPage,
    itemsPerPage,
    onChangeCurrentPage,
    onChangeItemsPerPage,
  }
}
