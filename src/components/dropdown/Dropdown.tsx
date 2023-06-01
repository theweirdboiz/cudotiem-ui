import { ReactNode } from 'react'
import { DropdownProvider } from './dropdown-context'
import List from './List'
import Option from './Option'
import Select from './Select'
import { twMerge } from 'tailwind-merge'

interface DropdownBoudaryProps {
  children: ReactNode
  classNames?: string
}

interface DropdownProps extends DropdownBoudaryProps {
  Select?: typeof Select
  List?: typeof List
  Option?: typeof Option
}

const Dropdown = ({ children, classNames }: DropdownBoudaryProps & DropdownProps) => {
  return (
    <DropdownProvider>
      <div className={twMerge('w-full relative', classNames)}>{children}</div>
    </DropdownProvider>
  )
}

Dropdown.Select = Select
Dropdown.List = List
Dropdown.Option = Option

export default Dropdown
