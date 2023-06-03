import { twMerge } from 'tailwind-merge'
import { SpinnerProps } from './type'

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={twMerge(
        `w-6 h-6 rounded-full bg-transparent animate-spin border-4 border-blue-500 border-l-transparent`,
        className
      )}
    ></div>
  )
}

export default Spinner
