import { Socket } from 'socket.io-client'
import { MESSAGE, MessageData, BOX_CHAT, RequestJoinRoom } from '~/types/chat.type'

export const sendMessage = (socket: Socket, data: MessageData) => {
  socket.emit(MESSAGE.SEND, data)
}
export const joinBoxChat = (socket: Socket, data: RequestJoinRoom) => {
  socket.emit(BOX_CHAT.JOIN, data)
}

export const receiveMessage = () => {
  console.log()
}
