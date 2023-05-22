import { ReactNode } from 'react'

interface FormGroupProps {
  className?: string
  children: ReactNode
}

const FormGroup = ({ children, className }: FormGroupProps) => {
  const defaultClass = 'flex items-baseline flex-col gap-y-2 mb-4 lg:gap-y-3 lg:mb-5 w-full'
  return <div className={`${className ? className : defaultClass}`}>{children}</div>
}

export default FormGroup
