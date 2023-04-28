import React from 'react'
import { Button } from '~/components'
import { IconPhone, IconStart } from '~/components/icon'

const UserContact = () => {
  return (
    <div className='contact mt-3 w-60 border border-gray-100 rounded-md'>
      <div className='border border-gray-100 rounded-md p-3'>
        <div className='flex-center gap-x-2 mb-3'>
          <img src='https://source.unsplash.com/random' className='w-10 h-10 rounded-full' alt='' />
          <div>
            <h5 className='font-medium text-sm'>User02123</h5>
            <h5 className='text-xs'>Người mới</h5>
          </div>
        </div>
        <h5 className='flex-center gap-x-2 text-blue-700 rounded-md px-3 py-1 font-semibold mb-3'>
          <IconPhone size='w-4 h-4' />
          <span>09123213</span>
        </h5>
        <div className='flex text-sm justify-evenly mb-3'>
          <div className='flex flex-col'>
            <h5 className='flex-center gap-x-1 font-medium'>
              <span>4.5 / 5</span>
              <span className='text-yellow-300'>
                <IconStart size='w-4 h-4' fill='currentColor' />
              </span>
            </h5>
            <span>30+</span>
          </div>
          <div className='flex flex-col'>
            <h5 className='flex-center gap-x-1 font-medium'>
              <span>123+</span>
            </h5>
            <span>Theo dõi</span>
          </div>
        </div>
        <div className='flex-center justify-between gap-x-3 text-blue-700'>
          <Button>Xem info</Button>
          <Button>Theo dõi</Button>
        </div>
      </div>
    </div>
  )
}

export default UserContact
