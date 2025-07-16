import { useState } from 'react'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'

const CartIcon = () => {
  const { getCartCount } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cartCount = getCartCount()

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative group p-3 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-300 hover:scale-105"
        aria-label={`Shopping cart with ${cartCount} items`}
      >
        {/* Cart Icon */}
        <svg 
          className="w-7 h-7 text-slate-gray group-hover:text-coral-red transition-colors duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        
        {/* Cart Count Badge */}
        {cartCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-coral-red text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center min-w-[24px] shadow-lg border-2 border-white animate-pulse">
            {cartCount > 99 ? '99+' : cartCount}
          </div>
        )}
        
        {/* Hover Effect Background */}
        <div className="absolute inset-0 bg-coral-red rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </button>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  )
}

export default CartIcon
