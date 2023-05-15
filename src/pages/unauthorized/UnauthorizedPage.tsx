import { useEffect } from 'react'
import { Button } from '~/components'
import PageWrapper from '~/layouts/components/wrapper/PageWrapper'

const UnauthorizedPage = () => {
  useEffect(() => {
    document.title = '403 - Cụ Đồ Tiễm'
  }, [])
  return (
    <PageWrapper>
      <div className='text-center'>
        <h1 className='text-3xl font-extrabold '>Unauthorized</h1>
        <Button
          style={{
            width: '200px',
            margin: '1rem auto'
          }}
          to='/'
        >
          Trở về trang chủ
        </Button>
      </div>
    </PageWrapper>
  )
}

export default UnauthorizedPage
