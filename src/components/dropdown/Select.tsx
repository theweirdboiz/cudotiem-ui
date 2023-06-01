/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode } from 'react'
import { useDropdown } from './dropdown-context'
import { twMerge } from 'tailwind-merge'

interface SelectProps {
  placeholder?: string | ReactNode
  classNames?: string
}

const Select: React.FC<SelectProps> = ({ placeholder, classNames }) => {
  const { toggle, show } = useDropdown()

  return (
    <div
      className={twMerge(
        `flex-center justify-between py-3 px-4 bg-white border rounded-md text-sm font-semibold cursor-pointer`,
        classNames
      )}
      onClick={toggle}
    >
      <span className='flex-center gap-x-1'>{placeholder}</span>
      <span>
        {show ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 15l7-7 7 7' />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
          </svg>
        )}
      </span>
    </div>
  )
}

export default Select
