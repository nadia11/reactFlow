import { memo } from 'react'
import type { ConnectionLineComponentProps } from 'reactflow'
import {
  Position,
  getBezierPath,
} from 'reactflow'

 const CustomConnectionLine = ({ fromX, fromY, toX, toY }: ConnectionLineComponentProps) => {
  const [
    edgePath,
  ] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: Position.Right,
    targetX: toX,
    targetY: toY,
    targetPosition: Position.Left,
    curvature: 0.16,
  })

  return (
    <g>
      <path
        fill="none"
        stroke='#2970FF'
        strokeWidth={3}
        d={edgePath}
      />
      <rect
        x={toX}
        y={toY - 4}
        width={2}
        height={8}
        fill='#2970FF'
      />
    </g>
  )
}

export default memo(CustomConnectionLine)