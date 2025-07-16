const FilterSidebar = ({
  isOpen,
  categories,
  priceRanges,
  sortOptions,
  selectedCategory,
  setSelectedCategory,
  selectedPriceRange,
  setSelectedPriceRange,
  sortBy,
  setSortBy,
  showOnSale,
  setShowOnSale,
  showNew,
  setShowNew,
  onClearAll,
  onClose
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        lg:sticky lg:top-8 lg:w-80 lg:h-fit
        fixed top-0 right-0 h-full w-80 bg-white z-50
        transform transition-transform duration-300 lg:transform-none
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        shadow-xl lg:shadow-lg rounded-l-xl lg:rounded-xl
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-palanquin font-bold">Filters</h3>
            <div className="flex gap-2">
              <button
                onClick={onClearAll}
                className="text-coral-red hover:underline font-montserrat text-sm"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
                aria-label="Close filters"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sort By */}
          <div className="mb-6 hidden lg:block">
            <h4 className="font-montserrat font-semibold mb-3">Sort By</h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-montserrat focus:border-coral-red focus:outline-none"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-montserrat font-semibold mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <label
                  key={category.id}
                  className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-3 text-coral-red focus:ring-coral-red"
                    />
                    <span className="font-montserrat">{category.name}</span>
                  </div>
                  <span className="text-sm text-slate-gray bg-gray-100 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-montserrat font-semibold mb-3">Price Range</h4>
            <div className="space-y-2">
              {priceRanges.map(range => (
                <label
                  key={range.id}
                  className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.id}
                    checked={selectedPriceRange === range.id}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="mr-3 text-coral-red focus:ring-coral-red"
                  />
                  <span className="font-montserrat">{range.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Special Filters */}
          <div className="mb-6">
            <h4 className="font-montserrat font-semibold mb-3">Special Filters</h4>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={showOnSale}
                  onChange={(e) => setShowOnSale(e.target.checked)}
                  className="mr-3 text-coral-red focus:ring-coral-red"
                />
                <span className="font-montserrat">On Sale</span>
                <span className="ml-2 text-xs bg-coral-red text-white px-2 py-1 rounded-full">
                  SALE
                </span>
              </label>
              
              <label className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={showNew}
                  onChange={(e) => setShowNew(e.target.checked)}
                  className="mr-3 text-coral-red focus:ring-coral-red"
                />
                <span className="font-montserrat">New Arrivals</span>
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                  NEW
                </span>
              </label>
            </div>
          </div>

          {/* Size Filter (Future Enhancement) */}
          <div className="mb-6">
            <h4 className="font-montserrat font-semibold mb-3">Popular Sizes</h4>
            <div className="grid grid-cols-4 gap-2">
              {[7, 8, 9, 10, 11, 12].map(size => (
                <button
                  key={size}
                  className="px-3 py-2 border border-gray-300 rounded-lg font-montserrat text-sm hover:border-coral-red hover:bg-coral-red hover:text-white transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter (Future Enhancement) */}
          <div className="mb-6">
            <h4 className="font-montserrat font-semibold mb-3">Colors</h4>
            <div className="grid grid-cols-6 gap-2">
              {['Black', 'White', 'Red', 'Blue', 'Gray', 'Green'].map(color => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 border-gray-300 hover:border-coral-red transition-colors ${getColorClass(color)}`}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Apply Filters Button (Mobile) */}
          <div className="lg:hidden">
            <button
              onClick={onClose}
              className="w-full bg-coral-red text-white py-3 rounded-lg font-montserrat font-semibold hover:bg-opacity-90 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
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
    'Green': 'bg-green-500'
  }
  return colorMap[color] || 'bg-gray-400'
}

export default FilterSidebar
