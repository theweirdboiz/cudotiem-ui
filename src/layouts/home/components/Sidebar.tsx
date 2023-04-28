import React from 'react'
import { Link } from 'react-router-dom'
import { useCategory } from '~/contexts'
import { Category } from '~/types/category.type'

const Sidebar: React.FC = (): JSX.Element => {
  const categories = useCategory()

  return (
    <aside className='w-[210px] max-h-screen sticky overflow-y-scroll top-4 bg-transparent flex flex-col text-gray-800 text-[14px] scrollbar-hide'>
      <div className='flex flex-col mb-4 px-2 py-3 rounded-lg bg-white'>
        <h4 className='font-medium'>Nổi bật</h4>
        {categories.map((item: Category) => {
          return (
            <Link
              key={item.id}
              to={item.slug || '/'}
              className='flex-center py-1.5 px-4 rounded-lg transition-all duration-300 ease-linear hover:bg-gray-300 hover:bg-opacity-50'
            >
              <div className='mr-2 flex flex-shrink-0 basis-8 h-8 overflow-hidden'>
                <picture>
                  <img src={item.icon} alt='Giá tốt mỗi ngày' width={32} height={32} />
                </picture>
              </div>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
      <div className='flex flex-col mb-4 px-2 py-3 rounded-lg bg-white'>
        <h4 className='font-medium'>Danh mục</h4>
        {categories.map((item: Category) => {
          return (
            <Link
              key={item.id}
              to={item.slug || '/'}
              className='flex-center py-1.5 px-4 rounded-lg transition-all duration-300 ease-linear hover:bg-gray-300 hover:bg-opacity-60'
            >
              <div className='mr-2 flex flex-shrink-0 basis-8 h-8 overflow-hidden'>
                <picture className='flex-shrink-0 w-full'>
                  <img src={item.icon} alt='Giá tốt mỗi ngày' width={32} height={32} />
                </picture>
              </div>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
      <div className='flex flex-col mb-4 px-2 py-3 rounded-lg bg-white'>
        <Link
          to='/manage/post'
          className='flex-center py-1.5 px-4 rounded-lg transition-all duration-300 ease-linear hover:bg-gray-300 hover:bg-opacity-60'
        >
          <div className='mr-2 basis-8 h-8 border border-gray-200 rounded-xl overflow-hidden'>
            <picture>
              <img
                src='https://salt.tikicdn.com/cache/100x100/ts/upload/08/2f/14/fd9d34a8f9c4a76902649d04ccd9bbc5.png.webp
                '
                alt='Giá tốt mỗi ngày'
                width={32}
                height={32}
              />
            </picture>
          </div>
          <span>Bán hàng cùng tôi</span>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
