import { useDrag } from 'react-dnd'
import { useRef } from 'react'

export function useDraggable<T>(type: string, item: T) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const ref = useRef(null)
  drag(ref)

  return { ref, isDragging }
}