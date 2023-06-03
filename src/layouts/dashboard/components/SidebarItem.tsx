import { NavLink } from 'react-router-dom'

type Props = {
  [key: string]: any
}

const SidebarItem = ({ ...props }: Props) => {
  const { icon, url, onClick } = props
  return (
    <div className={`${props.classNames} transition-all duration-100`}>
      <NavLink to={url} className='flex-center gap-x-5' onClick={onClick}>
        {icon}
        <span>{props.children}</span>
      </NavLink>
    </div>
  )
}

export default SidebarItem
