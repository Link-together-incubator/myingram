import { useEffect, useRef } from 'react'

export function useScroll(
  parentRef: React.RefObject<HTMLElement | null>,
  childRef: React.RefObject<HTMLElement | null>,
  callback: () => void,
) {
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }

    if (!parentRef.current || !childRef.current) {
      return // Завершаем эффект, если рефы не инициализированы
    }

    observer.current = new IntersectionObserver(([target]) => {
      console.log(target, 'target')
      console.log(target.isIntersecting, 'target1')
      if (target.isIntersecting) {
        console.log('intersected')
        callback()
      }
    }, options)
    console.log(observer.current, 'observerCurrent')

    observer.current.observe(childRef.current)

    return function () {
      if (observer.current && childRef.current) {
        observer.current.unobserve(childRef.current)
      }
    }
  }, [callback])
}
