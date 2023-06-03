// import PageWrapper from '~/layouts/components/wrapper/PageWrapper'
// import BoxChat from './BoxChat'
// import { useParams } from 'react-router-dom'
// import { useChat } from '~/contexts/chatContext'
// import { MESSAGE, MessageData } from '~/types/chat.type'
// import { joinBoxChat, sendMessage } from '~/services'
// import { useEffect, useState } from 'react'
// import { Button, FormGroup, Input } from '~/components'
// import { useForm } from 'react-hook-form'

// const ChatPage = () => {
//   const { socket, messages, setMessages } = useChat()
//   const { id } = useParams()

//   const { control, handleSubmit } = useForm()

//   const handleSendMessage = (message: any) => {
//     const data = { ...message, room: { id: id + 'ten-nguoi-ban-da-duoc-ma-hoa' }, creator: 'user01' }
//     sendMessage(socket, data)
//     setMessages((prev) => [...prev, data])
//   }
//   const handleJoinBoxChat = () => {
//     joinBoxChat(socket, { id: id + 'ten-nguoi-ban-da-duoc-ma-hoa', user: name })
//   }

//   const onSubmit = (message: any) => {
//     handleSendMessage(message)
//   }

//   // useEffect(() => {
//   //   // listen RECEIVE_MESSAGE event
//   //   socket.on(MESSAGE.RECEIVED, (data) => {
//   //     console.log('RECEIVED: ', data)
//   //     setMessages((prev) => [...prev, data])
//   //   })
//   // }, [socket])
//   console.log(messages)

//   return (
//     <PageWrapper>
//       <div className='w-1/2 mx-auto'>
//         <BoxChat messages={messages}></BoxChat>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <FormGroup className='flex-row w-full'>
//             <Input control={control} placeholder='Message..' name='message' />
//             <Button type='submit'>Gửi</Button>
//           </FormGroup>
//         </form>
//       </div>
//     </PageWrapper>
//   )
// }

// export default ChatPage
