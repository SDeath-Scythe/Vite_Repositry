import { createContext, useContext, useState, useEffect } from 'react'
import { products as initialProducts } from '../constants'
import { productAPI } from '../services/productAPI'

const ProductContext = createContext()

export const useProduct = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}

export const ProductProvider = ({ children }) => {
  // Product management state
  const [products, setProducts] = useState(initialProducts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // UI state for product selection and filtering
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Load products from API on component mount
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const apiProducts = await productAPI.getAllProducts()
      setProducts(apiProducts)
    } catch (err) {
      console.error('Failed to load products from API, using fallback:', err)
      setError('Failed to connect to server. Using local data.')
      // Keep using initial products as fallback
      setProducts(initialProducts)
    } finally {
      setLoading(false)
    }
  }

  // Product management functions
  const addProduct = async (product) => {
    try {
      setLoading(true)
      setError(null)
      const newProduct = await productAPI.addProduct(product)
      setProducts(prev => [...prev, newProduct])
      return newProduct
    } catch (err) {
      setError('Failed to add product')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (id, updatedProduct) => {
    try {
      setLoading(true)
      setError(null)
      const updated = await productAPI.updateProduct(id, updatedProduct)
      setProducts(prev => prev.map(p => p.id === id ? updated : p))
      return updated
    } catch (err) {
      setError('Failed to update product')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id) => {
    try {
      setLoading(true)
      setError(null)
      await productAPI.deleteProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError('Failed to delete product')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const resetToDefault = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await productAPI.resetToDefault()
      setProducts(result.products)
      return result
    } catch (err) {
      setError('Failed to reset products')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id))
  }

  // UI functions
  const selectProduct = (productId) => {
    setSelectedProductId(productId)
    // Clear other filters when selecting a specific product
    setSearchTerm('')
    setSelectedCategory('all')
  }

  const clearSelection = () => {
    setSelectedProductId(null)
  }

  const value = {
    // Product data
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefault,
    getProductById,
    loadProducts,
    // UI state
    selectedProductId,
    setSelectedProductId,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectProduct,
    clearSelection
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext
