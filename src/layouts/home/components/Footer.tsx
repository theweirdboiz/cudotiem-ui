import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {}

const Footer = (props: Props) => {
  const { t } = useTranslation(['home'])
  return (
    <>
      <section className='border-2 border-primary-500 p-6 text-base dark:border-primary-100 dark:bg-neutral-800 dark:text-white'>
        <div className='max-w-2xl mx-auto' role='alert'>
          <p className=''>
            <strong>👋 </strong>
            {t('home:footer.sologan')}
          </p>
          <p className='mt-5 flex px-5 text-primary-700 dark:text-primary-400'></p>
        </div>
      </section>
      <footer className='footer p-10 bg-white text-base-content'>
        <div>
          <div className='flex'>
            <Link
              data-te-toggle='tooltip'
              to='https://www.facebook.com/sharer/sharer.php?u=https%3A//tailwind-elements.com/docs/standard/navigation/footer/'
              target='_blank'
              className='mx-2 flex items-center'
              data-te-original-title='Share via Facebook'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='pointer-events-none h-7 w-7'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <title>Share via Facebook</title>
                <path d='M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z' />
              </svg>
            </Link>
            {/*Share on LinkedIn*/}
            <Link
              data-te-toggle='tooltip'
              to='http://www.linkedin.com/shareArticle?url=https%3A%2F%2Ftailwind-elements.com%2F&title=500%2B%20open-source%20components%20for%20TailwindCSS'
              target='_blank'
              className='mx-2 flex items-center'
              data-te-original-='Share via LinkedIn'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='pointer-events-none h-7 w-7'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' />
              </svg>
            </Link>
          </div>
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </div>
        <div>
          <span className='footer-title'>Services</span>
          <a className='link link-hover'>Branding</a>
          <a className='link link-hover'>Design</a>
          <a className='link link-hover'>Marketing</a>
          <a className='link link-hover'>Advertisement</a>
        </div>
        <div>
          <span className='footer-title'>Company</span>
          <a className='link link-hover'>About us</a>
          <a className='link link-hover'>Contact</a>
          <a className='link link-hover'>Jobs</a>
          <a className='link link-hover'>Press kit</a>
        </div>
        <div>
          <span className='footer-title'>Legal</span>
          <a className='link link-hover'>Terms of use</a>
          <a className='link link-hover'>Privacy policy</a>
          <a className='link link-hover'>Cookie policy</a>
        </div>
      </footer>
    </>
  )
}

export default Footer
