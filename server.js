import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { body, validationResult, param } from 'express-validator'
import bcrypt from 'bcrypt'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth attempts per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(limiter)

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177'],
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))

// Add debugging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

// Admin password (in production, use environment variables and hash)
const ADMIN_PASSWORD = 'nike123'

// Input validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    })
  }
  next()
}

// Sanitize string input to prevent XSS and injection
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str
  return str
    .replace(/[<>]/g, '') // Remove < > to prevent XSS
    .replace(/['";]/g, '') // Remove quotes and semicolons
    .trim()
    .slice(0, 1000) // Limit length
}

// Sanitize and format price input
const sanitizeAndFormatPrice = (price) => {
  if (typeof price !== 'string') return '$0.00'
  
  // Remove any existing $ and spaces
  let cleanPrice = price.replace(/[$\s]/g, '')
  
  // Convert to number and validate
  const numPrice = parseFloat(cleanPrice)
  if (isNaN(numPrice) || numPrice < 0) return '$0.00'
  if (numPrice > 99999) return '$99999.00'
  
  // Format to currency
  return `$${numPrice.toFixed(2)}`
}

// Sanitize product data
const sanitizeProductData = (data) => {
  return {
    name: sanitizeString(data.name),
    brand: sanitizeString(data.brand),
    price: sanitizeAndFormatPrice(data.price),
    originalPrice: data.originalPrice ? sanitizeAndFormatPrice(data.originalPrice) : '',
    category: sanitizeString(data.category),
    imgURL: sanitizeString(data.imgURL),
    description: sanitizeString(data.description),
    isNew: Boolean(data.isNew),
    onSale: Boolean(data.onSale),
    salePrice: data.salePrice ? sanitizeAndFormatPrice(data.salePrice) : '',
    colors: Array.isArray(data.colors) ? data.colors.map(c => sanitizeString(c)).slice(0, 20) : [],
    sizes: Array.isArray(data.sizes) ? data.sizes.slice(0, 20) : [],
    rating: typeof data.rating === 'number' && data.rating >= 0 && data.rating <= 5 ? data.rating : 0,
    reviews: typeof data.reviews === 'number' && data.reviews >= 0 ? Math.floor(data.reviews) : 0
  }
}

const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json')
const DEFAULT_PRODUCTS_FILE = path.join(__dirname, 'data', 'default-products.json')

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true })
  } catch (error) {
    // Directory already exists
  }
}

// Initialize default products file if it doesn't exist
const initializeDefaultProducts = async () => {
  try {
    await fs.access(DEFAULT_PRODUCTS_FILE)
  } catch {
    // Default products file doesn't exist, create it
    const defaultProducts = [
      {
        id: 1,
        name: "Nike Air Jordan-01",
        price: "$200.20",
        originalPrice: "$250.20",
        imgURL: "/Vite_Repositry/shoe4.svg",
        category: "Basketball",
        brand: "Nike",
        rating: 4.8,
        reviews: 342,
        colors: ["Red", "Black", "White"],
        sizes: [7, 8, 9, 10, 11, 12],
        isNew: true,
        onSale: true,
        description: "Classic basketball shoe with premium comfort and style."
      },
      {
        id: 2,
        name: "Nike Air Jordan-10",
        price: "$210.20",
        originalPrice: "$260.20",
        imgURL: "/Vite_Repositry/shoe5.svg",
        category: "Basketball",
        brand: "Nike",
        rating: 4.7,
        reviews: 287,
        colors: ["Blue", "White", "Black"],
        sizes: [7, 8, 9, 10, 11, 12],
        isNew: false,
        onSale: true,
        description: "Advanced basketball technology for professional players."
      },
      {
        id: 3,
        name: "Nike Air Jordan-100",
        price: "$220.20",
        originalPrice: "$270.20",
        imgURL: "/Vite_Repositry/shoe6.svg",
        category: "Basketball",
        brand: "Nike",
        rating: 4.9,
        reviews: 456,
        colors: ["Green", "Black", "White"],
        sizes: [7, 8, 9, 10, 11, 12],
        isNew: true,
        onSale: false,
        description: "Limited edition Jordan with premium materials."
      },
      {
        id: 4,
        name: "Nike Air Max-01",
        price: "$180.20",
        originalPrice: "$220.20",
        imgURL: "/Vite_Repositry/shoe7.svg",
        category: "Running",
        brand: "Nike",
        rating: 4.6,
        reviews: 198,
        colors: ["Red", "White", "Blue"],
        sizes: [6, 7, 8, 9, 10, 11],
        isNew: false,
        onSale: true,
        description: "Comfortable running shoes with Air Max technology."
      },
      {
        id: 5,
        name: "Nike Air Force-01",
        price: "$160.20",
        originalPrice: "$200.20",
        imgURL: "/Vite_Repositry/shoe8.svg",
        category: "Lifestyle",
        brand: "Nike",
        rating: 4.5,
        reviews: 324,
        colors: ["White", "Black", "Grey"],
        sizes: [7, 8, 9, 10, 11, 12],
        isNew: false,
        onSale: true,
        description: "Classic lifestyle shoe perfect for everyday wear."
      }
    ]
    
    await fs.writeFile(DEFAULT_PRODUCTS_FILE, JSON.stringify(defaultProducts, null, 2))
    console.log('Default products file created')
  }
}

