const HeroSection = () => {
  return (
    <div className="relative w-full">
      <img
        src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/Frame%2051%20(1).png"
        alt="Hero section"
        className="w-full h-[400px] md:h-auto object-cover"
      />
      
      {/* Text Overlay */}
      <div className="absolute top-[10%] md:top-[30%] left-4 md:left-24 w-[92%] md:w-[40%] p-4 md:p-0">
        <h1 className="text-white text-2xl sm:text-3xl md:text-6xl font-bold leading-tight mb-3 md:mb-6">
          Certify your<br />
          Food And Safety Standards
        </h1>
        <p className="text-white/90 text-sm sm:text-base md:text-xl mb-4 md:mb-8 w-full md:w-[75%]">
          Transform your business with our industry-leading training courses and quality certifications, designed exclusively for the hospitality sector.
        </p>
        <a 
          href="https://cal.com/shuchita-r/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <button className="group relative w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-3.5 md:px-10 md:py-4 text-sm md:text-base rounded-lg font-semibold shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-200 hover:from-red-500 hover:to-red-600">
            <span className="flex items-center justify-center gap-2">
              Speak to Our Expert
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </a>
      </div>
    </div>
  )
}

export default HeroSection 