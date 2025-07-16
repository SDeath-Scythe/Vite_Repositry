import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {headerLogo} from '../assets/images'
import {hamburger} from '../assets/icons'
import { navLinks } from '../constants'
import CartIcon from './CartIcon'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Handle direct navigation with hash fragments
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash
      if (hash && location.pathname === '/') {
        // Small delay to ensure the page is fully loaded
        setTimeout(() => {
          const targetElement = document.querySelector(hash)
          if (targetElement) {
            targetElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 100)
      }
    }

    // Handle initial load with hash
    handleHashScroll()
    
    // Handle hash changes
    window.addEventListener('hashchange', handleHashScroll)
    
    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [location.pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      if (location.pathname === '/') {
        // We're on home page and clicking an anchor link
        const targetElement = document.querySelector(href)
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      } else {
        // We're on a different page, need to go to home first then scroll
        navigate('/', { state: { scrollTo: href } })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <header className='padding-x py-8 fixed top-0 left-0 right-0 z-[9998] w-full bg-white shadow-md backdrop-blur-md bg-opacity-95'>
        <nav className='flex justify-between items-center max-container'>
            <Link to="/" aria-label="Nike Homepage">
                <img 
                src={headerLogo} 
                alt="Nike Logo" 
                width={130} 
                height={29} 
                />
            </Link>
            <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
                {navLinks.map((item) =>(
                    <li key={item.label}>
                        {(item.href === '/catalog' || item.href === '/' || item.href === '/admin') ? (
                          <Link 
                          to={item.href} 
                          className='font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300'>
                              {item.label}
                          </Link>
                        ) : (
                          <a 
                          href={item.href} 
                          onClick={(e) => {
                            e.preventDefault()
                            handleNavClick(item.href)
                          }}
                          className='font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300'>
                              {item.label}
                          </a>
                        )}
                    </li>
                ))}
            </ul>
            
            {/* Cart Icon and Mobile Menu */}
            <div className="flex items-center gap-4">
                <CartIcon />
                <div className="lg:hidden">
                    <button 
                    onClick={toggleMenu}
                    className="p-2"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                    >
                        <img 
                        src={hamburger} 
                        alt="Menu"
                        width={25}
                        height={25} />
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[9999] lg:hidden">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>
                    
                    {/* Menu Panel */}
                    <div className="absolute top-0 left-0 right-0 bg-white shadow-lg min-h-screen">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <img src={headerLogo} alt="Nike" width={80} height={29} />
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-slate-gray hover:text-coral-red"
                            >
                                ✕
                            </button>
                        </div>
                        
                        {/* Navigation Links */}
                        <div className="p-4">
                            {navLinks.map((item) => (
                                <div key={item.label} className="border-b border-gray-100 last:border-b-0">
                                    {(item.href === '/catalog' || item.href === '/' || item.href === '/admin') ? (
                                        <Link
                                            to={item.href}
                                            className="block py-4 px-2 text-lg text-slate-gray hover:text-coral-red hover:bg-orange-50 font-montserrat transition-all duration-300 rounded-lg"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <a
                                            href={item.href}
                                            className="block py-4 px-2 text-lg text-slate-gray hover:text-coral-red hover:bg-orange-50 font-montserrat transition-all duration-300 rounded-lg"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleNavClick(item.href)
                                                setIsMenuOpen(false)
                                            }}
                                        >
                                            {item.label}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {/* Cart in Mobile Menu */}
                        <div className="p-4 border-t">
                            <CartIcon />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    </header>
  )
}

export default Nav
