import UserContact from './components/user-contact/UserContact'
import PostsRelative from './components/posts-relative/PostsRelative'
import PostMeta from './components/post-meta/PostMeta'
import PostDescription from './components/post-description/PostDescription'
import Gallary from './components/post-gallary/Gallary'
import { useLocation, useParams } from 'react-router-dom'
import { GallaryProvider } from '~/contexts'
import { useQuery } from '@tanstack/react-query'
import { getPostBySlug } from '~/services'

const PostDetailPage = () => {
  /* Start: Hook */
  const { slug } = useParams()

  console.log(slug)

  const { data } = useQuery({
    queryKey: ['post', slug],
    queryFn: async () => await getPostBySlug(slug as string)
  })
  const boxWrapper = 'bg-white mb-2 rounded-lg'
  /* End: Hook */

  return (
    <div className='rounded-md mb-5 min-h-screen'>
      <div className={`flex ${boxWrapper}`}>
        {/* gallary */}
        <GallaryProvider>
          <Gallary images={data?.imageLinks} />
        </GallaryProvider>
        {/* infor */}
        <div className='flex-1'>
          <h3 className='text-2xl py-3 px-2'>{data?.title}</h3>
          <div className='flex pr-6'>
            <PostMeta meta={data} />
            <UserContact />
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
        <PostDescription description={data?.content} />
      </div>
    </div>
  )
}

export default PostDetailPage
