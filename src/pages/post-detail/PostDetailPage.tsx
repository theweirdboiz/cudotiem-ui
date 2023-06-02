import UserContact from './components/user-contact/UserContact'
import PostsRelative from './components/posts-relative/PostsRelative'
import PostMeta from './components/post-meta/PostMeta'
import PostDescription from './components/post-description/PostDescription'
import Gallary from './components/post-gallary/Gallary'
import { useLocation, useParams } from 'react-router-dom'
import { GallaryProvider } from '~/contexts'
import { useQuery } from '@tanstack/react-query'
import { getPostById } from '~/services'
import { PostDetail } from '~/types/post.type'

const PostDetailPage = () => {
  /* Start: Hook */
  const { slug, id } = useParams()

  const {
    data: postDetail,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => await getPostById<PostDetail>(id as string)
  })
  const boxWrapper = 'bg-white mb-2 rounded-lg'
  /* End: Hook */

  return (
    <div className='rounded-md mb-5 min-h-screen'>
      <div className={`flex ${boxWrapper}`}>
        {/* gallary */}
        <GallaryProvider>
          <Gallary images={postDetail?.postDetailResponse.imageUrls} />
        </GallaryProvider>
        {/* infor */}
        <div className='flex-1'>
          <h3 className='text-2xl py-3 px-2 capitalize'>{postDetail?.postDetailResponse.title}</h3>
          <div className='flex pr-6'>
            <PostMeta meta={postDetail} />
            <UserContact userContact={postDetail?.userDto} />
          </div>
        </div>
      </div>
      {/* Post relative */}
      <div className={boxWrapper}>
        <PostsRelative />
      </div>
      {/* Detail */}
      {/* Description */}
      <div className={boxWrapper}>
        <PostDescription description={postDetail?.postDetailResponse.content} />
      </div>
    </div>
  )
}

export default PostDetailPage
