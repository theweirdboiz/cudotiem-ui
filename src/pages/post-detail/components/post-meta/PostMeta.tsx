import React from 'react'
import { Button } from '~/components'
import { IconHeart, IconSecurity } from '~/components/icon'
import { PostDetail } from '~/types/post.type'

type PostMetaProps = {
  meta: PostDetail | undefined
}

const PostMeta = ({ meta }: PostMetaProps) => {
  return (
    <div className='infor flex-1 py-3'>
      <h4 className='text-red-400 font-semibold text-4xl mb-2'>{meta?.postDetailResponse.price} đ</h4>
      <>
        <Button type='button' className='max-w-[180px]'>
          <IconHeart />
          Lưu tin
        </Button>
      </>

      <div className='flex-center text-gray-500 mt-2'>
        <IconSecurity />
        <span className='italic'>Tin đã được kiểm duyệt</span>
      </div>
    </div>
  )
}

export default PostMeta