// Initialize products file if it doesn't exist
const initializeProductsFile = async () => {
  try {
    await fs.access(PRODUCTS_FILE)
  } catch {
    // Products file doesn't exist, copy from default
    const defaultProducts = await fs.readFile(DEFAULT_PRODUCTS_FILE, 'utf8')
    await fs.writeFile(PRODUCTS_FILE, defaultProducts)
    console.log('Products file initialized from defaults')
  }
}

// Authentication endpoint with validation and rate limiting
app.post('/api/auth/login', 
  authLimiter,
  [
    body('password')
      .isLength({ min: 1, max: 100 })
      .withMessage('Password must be between 1 and 100 characters')
      .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)
      .withMessage('Password contains invalid characters')
  ],
  validateRequest,
  (req, res) => {
    console.log('Login attempt from IP:', req.ip)
    const { password } = req.body
    
    // Sanitize password input
    const sanitizedPassword = sanitizeString(password)
    
    if (!sanitizedPassword) {
      return res.status(400).json({ error: 'Password is required' })
    }
    
    if (sanitizedPassword === ADMIN_PASSWORD) {
      console.log('Successful admin login from IP:', req.ip)
      res.json({ 
        success: true, 
        isRealAdmin: true,
        message: 'Welcome to Admin Panel!' 
      })
    } else {
      console.log('Demo mode activated for IP:', req.ip)
      // Any other password enables demo mode
      res.json({ 
        success: true, 
        isRealAdmin: false,
        message: 'Demo Mode Activated! Changes will only be saved locally.' 
      })
    }
  }
)

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() })
})

// GET /api/products - Get all products
app.get('/api/products', async (req, res) => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8')
    const products = JSON.parse(data)
    res.json(products)
  } catch (error) {
    console.error('Error reading products:', error)
    res.status(500).json({ error: 'Failed to read products' })
  }
})

// POST /api/products - Add a new product with validation
app.post('/api/products',
  [
    body('name')
      .isLength({ min: 1, max: 200 })
      .withMessage('Product name must be between 1 and 200 characters')
      .matches(/^[a-zA-Z0-9\s\-_.()]+$/)
      .withMessage('Product name contains invalid characters'),
    body('brand')
      .isLength({ min: 1, max: 50 })
      .withMessage('Brand must be between 1 and 50 characters')
      .isIn(['Nike', 'Jordan', 'Converse'])
      .withMessage('Invalid brand'),
    body('price')
      .custom((value) => {
        // Remove $ and spaces, then check if it's a valid number
        const cleanPrice = value.replace(/[$\s]/g, '')
        const numPrice = parseFloat(cleanPrice)
        if (isNaN(numPrice) || numPrice < 0 || numPrice > 99999) {
          throw new Error('Price must be a valid number between 0 and 99999')
        }
        return true
      }),
    body('category')
      .isIn(['Running', 'Basketball', 'Lifestyle', 'Training', 'Football'])
      .withMessage('Invalid category'),
    body('imgURL')
      .isURL()
      .withMessage('Invalid image URL')
      .isLength({ max: 500 })
      .withMessage('Image URL too long'),
    body('description')
      .optional()
      .isLength({ max: 1000 })
      .withMessage('Description too long')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const data = await fs.readFile(PRODUCTS_FILE, 'utf8')
      const products = JSON.parse(data)
      
      // Sanitize input data
      const sanitizedData = sanitizeProductData(req.body)
      
      const newId = Math.max(...products.map(p => p.id), 0) + 1
      const newProduct = { ...sanitizedData, id: newId }
      
      products.push(newProduct)
      
      await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
      console.log(`Product added: ${newProduct.name} (ID: ${newId})`)
      res.json(newProduct)
    } catch (error) {
      console.error('Error adding product:', error)
      res.status(500).json({ error: 'Failed to add product' })
    }
  }
)

// PUT /api/products/:id - Update a product with validation
app.put('/api/products/:id',
  [
    param('id')
      .isInt({ min: 1 })
      .withMessage('Product ID must be a positive integer'),
    body('name')
      .isLength({ min: 1, max: 200 })
      .withMessage('Product name must be between 1 and 200 characters')
      .matches(/^[a-zA-Z0-9\s\-_.()]+$/)
      .withMessage('Product name contains invalid characters'),
    body('brand')
      .isLength({ min: 1, max: 50 })
      .withMessage('Brand must be between 1 and 50 characters')
      .isIn(['Nike', 'Jordan', 'Converse'])
      .withMessage('Invalid brand'),
    body('price')
      .custom((value) => {
        // Remove $ and spaces, then check if it's a valid number
        const cleanPrice = value.replace(/[$\s]/g, '')
        const numPrice = parseFloat(cleanPrice)
        if (isNaN(numPrice) || numPrice < 0 || numPrice > 99999) {
          throw new Error('Price must be a valid number between 0 and 99999')
        }
        return true
      }),
    body('category')
      .isIn(['Running', 'Basketball', 'Lifestyle', 'Training', 'Football'])
      .withMessage('Invalid category'),
    body('imgURL')
      .isURL()
      .withMessage('Invalid image URL')
      .isLength({ max: 500 })
      .withMessage('Image URL too long')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const productId = parseInt(req.params.id)
      const data = await fs.readFile(PRODUCTS_FILE, 'utf8')
      const products = JSON.parse(data)
      
      const index = products.findIndex(p => p.id === productId)
      if (index === -1) {
        return res.status(404).json({ error: 'Product not found' })
      }
      
      // Sanitize input data
      const sanitizedData = sanitizeProductData(req.body)
      products[index] = { ...sanitizedData, id: productId }
      
      await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
      console.log(`Product updated: ${products[index].name} (ID: ${productId})`)
      res.json(products[index])
    } catch (error) {
      console.error('Error updating product:', error)
      res.status(500).json({ error: 'Failed to update product' })
    }
  }
)

// DELETE /api/products/:id - Delete a product with validation
app.delete('/api/products/:id',
  [
    param('id')
      .isInt({ min: 1 })
      .withMessage('Product ID must be a positive integer')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const productId = parseInt(req.params.id)
      const data = await fs.readFile(PRODUCTS_FILE, 'utf8')
      const products = JSON.parse(data)
      
      const filteredProducts = products.filter(p => p.id !== productId)
      
      if (filteredProducts.length === products.length) {
        return res.status(404).json({ error: 'Product not found' })
      }
      
      await fs.writeFile(PRODUCTS_FILE, JSON.stringify(filteredProducts, null, 2))
      console.log(`Product deleted: ID ${productId}`)
      res.json({ message: 'Product deleted successfully' })
    } catch (error) {
      console.error('Error deleting product:', error)
      res.status(500).json({ error: 'Failed to delete product' })
    }
  }
)

// POST /api/products/reset - Reset products to default
app.post('/api/products/reset', async (req, res) => {
  try {
    const defaultData = await fs.readFile(DEFAULT_PRODUCTS_FILE, 'utf8')
    await fs.writeFile(PRODUCTS_FILE, defaultData)
    
    const products = JSON.parse(defaultData)
    console.log('Products reset to default')
    res.json({ message: 'Products reset to default successfully', products })
  } catch (error) {
    console.error('Error resetting products:', error)
    res.status(500).json({ error: 'Failed to reset products' })
  }
})

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)
  res.status(500).json({ error: 'Internal server error' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// Start server
const startServer = async () => {
  await ensureDataDir()
  await initializeDefaultProducts()
  await initializeProductsFile()
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📁 Products stored in: ${PRODUCTS_FILE}`)
    console.log(`🔄 Default products backup: ${DEFAULT_PRODUCTS_FILE}`)
  })
}

startServer().catch(console.error)
