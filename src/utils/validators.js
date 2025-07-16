// Input validation and sanitization utilities for the frontend

export const validators = {
  // Sanitize string input to prevent XSS
  sanitizeString: (str) => {
    if (typeof str !== 'string') return ''
    return str
      .replace(/[<>]/g, '') // Remove < > to prevent XSS
      .replace(/['"`;]/g, '') // Remove quotes and semicolons
      .trim()
      .slice(0, 1000) // Limit length
  },

  // Validate product name
  validateProductName: (name) => {
    const sanitized = validators.sanitizeString(name)
    if (!sanitized || sanitized.length < 1 || sanitized.length > 200) {
      return { isValid: false, error: 'Product name must be between 1 and 200 characters' }
    }
    if (!/^[a-zA-Z0-9\s\-_.()]+$/.test(sanitized)) {
      return { isValid: false, error: 'Product name contains invalid characters' }
    }
    return { isValid: true, value: sanitized }
  },

  // Validate brand
  validateBrand: (brand) => {
    const validBrands = ['Nike', 'Jordan', 'Converse']
    const sanitized = validators.sanitizeString(brand)
    if (!validBrands.includes(sanitized)) {
      return { isValid: false, error: 'Invalid brand selected' }
    }
    return { isValid: true, value: sanitized }
  },

  // Validate and format price
  validatePrice: (price) => {
    const sanitized = validators.sanitizeString(price)
    
    // Remove any existing $ and spaces for validation
    const cleanPrice = sanitized.replace(/[$\s]/g, '')
    const numPrice = parseFloat(cleanPrice)
    
    // Check if it's a valid number
    if (isNaN(numPrice) || numPrice < 0) {
      return { isValid: false, error: 'Price must be a valid positive number' }
    }
    
    if (numPrice > 99999) {
      return { isValid: false, error: 'Price cannot exceed $99,999.00' }
    }
    
    // Format to currency
    const formattedPrice = `$${numPrice.toFixed(2)}`
    return { isValid: true, value: formattedPrice }
  },

  // Format price as user types (for real-time formatting)
  formatPrice: (input) => {
    if (typeof input !== 'string') return '$0.00'
    
    // Remove any existing $ and spaces
    let cleanPrice = input.replace(/[$\s]/g, '')
    
    // If empty, return empty string to allow user to clear field
    if (cleanPrice === '') return ''
    
    // Convert to number
    const numPrice = parseFloat(cleanPrice)
    if (isNaN(numPrice)) return input // Return original if not a number
    
    // Format to currency
    return `$${numPrice.toFixed(2)}`
  },

  // Validate category
  validateCategory: (category) => {
    const validCategories = ['Running', 'Basketball', 'Lifestyle', 'Training', 'Football']
    const sanitized = validators.sanitizeString(category)
    if (!validCategories.includes(sanitized)) {
      return { isValid: false, error: 'Invalid category selected' }
    }
    return { isValid: true, value: sanitized }
  },

  // Validate URL
  validateURL: (url) => {
    const sanitized = validators.sanitizeString(url)
    try {
      new URL(sanitized)
      if (sanitized.length > 500) {
        return { isValid: false, error: 'URL too long' }
      }
      return { isValid: true, value: sanitized }
    } catch {
      return { isValid: false, error: 'Invalid URL format' }
    }
  },

  // Validate description
  validateDescription: (description) => {
    const sanitized = validators.sanitizeString(description)
    if (sanitized.length > 1000) {
      return { isValid: false, error: 'Description too long (max 1000 characters)' }
    }
    return { isValid: true, value: sanitized }
  },

  // Validate password
  validatePassword: (password) => {
    if (typeof password !== 'string') {
      return { isValid: false, error: 'Password must be a string' }
    }
    if (password.length < 1 || password.length > 100) {
      return { isValid: false, error: 'Password must be between 1 and 100 characters' }
    }
    if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password)) {
      return { isValid: false, error: 'Password contains invalid characters' }
    }
    return { isValid: true, value: password }
  },

  // Validate entire product object
  validateProduct: (product) => {
    const errors = []
    const validatedProduct = {}

    // Validate required fields
    const nameValidation = validators.validateProductName(product.name)
    if (!nameValidation.isValid) {
      errors.push(nameValidation.error)
    } else {
      validatedProduct.name = nameValidation.value
    }

    const brandValidation = validators.validateBrand(product.brand)
    if (!brandValidation.isValid) {
      errors.push(brandValidation.error)
    } else {
      validatedProduct.brand = brandValidation.value
    }

    const priceValidation = validators.validatePrice(product.price)
    if (!priceValidation.isValid) {
      errors.push(priceValidation.error)
    } else {
      validatedProduct.price = priceValidation.value
    }

    const categoryValidation = validators.validateCategory(product.category)
    if (!categoryValidation.isValid) {
      errors.push(categoryValidation.error)
    } else {
      validatedProduct.category = categoryValidation.value
    }

    const urlValidation = validators.validateURL(product.imgURL)
    if (!urlValidation.isValid) {
      errors.push(urlValidation.error)
    } else {
      validatedProduct.imgURL = urlValidation.value
    }

    // Validate optional fields
    if (product.description) {
      const descValidation = validators.validateDescription(product.description)
      if (!descValidation.isValid) {
        errors.push(descValidation.error)
      } else {
        validatedProduct.description = descValidation.value
      }
    }

    // Validate boolean fields
    validatedProduct.isNew = Boolean(product.isNew)
    validatedProduct.onSale = Boolean(product.onSale)

    // Validate arrays
    if (Array.isArray(product.colors)) {
      validatedProduct.colors = product.colors
        .map(c => validators.sanitizeString(c))
        .filter(c => c.length > 0)
        .slice(0, 20) // Limit array size
    }

    if (Array.isArray(product.sizes)) {
      validatedProduct.sizes = product.sizes.slice(0, 20) // Limit array size
    }

    // Validate sale price if on sale
    if (validatedProduct.onSale && product.salePrice) {
      const salePriceValidation = validators.validatePrice(product.salePrice)
      if (!salePriceValidation.isValid) {
        errors.push('Sale price: ' + salePriceValidation.error)
      } else {
        validatedProduct.salePrice = salePriceValidation.value
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      validatedProduct
    }
  }
}

export default validators
