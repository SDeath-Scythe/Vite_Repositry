import { useState } from "react"
import Button from "../components/Button"

const Subscribe = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <section className="max-container flex justify-between items-center 
    max-lg:flex-col gap-10 " id="contact-us">
      <h3 className="text-4xl leading-[68px]  font-palanquin font-bold">Sign up for
      <span className="text-coral-red"> Updates </span>& Newsletter
      </h3>
      <form onSubmit={handleSubmit} className="lg:max-w-[40%] w-full flex items-center max-sm:flex-col 
      gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full">
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Subscribe@nike.com"
          className="input"
          required
          aria-label="Email address"
        />
        <div className="flex max-sm:justify-end items-center max-sm:w-full">
          <Button 
            label={isSubscribed ? "Subscribed!" : "Sign Up"}
            type="submit"
            fullWidth
            backgroundColor={isSubscribed ? "bg-green-500" : undefined}
          />
        </div>
      </form>
    </section>
  )
}

export default Subscribe
