import { ReactNode, useState } from 'react'
import { useCategory } from '~/contexts'
import { Category } from '~/types/category.type'

interface CategoryItemProps {
  item: Category
  handleClickCategoryItem: (id: number) => void
  categoryItemActive: number
}

const Category = () => {
  const { categories, isError, isLoading } = useCategory()
  const [categoryItemActive, setCategoryItemActive] = useState<number>(1)
  const handleClickCategoryItem = (id: number) => {
    setCategoryItemActive(id)
  }

  // const categories = [
  //   {
  //     id: 1,
  //     name: 'quần áo',
  //     icon: 'https://salt.tikicdn.com/cache/100x100/ts/category/00/5d/97/384ca1a678c4ee93a0886a204f47645d.png.webp'
  //   },
  //   {
  //     id: 2,
  //     name: 'Giày dép',

  //     icon: 'https://salt.tikicdn.com/cache/100x100/ts/category/00/5d/97/384ca1a678c4ee93a0886a204f47645d.png.webp'
  //   }
  // ]
  return (
    <CategoryList>
      {categories?.map((item: Category) => (
        <CategoryItem
          key={item.id}
          item={item}
          handleClickCategoryItem={handleClickCategoryItem}
          categoryItemActive={categoryItemActive}
        />
      ))}
    </CategoryList>
  )
}

const CategoryList = ({ children }: { children: ReactNode }) => {
  return <div className='grid grid-cols-6 mb-2 '>{children}</div>
}

const CategoryItem = ({ handleClickCategoryItem, item, categoryItemActive }: CategoryItemProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className={`box-center flex-col ${
        item.id === categoryItemActive ? 'border-b-blue-500 text-blue-500 bg-blue-100' : ''
      } border-b hover:bg-gray-200 cursor-pointer py-2 px-1 transition-all duration-200 ease-in`}
      onClick={() => handleClickCategoryItem(item.id as number)}
    >
      <img src={item.icon} alt='' width={40} height={40} className='transition-all duration-300 ease-linear' />
      <span className='mt-1 text-xs capitalize'>{item.name}</span>
    </div>
  )
}

export default Category
