import PopularProductsCard from '../components/PopularProductsCard';
import Button from '../components/Button';
import { useProduct } from '../context/ProductContext';

const PopularProducts = () => {
  const { products } = useProduct();
  
  return (
    <section id="products"
    className='max-container max-sm:mt-12'>
      <div className='flex flex-col justify-start gap-5'>
        <h2 className="text-4xl font-palanquin font-bold">our 
          <span className="text-coral-red"> popular</span> products</h2>
        <p className='lg:max-w-lg mt-2 font-montserrat text-slate-gray'>
          Experience top-notch quality and style with our 
          sought-after selections. Discover a world of comfort, 
          design, and value</p>
      </div>
      
      <div className='mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14'>
        {products.slice(0, 4).map((product)=>(
          <PopularProductsCard key={product.id} {...product}/>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button 
          label="View All Products" 
          href="#catalog"
          backgroundColor="bg-white"
          textColor="text-coral-red"
          borderColor="border-coral-red"
        />
      </div>
    </section>
  )
}

export default PopularProducts
