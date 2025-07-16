import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { showToast } from './ToastContainer'
import { createPortal } from 'react-dom'

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    // For now, just navigate to a checkout page (you can implement this later)
    onClose()
    showToast('Checkout functionality coming soon! 🚀', 'info', 4000)
  }

  const handleClearCart = () => {
    clearCart()
    showToast('Cart cleared successfully!', 'success')
  }

  const handleContinueShopping = () => {
    onClose()
    navigate('/catalog')
  }

  if (!isOpen) return null

  return createPortal(
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        style={{ zIndex: 999998 }}
        onClick={onClose}
      />
      
      {/* Cart Drawer */}
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform"
        style={{ zIndex: 999999 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-palanquin font-bold">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <h3 className="text-xl font-palanquin font-semibold mb-2">Your cart is empty</h3>
                <p className="text-slate-gray mb-6">Add some amazing Nike products to get started!</p>
                <button
                  onClick={handleContinueShopping}
                  className="bg-coral-red text-white px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-red-600 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.cartItemId}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center text-xl font-palanquin font-bold">
                <span>Total:</span>
                <span className="text-coral-red">${getCartTotal().toFixed(2)}</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-coral-red text-white py-3 rounded-lg font-montserrat font-semibold hover:bg-red-600 transition-colors"
                >
                  Checkout
                </button>
                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-gray-100 text-slate-gray py-3 rounded-lg font-montserrat font-semibold hover:bg-gray-200 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleClearCart}
                  className="w-full text-red-500 py-2 font-montserrat font-medium hover:text-red-600 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  )
}

// Cart Item Component
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, selectedSize, selectedColor, quantity, cartItemId } = item
  const price = parseFloat(product.price.replace('$', ''))
  const itemTotal = price * quantity

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      {/* Product Image */}
      <div className="flex-shrink-0 w-24 h-24 bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={product.imgURL}
          alt={product.name}
          className="w-full h-full object-contain p-2"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-palanquin font-semibold text-lg mb-1 truncate">
          {product.name}
        </h3>
        <div className="text-sm text-slate-gray mb-2">
          <p>Size: {selectedSize}</p>
          <p>Color: {selectedColor}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-coral-red">
            ${itemTotal.toFixed(2)}
          </div>
          <div className="text-sm text-slate-gray">
            ${price.toFixed(2)} each
          </div>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => onRemove(cartItemId)}
          className="text-red-500 hover:text-red-600 transition-colors"
          aria-label="Remove item"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        
        <div className="flex items-center gap-2 border rounded-lg">
          <button
            onClick={() => onUpdateQuantity(cartItemId, quantity - 1)}
            className="p-1 hover:bg-gray-100 transition-colors"
            disabled={quantity <= 1}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          
          <span className="px-3 py-1 font-montserrat font-semibold min-w-[3rem] text-center">
            {quantity}
          </span>
          
          <button
            onClick={() => onUpdateQuantity(cartItemId, quantity + 1)}
            className="p-1 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
