import { twMerge } from 'tailwind-merge'
import { SpinnerProps } from './type'

const Spinner = ({ className, full }: SpinnerProps) => {
  return (
    <div className={full ? `fixed box-center inset-0 z-[999]` : ''}>
      <div
        className={twMerge(
          `w-6 h-6 rounded-full bg-transparent animate-spin border-4 border-blue-500 border-l-transparent`,
          className
        )}
      ></div>
    </div>
  )
}

export default Spinner
