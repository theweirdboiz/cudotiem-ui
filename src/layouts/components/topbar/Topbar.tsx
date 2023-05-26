/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom'
import { useAth, useSearch } from '~/contexts'
import Search from './components/search/Search'
import { signout } from '~/services'
import { removeCookie } from 'typescript-cookie'
import { toast } from 'react-toastify'
import { Button } from '~/components'

function Topbar() {
  const { isOpen } = useSearch()
  const { auth } = useAth()
  const handleSignout = async () => {
    console.log(123)
    const response = await signout<any>()
    removeCookie('cudotiem')
    toast.success(response?.message)
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
              <div className='flex-center px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-200'>
                <img
                  src='https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png'
                  alt=''
                  className='w-6 h-6 mr-1'
                />
                <Link to='/'>Trang chủ</Link>
              </div>
              {auth && (
                <div className='flex-center px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-200 text-blue-500 border border-current font-bold'>
                  <Link to='/manage/add-post'>Đăng tin</Link>
                </div>
              )}
              <div className='flex-center px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-200 relative group'>
                <img
                  src='https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png'
                  alt=''
                  className='w-6 h-6 mr-1'
                />
                {auth ? <Link to='/profile/me'>Tài khoản</Link> : <Link to='/sign-in'>Đăng nhập</Link>}
                <div
                  className={`${
                    auth ? 'group-hover:block' : ''
                  } hidden absolute w-60 z-10 py-2.5 shadow-lg left-0 top-[38px] rounded-lg bg-white text-gray-700 -translate-x-1/2 border border-gray-200`}
                >
                  <a href='/my-profile'>
                    <p className='py-2 px-4 hover:bg-gray-200'>Thông tin tài khoản</p>
                  </a>
                  <a href='/my-posts'>
                    <p className='py-2 px-4 hover:bg-gray-200'>Tin đăng của tôi</p>
                  </a>
                  <p className='py-2 px-4 hover:bg-gray-200' onClick={handleSignout}>
                    Đăng xuất
                  </p>
                </div>
              </div>
              {/* cart */}
              {/* <div className='flex-center cursor-pointer '>
                <button>
                  <div className="box-center ml-6 relative after:absolute after:content-[''] after:h-5 after:-left-3 after:border after:border-gray-200">
                    <div className='box-center w-10 h-10 relative hover:bg-blue-100 rounded-lg'>
                      <img
                        src='https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png'
                        alt='header cart'
                        className='w-6 h-6'
                      />
                      <span className='absolute bg-red-500 rounded-lg inline-block right-0 -top-1 px-[3.5px] py-[0.5px] text-[10px] text-white'>
                        0
                      </span>
                    </div>
                  </div>
                </button>
              </div> */}
            </div>
          </div>
          {/* header bottom */}
          {/* <div className='flex-center-between'>
            <div className='flex items-start ml-[105px] mt-2 w-[872px]'>
              <Link to='/thoi-trang/pants' className='mr-3 text-gray-400'>
                Quần
              </Link>
              <Link to='/thoi-trang/pants' className='mr-3 text-gray-400'>
                Quần
              </Link>
              <Link to='/thoi-trang/pants' className='mr-3 text-gray-400'>
                Quần
              </Link>
            </div>
            <div className='mt-2 flex-shrink-0 flex-grow-0 w-[348px] basis-[348px]'>
              <div className='flex justify-end items-center cursor-pointer'>
                <img
                  src='https://salt.tikicdn.com/ts/upload/88/5c/9d/f5ee506836792eb7775e527ef8350a44.png'
                  alt='location-icon'
                  className='w-5 h-5 mr-1'
                />
                <h4 className='pr-1'>Giao đến:</h4>
                <h4 className='underline font-medium'>TP.Thủ Đức, P.Linh Trung, Hồ Chí Minh</h4>
              </div>
            </div>
          </div> */}
        </div>
      </header>
      {/* <section className='box-center bg-orange-200 py-2 text-[14px]'>
        <Link to='/khuyen-mai' className='flex-center'>
          <picture>
            <img
              src='https://salt.tikicdn.com/ts/upload/5e/ec/fb/150f3c633781ed1da9921e45db90c62d.png'
              alt='icon'
              width={81}
              height={12}
            />
          </picture>
          <p className='pl-1'>
            <strong>mọi đơn từ 149k. </strong>
          </p>
          <picture>
            <img
              src='https://salt.tikicdn.com/ts/upload/51/20/3f/1bb77cdb828972a5284a06dac79c0afc.png'
              alt='icon'
              width={7}
              height={11}
              className='ml-1'
            />
          </picture>
        </Link>
      </section> */}
    </>
  )
}

export default Topbar
