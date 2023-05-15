import React, { ReactNode } from 'react'
import PageWrapper from '~/layouts/components/wrapper/PageWrapper'
import Topbar from '../components/topbar/Topbar'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <>
      <Topbar />
      <PageWrapper>
        <div className='flex justify-between pt-4 gap-x-5'>
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>
      </PageWrapper>
    </>
  )
}

export default DefaultLayout
