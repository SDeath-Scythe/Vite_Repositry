import { createContext, useContext, useState, useEffect } from 'react'

const DemoProductContext = createContext()

export const useDemoProduct = () => {
  const context = useContext(DemoProductContext)
  if (!context) {
    throw new Error('useDemoProduct must be used within a DemoProductProvider')
  }
  return context
}

export const DemoProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  // Default demo products
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

  // Load products from localStorage or use defaults
  useEffect(() => {
    const savedProducts = localStorage.getItem('demoProducts')
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      setProducts(defaultProducts)
      localStorage.setItem('demoProducts', JSON.stringify(defaultProducts))
    }
  }, [])

  // Save to localStorage whenever products change
  const saveToLocalStorage = (updatedProducts) => {
    localStorage.setItem('demoProducts', JSON.stringify(updatedProducts))
    setProducts(updatedProducts)
  }

  // Add product (demo mode)
  const addProduct = async (productData) => {
    setLoading(true)
    try {
      const newProduct = {
        ...productData,
        id: Date.now(), // Simple ID generation for demo
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // Random rating 3.0-5.0
        reviews: Math.floor(Math.random() * 500) + 50, // Random reviews 50-550
      }
      
      const updatedProducts = [...products, newProduct]
      saveToLocalStorage(updatedProducts)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return newProduct
    } catch (error) {
      throw new Error('Failed to add product in demo mode')
    } finally {
      setLoading(false)
    }
  }

  // Update product (demo mode)
  const updateProduct = async (id, productData) => {
    setLoading(true)
    try {
      const updatedProducts = products.map(product =>
        product.id === id ? { ...product, ...productData } : product
      )
      saveToLocalStorage(updatedProducts)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return updatedProducts.find(p => p.id === id)
    } catch (error) {
      throw new Error('Failed to update product in demo mode')
    } finally {
      setLoading(false)
    }
  }

  // Delete product (demo mode)
  const deleteProduct = async (id) => {
    setLoading(true)
    try {
      const updatedProducts = products.filter(product => product.id !== id)
      saveToLocalStorage(updatedProducts)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
    } catch (error) {
      throw new Error('Failed to delete product in demo mode')
    } finally {
      setLoading(false)
    }
  }

  // Reset to default (demo mode)
  const resetToDefault = async () => {
    setLoading(true)
    try {
      saveToLocalStorage(defaultProducts)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      throw new Error('Failed to reset products in demo mode')
    } finally {
      setLoading(false)
    }
  }

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefault,
  }

  return (
    <DemoProductContext.Provider value={value}>
      {children}
    </DemoProductContext.Provider>
  )
}
