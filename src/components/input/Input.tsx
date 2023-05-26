import React from 'react'
import { useController } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface InputProps {
  control?: any
  type?: string
  error?: string
  children?: React.ReactNode
  name: string
  placeholder?: string
  [key: string]: any
}
const Input = ({ control, error, type = 'text', placeholder, children, name, ...props }: InputProps) => {
  const { field } = useController({
    control,
    name,
    defaultValue: ''
  })
  return (
    <div className='relative w-full'>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={twMerge(
          `w-full py-2.5 px-4 mb-1 border border-blue-200 focus:border-blue-400 rounded-md transition-all duration-300 `,
          `${error && 'border-red-200 focus:border-red-400'}`
        )}
        {...field}
        {...props}
      />
      <h4
        className={twMerge(
          'absolute text-sm text-red-400  pointer-events-none bg-white w-[calc(100%-50px)] opacity-100 visible',
          `${!error && 'opacity-0 invisible'} `
        )}
      >
        {error}
      </h4>
      {children && (
        <span className='absolute top-2/4 -translate-y-1/2 right-4 text-text-4 cursor-pointer select-none'>
          {children}
        </span>
      )}
    </div>
  )
}
export default Input
