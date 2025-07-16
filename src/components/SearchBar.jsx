import { useState } from 'react'

const SearchBar = ({ searchTerm, setSearchTerm, onFilterToggle, resultsCount }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        {/* Search Input */}
        <div className={`relative flex items-center bg-white rounded-xl shadow-lg border-2 transition-colors duration-300 ${
          isFocused ? 'border-coral-red' : 'border-gray-200'
        }`}>
          {/* Search Icon */}
          <div className="pl-6 pr-3">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search shoes by name, category, or description..."
            className="flex-1 py-4 pr-4 bg-transparent font-montserrat text-lg placeholder-gray-400 focus:outline-none"
          />

          {/* Clear Button */}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-3 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Filter Toggle Button */}
          <button
            onClick={onFilterToggle}
            className="lg:hidden ml-2 mr-4 px-4 py-2 bg-coral-red text-white rounded-lg hover:scale-105 transition-transform"
            aria-label="Toggle filters"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              />
            </svg>
          </button>
        </div>

        {/* Search Suggestions (when typing) */}
        {searchTerm && isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
            <div className="p-4">
              <p className="text-sm font-montserrat text-slate-gray mb-2">
                {resultsCount} result{resultsCount !== 1 ? 's' : ''} found
              </p>
              {/* Quick search suggestions could go here */}
              <div className="space-y-2">
                {getSearchSuggestions(searchTerm).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchTerm(suggestion)}
                    className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 font-montserrat text-sm transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Results Summary */}
      {searchTerm && (
        <div className="mt-4 flex items-center justify-between">
          <p className="font-montserrat text-slate-gray">
            Search results for: <span className="font-semibold">"{searchTerm}"</span>
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-coral-red hover:underline font-montserrat text-sm"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  )
}

// Helper function for search suggestions
const getSearchSuggestions = (term) => {
  const suggestions = [
    'Air Jordan',
    'Air Max',
    'Running shoes',
    'Basketball shoes',
    'Lifestyle shoes',
    'Training shoes',
    'Soccer cleats',
    'Skateboarding shoes'
  ]
  
  return suggestions
    .filter(suggestion => 
      suggestion.toLowerCase().includes(term.toLowerCase()) && 
      suggestion.toLowerCase() !== term.toLowerCase()
    )
    .slice(0, 3)
}

export default SearchBar
