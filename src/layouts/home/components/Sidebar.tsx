import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAth, useCategory } from '~/contexts'
import { getAllCategories } from '~/services'
import { Category } from '~/types/category.type'

const Sidebar: React.FC = (): JSX.Element => {
  const { auth } = useAth()

  const isError = false
  const isLoading = false
  const categories = [
    {
      id: 1,
      name: 'quần áo',
      icon: 'https://salt.tikicdn.com/cache/100x100/ts/category/00/5d/97/384ca1a678c4ee93a0886a204f47645d.png.webp'
    },
    {
      id: 2,
      name: 'Giày dép',

      icon: 'https://salt.tikicdn.com/cache/100x100/ts/category/00/5d/97/384ca1a678c4ee93a0886a204f47645d.png.webp'
    }
  ]

  // const { categories, isError, isLoading } = useCategory()
  if (isLoading) return <>Loading</>
  if (isError) return <>Error category</>

  return (
    <aside className='w-[210px] max-h-screen sticky overflow-y-scroll top-4 bg-transparent flex flex-col text-gray-800 text-[14px] scrollbar-hide'>
      {/* <div className='flex flex-col mb-4 px-4 py-3 rounded-lg bg-white'>
        <h4 className='font-medium px-3 mb-1'>Nổi bật</h4>
        {categories?.map((item: Category) => {
          return (
            <Link key={item.id} to=''>
              <div className='mx-2 flex flex-shrink-0 basis-8 h-8 overflow-hidden'>
                <picture>
                  <img src={item.icon} alt='Giá tốt mỗi ngày' width={32} height={32} />
                </picture>
              </div>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div> */}
      <div className='flex flex-col mb-4 px-4 py-3 rounded-lg bg-white'>
        <h4 className='font-medium px-3'>Danh mục</h4>
        {categories?.map((item: Category) => {
          return (
            <Link
              key={item.id}
              to='/'
              className='flex-center py-1.5 rounded-lg transition-all duration-300 ease-linear hover:bg-gray-300 hover:bg-opacity-60'
            >
              <div className='mx-2 flex flex-shrink-0 basis-8 h-8 overflow-hidden'>
                <picture className='flex-shrink-0 w-full'>
                  <img
                    src={
                      item.icon ||
                      'https://salt.tikicdn.com/cache/100x100/ts/upload/08/2f/14/fd9d34a8f9c4a76902649d04ccd9bbc5.png.webp'
                    }
                    alt='Giá tốt mỗi ngày'
                    width={32}
                    height={32}
                  />
                </picture>
              </div>
              <span className='capitalize'>{item.name}</span>
            </Link>
          )
        })}
      </div>
      {auth && (
        <div className='flex flex-col mb-4 px-4 py-3 rounded-lg bg-white'>
          <Link
            to='/manage/category'
            className='flex-center py-1.5 rounded-lg transition-all duration-300 ease-linear hover:bg-gray-300 hover:bg-opacity-50'
          >
            <div className='mx-2 flex flex-shrink-0 basis-8 h-8 overflow-hidden'>
              <picture>
                <img
                  src='https://salt.tikicdn.com/cache/100x100/ts/upload/08/2f/14/fd9d34a8f9c4a76902649d04ccd9bbc5.png.webp'
                  alt='Giá tốt mỗi ngày'
                  width={32}
                  height={32}
                />
              </picture>
            </div>
            <span>Đăng tin</span>
          </Link>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
