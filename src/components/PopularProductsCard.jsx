import React from 'react'
import { useNavigate } from 'react-router-dom'
import { star } from '../assets/icons'
import { useProduct } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import { showToast } from './ToastContainer'

const PopularProductsCard = ({ imgURL, name, price, id, originalPrice, onSale, isNew, rating, sizes, colors }) => {
  const { selectProduct } = useProduct()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const handleCardClick = () => {
    // Select the product and navigate to catalog
    selectProduct(id)
    navigate('/catalog')
  }

  const handleQuickAdd = (e) => {
    e.stopPropagation() // Prevent card click
    const product = { id, name, price, imgURL }
    const defaultSize = sizes?.[0] || 'M'
    const defaultColor = colors?.[0] || 'Black'
    
    const wasInCart = addToCart(product, defaultSize, defaultColor, 1)
    showToast(`Added ${name} to cart! (${defaultColor}, Size ${defaultSize})`, 'success')
  }

  return (
    <div 
      className='flex flex-1 flex-col w-full max-sm:w-full group cursor-pointer'
      onClick={handleCardClick}
    >
      <div className="relative">
        {/* Product Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
              NEW
            </span>
          )}
          {onSale && (
            <span className="bg-coral-red text-white px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
              SALE
            </span>
          )}
        </div>

        <img 
          src={imgURL}
          alt={name}
          className='w-[280px] h-[280px] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300' 
        />
        
        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 bg-coral-red text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 z-10"
          aria-label="Quick add to cart"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
        </button>
      </div>
      
      <div className='mt-8 flex justify-start gap-2.5'>
        <img src={star} alt="rating" width={24} height={24} />
        <p className="font-montserrat text-xl leading-normal text-slate-gray">
          ({rating || 4.5})
        </p>
      </div>
      
      <h3 className='mt-2 text-2xl leading-normal font-semibold font-palanquin group-hover:text-coral-red transition-colors'>
        {name}
      </h3>
      
      <div className="flex items-center gap-3 mt-2">
        <p className='font-montserrat text-coral-red font-semibold text-3xl leading-normal'>
          {price}
        </p>
        {onSale && originalPrice && originalPrice !== price && (
          <p className='font-montserrat text-slate-gray font-semibold text-xl leading-normal line-through'>
            {originalPrice}
          </p>
        )}
      </div>
    </div>
  )
}

export default PopularProductsCard
