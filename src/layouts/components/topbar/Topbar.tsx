/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Search from './components/search/Search'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { useAth } from '~/contexts'
import { signout } from '~/services'
import { Role } from '~/types/role.type'
import { removeCookie } from 'typescript-cookie'
import { locales, languages } from '~/i18n/i18n'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from '~/components'
import httpRequest from '~/ultis/httpRequest'

function Topbar() {
  const { auth, setAuth } = useAth()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]

  const signOutMutation = useMutation({
    mutationFn: () => signout(),
    onSuccess: () => {
      removeCookie('cudotiem')
      navigate('/')
      setAuth(undefined)
    }
  })
  const handleSignOut = () => {
    signOutMutation.mutate()
  }
  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    httpRequest.setLanguage(language)
  }

  return (
    <>
      <header className='py-2 text-[14px] relative z-[999] bg-white'>
        <div className='wrapper'>
          {/* header top */}
          <div className='flex-center'>
            {/* left */}
            <div className='flex-center flex-1'>
              <div className='flex-center justify-center  mr-12'>
                <Link to='/' className='block w-14 h-10'>
                  <img
                    src='https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png'
                    alt='logo'
                  />
                </Link>
              </div>
              {/* search */}
              <div className='flex-1 max-w-[75%]'>
                <Search />
              </div>
            </div>
            {/* right */}
            <div className='flex-center gap-x-3 ml-12 text-gray-500 font-normal'>
              <Link to='/' className='flex-center px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-200'>
                <img
                  src='https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png'
                  alt=''
                  className='w-6 h-6 mr-1'
                />
                Trang chủ
              </Link>
              <Link
                className='flex-center px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-200 text-blue-500 border border-current font-bold'
                to='/manage/add-post'
              >
                Đăng tin
              </Link>
              {!auth && (
                <Link
                  to='/sign-in'
                  className='flex-center px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-200 relative group'
                >
                  <img
                    src='https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png'
                    alt=''
                    className='w-6 h-6 mr-1'
                  />
                  Đăng nhập
                </Link>
              )}
              {auth && (
                <div className='relative group'>
                  <Link
                    to='/me'
                    className='flex-center px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-200 relative group'
                  >
                    <img
                      src='https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png'
                      alt=''
                      className='w-6 h-6 mr-1'
                    />
                    Tài khoản
                  </Link>
                  <div className='absolute hidden w-60 z-10 py-2.5 shadow-lg left-0 top-[36px] rounded-lg bg-white -translate-x-1/2 border border-gray-200 text-gray-700 group-hover:block'>
                    <Link to='/my-profile' className='block py-2 px-4 hover:bg-gray-200'>
                      Thông tin tài khoản
                    </Link>
                    <Link to='/manage/post' className='block py-2 px-4 hover:bg-gray-200'>
                      Quản lý tin đăng
                    </Link>
                    <Link to='/' className='block py-2 px-4 hover:bg-gray-200' onClick={handleSignOut}>
                      Đăng xuất
                    </Link>
                  </div>
                </div>
              )}
              <Dropdown classNames='w-[8rem]'>
                <Dropdown.Select placeholder={`${currentLanguage}`} />
                <Dropdown.List>
                  {languages.map((l) => {
                    return (
                      l.key !== i18n.language && (
                        <Dropdown.Option key={l?.key} onClick={handleChangeLanguage} option={l.key}>
                          {l.name}
                        </Dropdown.Option>
                      )
                    )
                  })}
                </Dropdown.List>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Topbar
