import { FC, HTMLProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps extends HTMLProps<HTMLLabelElement> {
  htmlFor?: string
}

const Label: FC<LabelProps> = ({ htmlFor = '', className = '', children, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge('text-sm font-medium cursor-pointer inline', `${className}`)}
      {...props}
    >
      {children}
    </label>
  )
}

export default Label
