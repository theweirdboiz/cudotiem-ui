/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ReactNode } from 'react'
import { useDropdown } from './dropdown-context'

type Props = {
  option?: any
  children: ReactNode
  onClick?: (option: any) => void
}

const Option = ({ children, option, onClick }: Props) => {
  const { setShow } = useDropdown()
  const handleClick = () => {
    onClick && onClick(option)
    setShow(false)
  }
  return (
    <div
      className='py-3 px-4 cursor-pointer flex-center justify-between hover:text-blue-400 transition-all text-sm font-semibold'
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export default Option
