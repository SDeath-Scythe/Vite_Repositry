import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

// Cart action types
const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
}

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { product, selectedSize, selectedColor, quantity = 1 } = action.payload
      const cartItemId = `${product.id}-${selectedSize}-${selectedColor}`
      
      const existingItem = state.items.find(item => item.cartItemId === cartItemId)
      
      if (existingItem) {
        // Update quantity if item already exists
        return {
          ...state,
          items: state.items.map(item =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }
      }
      
      // Add new item
      const newItem = {
        cartItemId,
        product,
        selectedSize,
        selectedColor,
        quantity,
        addedAt: new Date().toISOString()
      }
      
      return {
        ...state,
        items: [...state.items, newItem]
      }
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { cartItemId, quantity } = action.payload
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.cartItemId !== cartItemId)
        }
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity }
            : item
        )
      }
    }
    
    case CART_ACTIONS.REMOVE_FROM_CART: {
      const { cartItemId } = action.payload
      return {
        ...state,
        items: state.items.filter(item => item.cartItemId !== cartItemId)
      }
    }
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: []
      }
    
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload.items || []
      }
    
    default:
      return state
  }
}

// Initial state
const initialState = {
  items: [],
  isOpen: false
}

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nike-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nike-cart', JSON.stringify(state))
  }, [state])

  // Cart actions
  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: { product, selectedSize, selectedColor, quantity }
    })
  }

  const updateQuantity = (cartItemId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { cartItemId, quantity }
    })
  }

  const removeFromCart = (cartItemId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: { cartItemId }
    })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.product.price.replace('$', ''))
      return total + (price * item.quantity)
    }, 0)
  }

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  }

  const isInCart = (productId, size, color) => {
    const cartItemId = `${productId}-${size}-${color}`
    return state.items.some(item => item.cartItemId === cartItemId)
  }

  const getCartItem = (productId, size, color) => {
    const cartItemId = `${productId}-${size}-${color}`
    return state.items.find(item => item.cartItemId === cartItemId)
  }

  const value = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
    getCartItem
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
