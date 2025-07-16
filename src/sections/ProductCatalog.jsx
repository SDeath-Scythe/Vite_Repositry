import { useState, useMemo, useEffect } from 'react'
import { categories, priceRanges, sortOptions } from '../constants'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import FilterSidebar from '../components/FilterSidebar'
import { useProduct } from '../context/ProductContext'

const ProductCatalog = () => {
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

  // Sync with context when selectedProductId changes
  useEffect(() => {
    if (selectedProductId) {
      // Find the selected product
      const product = products.find(p => p.id === selectedProductId)
      if (product) {
        // Clear filters to show the selected product prominently
        setSearchTerm('')
        setSelectedCategory('all')
        setSelectedPriceRange('all')
        setShowOnSale(false)
        setShowNew(false)
        setSortBy('featured')
        
        // Update context
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
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || 
                             product.category.toLowerCase() === selectedCategory
      
      // Price range filter
      const priceRange = priceRanges.find(range => range.id === selectedPriceRange)
      const productPrice = parseFloat(product.price.replace('$', ''))
      const matchesPrice = !priceRange || 
                          (productPrice >= priceRange.min && productPrice <= priceRange.max)
      
      // On sale filter
      const matchesOnSale = !showOnSale || product.onSale
      
      // New filter
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

    // Sort products (but keep selected product first)
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
        // Featured - keep original order
        break
    }

    // Combine selected product (if any) with sorted products
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

  return (
    <section id="catalog" className="max-container padding">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-palanquin font-bold mb-4">
            Complete <span className="text-coral-red">Product</span> Catalog
          </h2>
          <p className="lg:max-w-lg mx-auto font-montserrat text-slate-gray">
            {selectedProductId 
              ? "Showing your selected product and related items" 
              : "Explore our entire collection of premium Nike footwear. Find the perfect pair for your lifestyle and activities."
            }
          </p>
          
          {/* Selected Product Banner */}
          {selectedProductId && (
            <div className="mt-4 bg-coral-red text-white px-6 py-3 rounded-lg inline-flex items-center gap-3">
              <span className="font-montserrat font-semibold">
                Showing: {products.find(p => p.id === selectedProductId)?.name}
              </span>
              <button
                onClick={clearSelection}
                className="bg-white text-coral-red px-3 py-1 rounded-full text-sm font-montserrat hover:scale-105 transition-transform"
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
            <div className="flex justify-between items-center mb-6">
              <p className="font-montserrat text-slate-gray">
                Showing {filteredAndSortedProducts.length} of {products.length} products
                {selectedProductId && " (selected product shown first)"}
              </p>
              
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
                <h3 className="text-2xl font-palanquin font-bold mb-4">No products found</h3>
                <p className="font-montserrat text-slate-gray mb-6">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-coral-red text-white px-6 py-3 rounded-lg font-montserrat hover:scale-105 transition-transform"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductCatalog
