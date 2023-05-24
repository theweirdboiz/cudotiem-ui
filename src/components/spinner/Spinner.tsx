import { twMerge } from 'tailwind-merge'
import { SpinnerProps } from './type'

const Spinner = ({ color = 'blue-500', h = 6, w = 6, strokeWidth = 4 }: SpinnerProps) => {
  return (
    <div
      className={twMerge(
        `w-${6} h-${6} rounded-full bg-transparent animate-spin border-${strokeWidth} border-blue-500 border-l-transparent`
      )}
    ></div>
  )
}

export default Spinner
