import React from 'react'

type Props = {
  fill?: boolean
}

const RateStart = ({ fill }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='14'
      height='14'
      viewBox='0 0 12 12'
      className='star-icon'
    >
      <g fill='none' fillRule='evenodd'>
        <path
          fill={`${fill ? '#fdd835' : '#b8b8b8'}`}
          transform='matrix(-1 0 0 1 11 1)'
          d='M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z'
        ></path>
        <path
          fill={`${fill ? '#fdd835' : '#b8b8b8'}`}
          transform='translate(1 1)'
          d='M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z'
        ></path>
      </g>
    </svg>
  )
}

export default RateStart
