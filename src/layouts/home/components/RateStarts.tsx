import RateStart from './RateStart'

type Props = {
  amount: number
}

const RateStarts = ({ amount }: Props) => {
  const base = 5
  const items = Array(base).fill('')

  return (
    <div className='flex items-center px-3 cursor-pointer my-1.5'>
      {items.map((_, index) => (
        <RateStart key={index} fill={index < amount}></RateStart>
      ))}
      <span className='ml-1'>Từ {amount} sao</span>
    </div>
  )
}

export default RateStarts
