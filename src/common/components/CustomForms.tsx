import React from 'react'
type PropsType = {
  strokeColor?: string
}
export const Square = ({
  strokeColor = 'pink',
}: PropsType): React.ReactElement => {
  return (
    <svg width="30" height="30" version="1.1" style={{ margin: '2px' }}>
      <rect
        x={'1'}
        y={'1'}
        width="30"
        height="30"
        stroke={strokeColor}
        strokeWidth="30"
      />
    </svg>
  )
}
