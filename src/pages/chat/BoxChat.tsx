import { MessageData } from '~/types/chat.type'

type Props = {
  messages: MessageData[]
}

const BoxChat = (props: Props) => {
  const { messages } = props

  return (
    <div className='h-60 bg-white border rounded-t-lg'>
      {messages.map((message, index) => (
        <h3 className={`${message.creator === name ? 'text-right' : 'text-left'}`} key={index}>
          {message.message}
        </h3>
      ))}
    </div>
  )
}

export default BoxChat
