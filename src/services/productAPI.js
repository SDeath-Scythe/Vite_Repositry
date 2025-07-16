const API_BASE_URL = 'http://localhost:3001/api'

class ProductAPI {
  async getAllProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  async addProduct(product) {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
      if (!response.ok) {
        throw new Error('Failed to add product')
      }
      return await response.json()
    } catch (error) {
      console.error('Error adding product:', error)
      throw error
    }
  }

  async updateProduct(id, product) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
      if (!response.ok) {
        throw new Error('Failed to update product')
      }
      return await response.json()
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }

  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete product')
      }
      return await response.json()
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }

  async resetToDefault() {
    try {
      const response = await fetch(`${API_BASE_URL}/products/reset`, {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error('Failed to reset products')
      }
      return await response.json()
    } catch (error) {
      console.error('Error resetting products:', error)
      throw error
    }
  }
}

export const productAPI = new ProductAPI()
