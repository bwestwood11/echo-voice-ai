import PricingCard from "./pricing-card"


const PricingOptions = () => {
  return (
    <div className="w-full mt-10 relative z-1">
        <div
          className="absolute inset-x-0 md:-top-40 bottom-40 sm:bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative -z-10 left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ffa256] to-[#e08700] opacity-50 sm:left-[calc(90%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto text-center">
             <p className="font-medium tracking-wide">Simple Pricing Plans</p>
        <h1 className="font-extrabold text-5xl tracking-wide mt-3">
            Join Voice <span className="text-[#ff8303]">Fusion</span>  Today
        </h1>  
        </div>
     <PricingCard />
    </div>
  )
}

export default PricingOptions