import { useEffect, useRef } from 'react'

export default function useScroll(
  parentRef: React.RefObject<HTMLElement | null>,
  childRef: React.RefObject<HTMLElement | null>,
  callback: () => void,
) {
  const observer = useRef<IntersectionObserver | null>(null)
  console.log(observer)

  useEffect(() => {
    const options = {
      root: parentRef.current,
      rootMargin: '0px',
      threshold: 1,
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
      if (observer.current && childRef.current) {
        observer.current.unobserve(childRef.current)
      }
    }
  }, [callback])
}
