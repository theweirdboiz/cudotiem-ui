import { twMerge } from 'tailwind-merge'
import { SpinnerProps } from './type'

const Spinner = ({ color = 'text-primary', h = 6, w = 6, strokeWidth = 4 }: SpinnerProps) => {
  return (
    <div
      className={twMerge(
        'rounded-full border-current border-l-transparent animate-spin',
        color,
        `border-${strokeWidth}`,
        `w-${w}`,
        `h-${h}`
      )}
    ></div>
  )
}

export default Spinner
