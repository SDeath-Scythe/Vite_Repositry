import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { categories, priceRanges, sortOptions } from '../constants'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import FilterSidebar from '../components/FilterSidebar'
import { useProduct } from '../context/ProductContext'
import { arrowRight } from '../assets/icons'

const CatalogPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { 
    products,
    selectedProductId, 
    clearSelection,
    searchTerm: contextSearchTerm,
    setSearchTerm: setContextSearchTerm,
    selectedCategory: contextSelectedCategory,
    setSelectedCategory: setContextSelectedCategory
  } = useProduct()

  const [searchTerm, setSearchTerm] = useState(contextSearchTerm)
  const [selectedCategory, setSelectedCategory] = useState(contextSelectedCategory)
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showOnSale, setShowOnSale] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Check if we came from a product selection
  useEffect(() => {
    if (selectedProductId) {
      const product = products.find(p => p.id === selectedProductId)
      if (product) {
        setSearchTerm('')
        setSelectedCategory('all')
        setSelectedPriceRange('all')
        setShowOnSale(false)
        setShowNew(false)
        setSortBy('featured')
        
        setContextSearchTerm('')
        setContextSelectedCategory('all')
      }
    }
  }, [selectedProductId, setContextSearchTerm, setContextSelectedCategory])

  // Update context when local state changes
  useEffect(() => {
    setContextSearchTerm(searchTerm)
    setContextSelectedCategory(selectedCategory)
  }, [searchTerm, selectedCategory, setContextSearchTerm, setContextSelectedCategory])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || 
                             product.category.toLowerCase() === selectedCategory
      
      const priceRange = priceRanges.find(range => range.id === selectedPriceRange)
      const productPrice = parseFloat(product.price.replace('$', ''))
      const matchesPrice = !priceRange || 
                          (productPrice >= priceRange.min && productPrice <= priceRange.max)
      
      const matchesOnSale = !showOnSale || product.onSale
      const matchesNew = !showNew || product.isNew
      
      return matchesSearch && matchesCategory && matchesPrice && matchesOnSale && matchesNew
    })

    // If a product is selected, move it to the front
    if (selectedProductId) {
      const selectedIndex = filtered.findIndex(p => p.id === selectedProductId)
      if (selectedIndex > -1) {
        const selectedProduct = filtered.splice(selectedIndex, 1)[0]
        filtered.unshift(selectedProduct)
      }
    }

    // Sort products
    const selectedProduct = selectedProductId ? filtered.find(p => p.id === selectedProductId) : null
    let productsToSort = selectedProductId ? filtered.filter(p => p.id !== selectedProductId) : filtered

    switch (sortBy) {
      case 'name-asc':
        productsToSort.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        productsToSort.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'price-asc':
        productsToSort.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')))
        break
      case 'price-desc':
        productsToSort.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')))
        break
      case 'rating-desc':
        productsToSort.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        productsToSort.sort((a, b) => b.isNew - a.isNew)
        break
      default:
        break
    }

    return selectedProduct ? [selectedProduct, ...productsToSort] : productsToSort
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy, showOnSale, showNew, selectedProductId])

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedPriceRange('all')
    setSortBy('featured')
    setShowOnSale(false)
    setShowNew(false)
    clearSelection()
  }

  const goBackHome = () => {
    clearSelection()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-container padding-x py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={goBackHome}
              className="flex items-center gap-3 text-slate-gray hover:text-coral-red transition-colors"
            >
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="font-montserrat font-semibold">Back to Home</span>
            </button>
            
            <h1 className="text-3xl font-palanquin font-bold text-center">
              Nike <span className="text-coral-red">Catalog</span>
            </h1>
            
            <div className="w-32"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-container padding">
        <div className="flex flex-col gap-8">
          {/* Page Title and Description */}
          <div className="text-center">
            <h2 className="text-4xl font-palanquin font-bold mb-4">
              Complete <span className="text-coral-red">Product</span> Collection
            </h2>
            <p className="lg:max-w-lg mx-auto font-montserrat text-slate-gray">
              {selectedProductId 
                ? "Showing your selected product and related items" 
                : "Discover our entire collection of premium Nike footwear. Find the perfect pair for your lifestyle and activities."
              }
            </p>
            
            {/* Selected Product Banner */}
            {selectedProductId && (
              <div className="mt-6 bg-coral-red text-white px-6 py-4 rounded-xl inline-flex items-center gap-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-montserrat font-semibold text-lg">
                    Selected: {products.find(p => p.id === selectedProductId)?.name}
                  </span>
                </div>
                <button
                  onClick={clearSelection}
                  className="bg-white text-coral-red px-4 py-2 rounded-lg text-sm font-montserrat font-semibold hover:scale-105 transition-transform"
                >
                  Clear Selection
                </button>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
            resultsCount={filteredAndSortedProducts.length}
          />

          <div className="flex gap-8 relative">
            {/* Filter Sidebar */}
            <FilterSidebar
              isOpen={isFilterOpen}
              categories={categories}
              priceRanges={priceRanges}
              sortOptions={sortOptions}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showOnSale={showOnSale}
              setShowOnSale={setShowOnSale}
              showNew={showNew}
              setShowNew={setShowNew}
              onClearAll={clearAllFilters}
              onClose={() => setIsFilterOpen(false)}
            />

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="font-montserrat text-slate-gray text-lg">
                    Showing {filteredAndSortedProducts.length} of {products.length} products
                    {selectedProductId && " (selected product shown first)"}
                  </p>
                  <p className="font-montserrat text-slate-gray text-sm mt-1">
                    Premium Nike footwear for every activity
                  </p>
                </div>
                
                {/* Mobile Sort Dropdown */}
                <div className="lg:hidden">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-slate-gray rounded-lg font-montserrat"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                  {filteredAndSortedProducts.map((product, index) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      isSelected={product.id === selectedProductId}
                      isFirst={index === 0 && selectedProductId}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-2xl font-palanquin font-bold mb-4">No products found</h3>
                    <p className="font-montserrat text-slate-gray mb-6">
                      Try adjusting your search criteria or filters to find what you're looking for.
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="bg-coral-red text-white px-6 py-3 rounded-lg font-montserrat font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}

              {/* Back to Home Button */}
              <div className="flex justify-center mt-16">
                <button
                  onClick={goBackHome}
                  className="bg-white text-coral-red border-2 border-coral-red px-8 py-4 rounded-xl font-montserrat font-semibold hover:bg-coral-red hover:text-white transition-all duration-300 inline-flex items-center gap-3"
                >
                  <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Continue Shopping on Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CatalogPage
