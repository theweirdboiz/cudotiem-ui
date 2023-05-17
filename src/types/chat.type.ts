export enum MESSAGE {
  SEND = 'SEND',
  RECEIVED = 'RECEIVED'
}
export enum BOX_CHAT {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE'
}

export interface MessageData {
  room: {
    id: string
  }
  creator: any
  message: any
}

export interface RequestJoinRoom {
  id: string
  user: any
}
