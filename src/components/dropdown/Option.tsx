/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ReactNode } from 'react'
import { useDropdown } from './dropdown-context'
import { twMerge } from 'tailwind-merge'

type Props = {
  option?: any
  classNames?: string
  children: ReactNode | JSX.Element
  onClick?: (option: any) => void
}

const Option = ({ children, option, classNames, onClick }: Props) => {
  const { setShow } = useDropdown()
  const handleClick = () => {
    onClick && onClick(option)
    setShow(false)
  }
  return (
    <div
      className={twMerge(
        'py-3 px-4 cursor-pointer flex-center justify-between hover:text-blue-400 transition-all text-sm font-semibold',
        classNames
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export default Option
