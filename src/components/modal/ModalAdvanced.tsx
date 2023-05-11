import React from 'react'
import ModalAdvancedProps from '../../types/ModalAdvancedType'
import ModalBase from './ModalBase'

const ModalAdvanced: React.FunctionComponent<ModalAdvancedProps> = (props) => {
  const { children, heading, visible } = props
  return (
    <ModalBase visible={visible}>
      <h2 className='pb-5 text-4xl font-medium text-center text-black bg-white rounded-t-lg'>{heading}</h2>
      {children}
    </ModalBase>
  )
}

export default ModalAdvanced
