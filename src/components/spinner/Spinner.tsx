import { twMerge } from 'tailwind-merge'
import { SpinnerProps } from './type'

const Spinner = ({ color = 'blue-500', h = 6, w = 6, strokeWidth = 4 }: SpinnerProps) => {
  return (
    <div
      className={twMerge(
        `rounded-full bg-transparent  animate-spin border-${strokeWidth} border-${color} border-l-transparent w-${w} h-${h}`
      )}
    ></div>
  )
}

export default Spinner
