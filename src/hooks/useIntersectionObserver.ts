import { useEffect, useRef } from 'react'

const useIntersectionObserver = (
  setActiveId: React.Dispatch<React.SetStateAction<string>>,
  data?: typeof import('*.md'),
) => {
  const headingElementsRef = useRef<{
    [propName: string]: IntersectionObserverEntry
  }>({})

  useEffect(() => {
    const callback = (headings: IntersectionObserverEntry[]) => {
      /**
       *  使用 useRef hook 存储被观察对象
       */
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        // console.log(headingElement)
        map[headingElement.target.innerHTML] = headingElement
        return map
      }, headingElementsRef.current)
      /**
       *  获得所有可见标题列表
       */
      const visibleHeadings: IntersectionObserverEntry[] = []
      Object.keys(headingElementsRef.current).forEach(key => {
        const headingElement = headingElementsRef.current[key]

        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId = (id: string) =>
        headingElements.findIndex(heading => heading.id === id) // return <Number>

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id)
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id),
        )

        setActiveId(sortedVisibleHeadings[0].target.id)
      }
    }

    const option = {
      rootMargin: '0px 0px -40% 0px',
    }

    const observer = new IntersectionObserver(callback, option)

    const headingElements = Array.from(document.querySelectorAll('h2, h3'))

    headingElements.forEach(element => observer.observe(element))

    return () => observer.disconnect()
  }, [data])
}

export default useIntersectionObserver
