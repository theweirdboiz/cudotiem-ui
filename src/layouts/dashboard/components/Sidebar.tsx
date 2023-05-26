import { ReactNode } from 'react'
import SidebarItem from './SidebarItem'
import SidebarList from './SidebarList'

interface SidebarBoundaryProps {
  [key: string]: any
  children: ReactNode
}

interface SidebarProps extends SidebarBoundaryProps {
  SidebarList?: typeof SidebarList
  SidebarItem?: typeof SidebarItem
}

const Sidebar = ({ children, ...props }: SidebarBoundaryProps & SidebarProps) => {
  const { width, shadow } = props
  return (
    <aside
      className={`${width || 'w-[210px]'} ${
        shadow || ''
      } max-h-screen sticky overflow-y-scroll top-4 bg-transparent flex flex-col text-gray-800 text-[14px] font-medium scrollbar-hide bg-white rounded-lg`}
    >
      {children}
    </aside>
  )
}
Sidebar.SidebarList = SidebarList
Sidebar.SidebarItem = SidebarItem

export default Sidebar
