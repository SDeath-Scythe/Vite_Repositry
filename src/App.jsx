
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CustomerReviews, Footer, Hero, PopularProducts,
  Services, SpecialOffers, Subscribe, SuperQuality } from "./sections";
import Nav from "./components/Nav";
import CatalogPage from "./pages/CatalogPage";
import AdminPage from "./pages/AdminPage";
import ToastContainer from "./components/ToastContainer";
import { ProductProvider } from "./context/ProductContext";
import { DemoProductProvider } from "./context/DemoProductContext";
import { CartProvider } from "./context/CartContext";

// Home Page Component
const HomePage = () => {
  const location = useLocation()

  useEffect(() => {
    // Handle scrolling when navigated from other pages with state
    if (location.state?.scrollTo) {
      const scrollTarget = location.state.scrollTo
      // Use a slightly longer timeout to ensure all content is loaded
      const scrollTimeout = setTimeout(() => {
        const targetElement = document.querySelector(scrollTarget)
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 300)
      
      // Clear the state to prevent repeated scrolling
      window.history.replaceState({}, '', location.pathname)
      
      return () => clearTimeout(scrollTimeout)
    }
  }, [location])

  return (
    <>
      <section className="xl:padding-l wide:padding-r padding-b pt-24">
        <Hero />
      </section>
      <section className="padding" id="products">
        <PopularProducts />
      </section>
      <section className="padding" id="about-us">
        <SuperQuality />
      </section>
      <section className="padding-x py-10" id="services">
        <Services />
      </section>
      <section className="padding">
        <SpecialOffers />
      </section>
      <section className="bg-pale-blue padding">
        <CustomerReviews />
      </section>
      <section className="padding-x sm:py-32 py-16 w-full" id="contact-us">
        <Subscribe />
      </section>
      <section className="bg-black padding-x padding-t pb-8">
        <Footer />
      </section>
    </>
  )
}

const App = () => (
  <CartProvider>
    <ProductProvider>
      <DemoProductProvider>
        <div className="relative">
          {/* Global Navigation - appears on all pages */}
          <Nav />
          
          {/* Main content area */}
          <main className="relative">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          
          {/* Global Toast Container */}
          <ToastContainer />
        </div>
      </DemoProductProvider>
    </ProductProvider>
  </CartProvider>
);

export default App;