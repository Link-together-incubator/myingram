import { useEffect, useRef } from 'react'

export function useScroll(
  parentRef: React.RefObject<HTMLElement | null>,
  childRef: React.RefObject<HTMLElement | null>,
  callback: () => void,
  margin: string = '300px 0px',
) {
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: margin,
      threshold: 0,
    }

    if (!parentRef.current || !childRef.current) {
      return // Завершаем эффект, если рефы не инициализированы
    }

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        callback()
      }
    }, options)

    observer.current.observe(childRef.current)

    return function () {
      if (observer.current && childRef.current) {
        observer.current.unobserve(childRef.current)
      }
    }
  }, [callback])
}
