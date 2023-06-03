import Spinner from '../spinner/Spinner'
import { twMerge } from 'tailwind-merge'
import { Link } from 'react-router-dom'
import { ButtonProps } from './type'

const Button = ({ type = 'button', children, className, onClick, loading, disabled, to }: ButtonProps) => {
  const child = loading ? <Spinner /> : children

  const defaultClassName = `flex w-full justify-center items-center text-sm text-blue-500 border border-current font-medium  rounded-md transition-all duration-100 px-3 hover:bg-blue-100 h-[30px]`
  if (to) {
    return (
      <Link to={to} className={twMerge(defaultClassName, className)} type={type} onClick={onClick}>
        {child}
      </Link>
    )
  }
  return (
    <button
      className={twMerge(
        defaultClassName,
        className,
        `${disabled ? 'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-700' : ''}`,
        `${loading ? 'bg-blue-100' : 'bg-white'}`
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
