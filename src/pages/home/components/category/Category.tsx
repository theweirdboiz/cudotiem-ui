import { ReactNode, useState } from 'react'
import { Spinner } from '~/components'
import { useCategory } from '~/contexts'
import { Category } from '~/types/category.type'

interface CategoryItemProps {
  item?: Category | null
  handleChangeCategory: (categoryCode: string) => void
  categoryItemActive?: string
}
interface CategoryProps {
  handleChangeCategory: (categoryCode: string) => void
}

const Category = ({ handleChangeCategory }: CategoryProps) => {
  const { categories, isLoading } = useCategory()
  // const [categoryItemActive, setCategoryItemActive] = useState<string | undefined>(categories?.[0].code)

  // const categories: Category[] = [
  //   {
  //     id: 1,
  //     name: 'quần áo',
  //     icon: 'https://salt.tikicdn.com/cache/100x100/ts/category/00/5d/97/384ca1a678c4ee93a0886a204f47645d.png.webp',
  //     code: ''
  //   },
  //   {
  //     id: 2,
  //     name: 'Giày dép',
  //     icon: 'https://salt.tikicdn.com/cache/100x100/ts/category/00/5d/97/384ca1a678c4ee93a0886a204f47645d.png.webp',
  //     code: ''
  //   }
  // ]
  if (isLoading) return <Spinner full />
  return (
    <CategoryList>
      <CategoryItem item={{ id: 0, code: '', name: 'Tất cả' }} handleChangeCategory={handleChangeCategory} />
      {categories?.map((item: Category) => (
        <CategoryItem
          key={item.id}
          item={item}
          handleChangeCategory={handleChangeCategory}
          // categoryItemActive={categoryItemActive}
        />
      ))}
    </CategoryList>
  )
}

const CategoryList = ({ children }: { children: ReactNode }) => {
  return <div className='grid grid-cols-6 mb-2 '>{children}</div>
}

const CategoryItem = ({ handleChangeCategory, item, categoryItemActive }: CategoryItemProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className={`box-center flex-col ${
        item?.code === categoryItemActive ? 'border-b-blue-500 text-blue-500 bg-blue-100' : ''
      } border-b hover:bg-gray-200 cursor-pointer py-2 px-1 transition-all duration-200 ease-in`}
      onClick={() => handleChangeCategory(item?.code as string)}
    >
      {item?.icon && (
        <img src={item?.icon} alt='' width={40} height={40} className='transition-all duration-300 ease-linear' />
      )}
      <span className='mt-1 text-xs capitalize'>{item?.name}</span>
    </div>
  )
}

export default Category
