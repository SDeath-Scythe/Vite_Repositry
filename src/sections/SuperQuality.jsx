import { shoe8 } from "../assets/images";
import Button from "../components/Button";

const SuperQuality = () => {
  return (
    <section id="about-us"
    className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container">
      <div className="flex flex-1 flex-col">
      

        <h2 className='font-palanquin  text-4xl capitalize font-bold lg:max-w-lg '>
          We provide you 
          <span className='text-coral-red inline-block mt-3 ml-3 '>Super</span> 
          <span className='text-coral-red inline-block mt-3'> Quality</span> shoes
        </h2>
        <p className='mt-4 lg:max-w-lg info-text'>
          Ensuring preimum comfort and style, our meticulously crafted footware is designed to elavte your experince, providing you with unmatched quality, inovation, and a touch of elegance.  
        </p>
        <p className="mt-6 lg:max-w-lg info-text">
          Our dedication to ditails and exelance ensures your satisfaction.
        </p>
        <div className="mt-11">
          <Button label='View ditails' />
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <img src={shoe8} alt="shoe8" width={570} height={522} className="object-contain" />
      </div>
    </section>
  )
}

export default SuperQuality
