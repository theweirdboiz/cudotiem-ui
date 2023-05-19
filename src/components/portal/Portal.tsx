import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import ModalType from '../../types/ModalBaseType'

const createPortalWrapper = () => {
  const div = document.createElement('div')
  div.id = 'portal-wrapper'
  return div
}

const portalWrapperElm = createPortalWrapper()

const Portal = (props: ModalType) => {
  useEffect(() => {
    document.body.appendChild(portalWrapperElm)
  }, [])

  const renderContent = (
    <div className={`${props.containerClass}`} style={props.containerStyle}>
      <>
        <div className='overlay absolute inset-0 bg-yellow-200'>
          <svg className='top-0 left-0 w-full h-screen' preserveAspectRatio='xMidYMid slice' viewBox='10 10 80 80'>
            <path
              fill='#9b5de5'
              className='out-top'
              d='M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z'
            />
            <path
              fill='#f15bb5'
              className='in-top'
              d='M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z'
            />
            <path
              fill='#00bbf9'
              className='out-bottom'
              d='M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z'
            />
            <path
              fill='#00f5d4'
              className='in-bottom'
              d='M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z'
            />
          </svg>
        </div>

        <div className={`${props.bodyClass}`} style={props.bodyStyle}>
          {props.children}
        </div>
      </>
    </div>
  )
  return createPortal(renderContent, portalWrapperElm)
}

export default Portal
