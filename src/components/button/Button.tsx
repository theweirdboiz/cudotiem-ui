import { Link } from 'react-router-dom'
import Spinner from '../spinner/Spinner'
import { ButtonProps } from './type'
import { twMerge } from 'tailwind-merge'

const Button = ({ type = 'button', children, className, onClick, ...props }: ButtonProps) => {
  const { isloading, to, height, style, disabled } = props

  const child = isloading ? <Spinner /> : children

  const defaultClassName = `flex justify-center items-center text-sm border border-current font-medium  rounded-md transition-all duration-100 px-3 text-blue-500 hover:bg-blue-100 ${height}`
  if (to) {
    return (
      <Link style={style} to={to} className={`${defaultClassName}`} type={type} onClick={onClick}>
        {child}
      </Link>
    )
  }
  return (
    <button
      className={twMerge(
        `${defaultClassName}
        }`,
        className,
        `${disabled ? 'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-700' : ''}`,
        `${isloading ? 'bg-blue-100' : 'bg-white'}`
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {child}
    </button>
  )
}

export default Button
