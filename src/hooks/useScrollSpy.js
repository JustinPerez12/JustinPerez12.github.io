import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view.
 *
 * The old nav only updated on click, so the highlight lied the moment you
 * scrolled or deep-linked. This watches the sections themselves.
 */
export function useScrollSpy(ids, { rootMargin = '-45% 0px -50% 0px' } = {}) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element) => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // With a tight rootMargin more than one section can qualify mid-scroll;
        // take the one highest on the page so the highlight never flickers.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin, threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids, rootMargin])

  return activeId
}
