import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read the constants file and extract just the products
const constantsPath = path.join(__dirname, 'src', 'constants', 'index.js')
const dataDir = path.join(__dirname, 'data')
const defaultProductsPath = path.join(dataDir, 'default-products.json')

async function setupDefaultProducts() {
  try {
    // Create data directory
    await fs.mkdir(dataDir, { recursive: true })
    
    // Import products from constants
    const { products } = await import('./src/constants/index.js')
    
    // Write default products file
    await fs.writeFile(defaultProductsPath, JSON.stringify(products, null, 2))
    
    console.log('✅ Default products file created successfully!')
    console.log(`📁 Location: ${defaultProductsPath}`)
    console.log(`📦 Products count: ${products.length}`)
    
  } catch (error) {
    console.error('❌ Error setting up default products:', error)
  }
}

setupDefaultProducts()
