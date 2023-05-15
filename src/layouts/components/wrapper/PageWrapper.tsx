import { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
  bg?: string
  [key: string]: any
}

const PageWrapper = ({ children, ...props }: PageWrapperProps) => {
  const bg = props?.bg || 'bg-gray-100'
  return (
    <main className={bg}>
      <section className='wrapper min-h-screen'>{children}</section>
    </main>
  )
}

export default PageWrapper
