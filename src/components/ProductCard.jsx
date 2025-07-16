import { useState, useRef, useEffect } from 'react'
import { star } from '../assets/icons'
import { useCart } from '../context/CartContext'
import { showToast } from './ToastContainer'

const ProductCard = ({ product, isSelected = false, isFirst = false }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [showSizeSelector, setShowSizeSelector] = useState(false)
  const [showSizeDropdown, setShowSizeDropdown] = useState(false)
  const sizeDropdownRef = useRef(null)
  
  const { addToCart, isInCart } = useCart()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sizeDropdownRef.current && !sizeDropdownRef.current.contains(event.target)) {
        setShowSizeDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeSelector(true)
      setShowSizeDropdown(true)
      showToast('Please select a size first', 'error')
      return
    }
    
    const wasInCart = isInCart(product.id, selectedSize, selectedColor)
    addToCart(product, selectedSize, selectedColor, 1)
    setShowSizeSelector(false)
    setShowSizeDropdown(false)
    
    // Show success message
    if (wasInCart) {
      showToast(`Updated ${product.name} quantity in cart!`, 'success')
    } else {
      showToast(`Added ${product.name} to cart! (${selectedColor}, Size ${selectedSize})`, 'success')
    }
  }

  const handleQuickView = () => {
    // TODO: Open product modal
    alert(`Quick view for ${product.name}`)
  }

  const cardClasses = `group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
    isSelected 
      ? 'ring-4 ring-coral-red ring-opacity-50 shadow-2xl scale-105' 
      : ''
  }`

  return (
    <div className={cardClasses}>
      {/* Selected Product Badge */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-20 bg-coral-red text-white px-3 py-1 rounded-full text-xs font-montserrat font-bold">
          SELECTED
        </div>
      )}

      {/* Product Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
            NEW
          </span>
        )}
        {product.onSale && (
          <span className="bg-coral-red text-white px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
            SALE
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        aria-label="Add to wishlist"
      >
        <svg
          className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`}
          fill={isWishlisted ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400 font-montserrat">Loading...</span>
          </div>
        )}
        <img
          src={product.imgURL}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button
            onClick={handleQuickView}
            className="bg-white text-black px-4 py-2 rounded-lg font-montserrat text-sm hover:scale-105 transition-transform"
          >
            Quick View
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-coral-red text-white px-4 py-2 rounded-lg font-montserrat text-sm hover:scale-105 transition-transform"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <p className="text-xs font-montserrat text-coral-red uppercase tracking-wide mb-2">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="text-xl font-palanquin font-semibold mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm font-montserrat text-slate-gray mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={star}
                alt="star"
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? 'opacity-100' : 'opacity-30'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-montserrat text-slate-gray">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {/* Color Options */}
        <div className="mb-4">
          <p className="text-sm font-montserrat text-slate-gray mb-2">Colors:</p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color ? 'border-coral-red' : 'border-gray-300'
                } ${getColorClass(color)} hover:scale-110 transition-transform`}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-palanquin font-bold text-coral-red">
            {product.price}
          </span>
          {product.onSale && product.originalPrice !== product.price && (
            <span className="text-lg font-montserrat text-slate-gray line-through">
              {product.originalPrice}
            </span>
          )}
        </div>

        {/* Size Options */}
        <div className="mb-6" ref={sizeDropdownRef}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-montserrat text-slate-gray">
              Size: <span className="font-semibold text-slate-800">{selectedSize}</span>
              {showSizeSelector && <span className="text-coral-red"> (Please select a size)</span>}
            </p>
            <button
              onClick={() => setShowSizeDropdown(!showSizeDropdown)}
              className="flex items-center gap-1 text-sm text-coral-red hover:text-red-600 transition-colors"
            >
              <span>Change Size</span>
              <svg 
                className={`w-4 h-4 transition-transform ${showSizeDropdown ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {/* Collapsible Size Grid */}
          {showSizeDropdown && (
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border animate-slideDown">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size)
                    setShowSizeSelector(false)
                    setShowSizeDropdown(false)
                  }}
                  className={`px-3 py-1 text-sm font-montserrat rounded transition-colors ${
                    selectedSize === size
                      ? 'bg-coral-red text-white'
                      : showSizeSelector
                      ? 'bg-red-100 text-coral-red border-2 border-coral-red hover:bg-coral-red hover:text-white'
                      : 'bg-white text-slate-gray hover:bg-coral-red hover:text-white border border-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 rounded-lg font-montserrat font-semibold transition-all duration-300 ${
            isSelected 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : showSizeSelector
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-coral-red text-white hover:bg-opacity-90 hover:scale-105'
          }`}
        >
          {showSizeSelector 
            ? 'Select Size First' 
            : isSelected 
            ? `Selected - Add to Cart (${selectedColor}, ${selectedSize})` 
            : `Add to Cart - ${selectedColor}, ${selectedSize}`}
        </button>
      </div>
    </div>
  )
}

// Helper function to get color classes
const getColorClass = (color) => {
  const colorMap = {
    'Red': 'bg-red-500',
    'Black': 'bg-black',
    'White': 'bg-white border-gray-400',
    'Blue': 'bg-blue-500',
    'Gray': 'bg-gray-500',
    'Green': 'bg-green-500',
    'Pink': 'bg-pink-500',
    'Orange': 'bg-orange-500',
    'Purple': 'bg-purple-500',
    'Navy': 'bg-blue-900',
    'Tan': 'bg-yellow-600',
    'Gold': 'bg-yellow-400',
    'Silver': 'bg-gray-300',
    'Neon': 'bg-lime-400'
  }
  return colorMap[color] || 'bg-gray-400'
}

export default ProductCard
