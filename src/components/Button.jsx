import { useNavigate } from 'react-router-dom'

const Button = ({
  label,
  iconURL,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
  onClick,
  href,
  navigateTo,
  type = "button"
}) => {
  const navigate = useNavigate()
  
  const handleClick = (e) => {
    if (navigateTo) {
      e.preventDefault()
      navigate(navigateTo)
      return
    }
    
    if (href) {
      e.preventDefault()
      const targetElement = document.querySelector(href)
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
    if (onClick) {
      onClick(e)
    }
  }

  const buttonContent = (
    <>
      {label}
      {iconURL && (
        <img
          src={iconURL}
          alt='arrow right icon'
          className='ml-2 rounded-full bg-white w-5 h-5'
        />
      )}
    </>
  )

  const baseClasses = `flex justify-center items-center 
    gap-2 px-7 py-4 border font-montserrat text-lg leading-none
    ${
      backgroundColor
        ? `${backgroundColor} ${textColor} ${borderColor}`
        : "bg-coral-red text-white border-coral-red"
    } rounded-full ${fullWidth && "w-full"} 
    hover:scale-105 transform transition-all duration-300 
    active:scale-95 cursor-pointer`

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={baseClasses}
      >
        {buttonContent}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={baseClasses}
    >
      {buttonContent}
    </button>
  );
};

export default Button;