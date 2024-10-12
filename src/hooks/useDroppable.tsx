import { useDrop } from 'react-dnd'

export function useDroppable<T>(
  type: string,
  onDrop: (item: T) => void
) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: type,
    drop: (item: T) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  return { ref: drop, isOver }
}