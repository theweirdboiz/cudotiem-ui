import { ReactNode } from 'react'
import SidebarItem from './SidebarItem'
import SidebarList from './SidebarList'
import { twMerge } from 'tailwind-merge'

interface SidebarBoundaryProps {
  [key: string]: any
  children: ReactNode
}

interface SidebarProps extends SidebarBoundaryProps {
  SidebarList?: typeof SidebarList
  SidebarItem?: typeof SidebarItem
}

const Sidebar = ({ children, ...props }: SidebarBoundaryProps & SidebarProps) => {
  const { width = 'max-w-[240px]', shadow = 'shadow-md' } = props
  return (
    <aside
      className={twMerge(
        'bottom-0 z-10 overflow-y-scroll top-4 bg-transparent flex flex-shrink-0 w-full flex-col text-gray-800 text-[14px] font-medium scrollbar-hide bg-white rounded-lg',
        width,
        shadow
      )}
    >
      {children}
    </aside>
  )
}
Sidebar.SidebarList = SidebarList
Sidebar.SidebarItem = SidebarItem

export default Sidebar
