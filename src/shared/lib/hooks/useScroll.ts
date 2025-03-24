import { useEffect, useRef } from 'react'

export default function useScroll(
  parentRef: React.RefObject<HTMLElement>,
  childRef: React.RefObject<HTMLElement>,
  callback: () => void,
) {
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const options = {
      root: parentRef.current,
      rootMargin: '0px',
      threshold: 1.0,
    }

    if (!parentRef.current || !childRef.current) {
      return // Завершаем эффект, если рефы не инициализированы
    }

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        console.log('intersected')
        callback()
      }
    }, options)

    observer.current.observe(childRef.current)

    return function () {
      if (observer.current) {
        observer.current.unobserve(childRef.current)
      }
    }
  }, [callback])
}
