import { useEffect } from 'react'
import { Button } from '~/components'
import PageWrapper from '~/layouts/components/wrapper/PageWrapper'

const UnauthorizedPage = () => {
  useEffect(() => {
    document.title = '403 - Cụ Đồ Tiễm'
  }, [])
  return (
    <PageWrapper bg='bg-white'>
      <div className='max-w-md mx-auto pt-24'>
        <h1 className='text-3xl font-extrabold text-center'>Unauthorized</h1>
        <h6 className='font-semibold text-center mt-2 mb-10'>
          Có vẻ như bạn đang truy cập đến nơi không phù hợp với mình rồi, thử lại nhé!
        </h6>
        <Button className='max-w-[200px] mt-3 mx-auto' to='/'>
          Trở về trang chủ
        </Button>
      </div>
    </PageWrapper>
  )
}

export default UnauthorizedPage
