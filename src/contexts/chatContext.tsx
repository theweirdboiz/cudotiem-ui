import { Dispatch, ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { joinBoxChat } from '~/services'
import { MESSAGE, MessageData } from '~/types/chat.type'
interface ChatContextProps {
  socket: Socket
  messages: any
  setMessages: Dispatch<React.SetStateAction<MessageData[]>>
}
const ChatContext = createContext<ChatContextProps | undefined>(undefined)

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const socket = io(import.meta.env.VITE_BASE_MESSAGE_SERVICE_URI)
  const [messages, setMessages] = useState<MessageData[]>([])

  const value = {
    socket,
    messages,
    setMessages
  }

  useEffect(() => {
    joinBoxChat(socket, { id: '123', user: 'user01' })
    socket.on(MESSAGE.RECEIVED, (data) => {
      console.log('RECEIVED: ', data)
      setMessages((prev) => [...prev, data])
    })
  }, [socket])

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) throw Error('useChat must be within ChatProvider')
  return context
}
