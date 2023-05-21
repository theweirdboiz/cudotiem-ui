import React from 'react'
import { useController } from 'react-hook-form'

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
    <div className={`relative`}>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full py-2.5 px-4 mb-1 border ${
          !error ? 'border-blue-200 focus:border-blue-400' : 'border-red-200 focus:border-red-400'
        } rounded-md transition-all duration-300 `}
        {...field}
        {...props}
      />
      <h4
        className={`${
          error ? 'opacity-100 visible' : 'opacity-0 invisible'
        } absolute text-sm text-red-400  pointer-events-none bg-white w-[calc(100%-50px)]`}
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
