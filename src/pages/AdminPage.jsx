import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../context/ProductContext'
import { useDemoProduct } from '../context/DemoProductContext'
import { showToast } from '../components/ToastContainer'
import { authAPI } from '../services/authAPI'
import { validators } from '../utils/validators'

const AdminPage = () => {
  const navigate = useNavigate()
  const realProductContext = useProduct()
  const demoProductContext = useDemoProduct()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isRealAdmin, setIsRealAdmin] = useState(false) // Track if real admin or demo mode
  const [password, setPassword] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Check if we're on GitHub Pages (production) - use demo mode only
  const isGitHubPages = window.location.hostname.includes('github.io')

  // Use appropriate context based on admin status
  const { products, addProduct, updateProduct, deleteProduct, resetToDefault, loading } = 
    (isRealAdmin && !isGitHubPages) ? realProductContext : demoProductContext

  const handleLogin = async (e) => {
    e.preventDefault()
    
    // Validate password input
    const passwordValidation = validators.validatePassword(password)
    if (!passwordValidation.isValid) {
      showToast(passwordValidation.error, 'error')
      return
    }
    
    try {
      if (isGitHubPages) {
        // On GitHub Pages, only demo mode is available
        if (passwordValidation.value === 'nike123') {
          setIsAuthenticated(true)
          setIsRealAdmin(false) // Always demo mode on GitHub Pages
          showToast('Demo Admin Access Granted - Changes saved locally only', 'warning')
        } else {
          showToast('Wrong password. Try: nike123', 'error')
        }
      } else {
        // Local development - use backend authentication
        const response = await authAPI.login(passwordValidation.value)
        setIsAuthenticated(true)
        setIsRealAdmin(response.isRealAdmin)
        showToast(response.message, response.isRealAdmin ? 'success' : 'warning')
      }
    } catch (error) {
      if (isGitHubPages) {
        showToast('Wrong password. Try: nike123', 'error')
      } else {
        showToast('Authentication failed. Please try again.', 'error')
      }
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsRealAdmin(false)
    setPassword('')
    showToast('Logged out successfully', 'success')
  }

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Delete product
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId)
        showToast('Product deleted successfully!', 'success')
      } catch (error) {
        showToast('Failed to delete product', 'error')
      }
    }
  }

  // Reset to default products
  const handleResetToDefault = async () => {
    if (window.confirm('Are you sure you want to reset all products to default? This will remove all custom products.')) {
      try {
        await resetToDefault()
        showToast('Products reset to default successfully!', 'success')
      } catch (error) {
        showToast('Failed to reset products', 'error')
      }
    }
  }

  // Start editing
  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowAddForm(false)
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingProduct(null)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-palanquin font-bold text-slate-gray">
              Admin <span className="text-coral-red">Panel</span>
            </h1>
            <p className="text-slate-gray mt-2">Enter password to access admin features</p>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                {isGitHubPages ? (
                  <>💡 <strong>Demo Mode Only:</strong> Password is <code className="bg-blue-100 px-1 rounded">nike123</code> - Changes save locally only.</>
                ) : (
                  <>💡 <strong>Try it out!</strong> Use any password to access demo mode with local-only changes.</>
                )}
              </p>
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-gray mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-red focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-coral-red text-white py-3 rounded-lg font-montserrat font-semibold hover:bg-red-600 transition-colors"
            >
              Login to Admin Panel
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-slate-gray hover:text-coral-red transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-container padding-x py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-palanquin font-bold">
                Admin <span className="text-coral-red">Dashboard</span>
              </h1>
              {!isRealAdmin && (
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Demo Mode - Changes saved locally only
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-slate-gray">
                Welcome, {isRealAdmin ? 'Admin' : 'Demo User'}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-container padding-x py-8">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-red focus:border-transparent"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* Reset to Default Button */}
            <button
              onClick={handleResetToDefault}
              disabled={loading}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-yellow-600 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {loading ? 'Resetting...' : 'Reset to Default'}
            </button>
            
            {/* Add Product Button */}
            <button
              onClick={() => {
                setShowAddForm(true)
                setEditingProduct(null)
              }}
              disabled={loading}
              className="bg-coral-red text-white px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-red-600 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Product
            </button>
          </div>
        </div>

        {/* Product Form */}
        {(showAddForm || editingProduct) && (
          <ProductForm
            product={editingProduct}
            onSave={async (productData) => {
              try {
                if (editingProduct) {
                  // Update existing product
                  await updateProduct(editingProduct.id, productData)
                  showToast('Product updated successfully!', 'success')
                  setEditingProduct(null)
                } else {
                  // Add new product
                  await addProduct(productData)
                  showToast('Product added successfully!', 'success')
                  setShowAddForm(false)
                }
              } catch (error) {
                showToast(editingProduct ? 'Failed to update product' : 'Failed to add product', 'error')
              }
            }}
            onCancel={() => {
              setShowAddForm(false)
              setEditingProduct(null)
            }}
          />
        )}

        {/* Products Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-palanquin font-bold">
              Product Management ({filteredProducts.length} products)
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => handleEdit(product)}
                onDelete={() => handleDelete(product.id)}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-gray text-lg">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Product Form Component
const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    brand: product?.brand || 'Nike',
    price: product?.price || '',
    category: product?.category || 'Running',
    imgURL: product?.imgURL || '',
    description: product?.description || '',
    isNew: product?.isNew || false,
    onSale: product?.onSale || false,
    salePrice: product?.salePrice || '',
    colors: product?.colors || ['Black', 'White'],
    sizes: product?.sizes || ['7', '8', '9', '10', '11']
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate all form data
    const validation = validators.validateProduct(formData)
    
    if (!validation.isValid) {
      showToast(`Validation failed: ${validation.errors.join(', ')}`, 'error')
      return
    }
    
    // Use validated and sanitized data
    onSave(validation.validatedProduct)
  }

  const handleChange = (field, value) => {
    // Handle price fields with special formatting
    if (field === 'price' || field === 'salePrice') {
      // Only format on blur or when user finishes typing, allow free typing
      const sanitizedValue = validators.sanitizeString(value)
      setFormData(prev => ({ ...prev, [field]: sanitizedValue }))
    } else {
      // Sanitize input on change for other fields
      const sanitizedValue = typeof value === 'string' ? validators.sanitizeString(value) : value
      setFormData(prev => ({ ...prev, [field]: sanitizedValue }))
    }
  }

  // Handle price field blur to format the price
  const handlePriceBlur = (field) => {
    const currentValue = formData[field]
    if (currentValue && currentValue.trim() !== '') {
      const formattedPrice = validators.formatPrice(currentValue)
      if (formattedPrice !== currentValue) {
        setFormData(prev => ({ ...prev, [field]: formattedPrice }))
      }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-palanquin font-bold mb-6">
        {product ? 'Edit Product' : 'Add New Product'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-slate-gray mb-2">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-red focus:border-transparent"
              required
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-slate-gray mb-2">
              Brand
            </label>
            <select
              value={formData.brand}
              onChange={(e) => handleChange('brand', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-red focus:border-transparent"
            >
              <option value="Nike">Nike</option>
              <option value="Jordan">Jordan</option>
              <option value="Converse">Converse</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-gray mb-2">
              Price *
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              onBlur={() => handlePriceBlur('price')}
              placeholder="10 or $10.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-red focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Enter a number (e.g., 10) - will auto-format to $10.00</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-gray mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-red focus:border-transparent"
            >
              <option value="Running">Running</option>
              <option value="Basketball">Basketball</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Training">Training</option>
              <option value="Football">Football</option>
            </select>
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-gray mb-2">
              Image URL *
            </label>
            <input
              type="url"
              value={formData.imgURL}
              onChange={(e) => handleChange('imgURL', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-red focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-gray mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-red focus:border-transparent"
              placeholder="Product description..."
            />
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => handleChange('isNew', e.target.checked)}
                className="mr-2"
              />
              New Product
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.onSale}
                onChange={(e) => handleChange('onSale', e.target.checked)}
                className="mr-2"
              />
              On Sale
            </label>
          </div>

          {/* Sale Price */}
          {formData.onSale && (
            <div>
              <label className="block text-sm font-medium text-slate-gray mb-2">
                Sale Price
              </label>
              <input
                type="text"
                value={formData.salePrice}
                onChange={(e) => handleChange('salePrice', e.target.value)}
                onBlur={() => handlePriceBlur('salePrice')}
                placeholder="10 or $10.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-red focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Enter a number (e.g., 10) - will auto-format to $10.00</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-slate-gray rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-coral-red text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {product ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

// Product Card Component for Admin
const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 relative">
        <img
          src={product.imgURL}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
              NEW
            </span>
          )}
          {product.onSale && (
            <span className="bg-coral-red text-white px-2 py-1 rounded text-xs font-bold">
              SALE
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-palanquin font-semibold text-lg mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-slate-gray text-sm mb-2">{product.brand}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            {product.onSale ? (
              <div className="flex items-center gap-2">
                <span className="text-coral-red font-bold">{product.salePrice}</span>
                <span className="text-slate-gray line-through text-sm">{product.price}</span>
              </div>
            ) : (
              <span className="text-coral-red font-bold">{product.price}</span>
            )}
          </div>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
