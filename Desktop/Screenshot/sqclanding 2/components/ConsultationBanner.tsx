import Image from 'next/image'

const ConsultationBanner = () => {
  return (
    <div className="relative w-full my-12 mx-auto max-w-7xl px-4">
      <div className="relative flex flex-col md:flex-row items-center overflow-hidden rounded-2xl shadow-2xl bg-white">
        {/* Left side - Image */}
        <div className="relative w-full md:w-1/2 h-[250px] md:h-[400px]">
          <Image
            src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/dl.beatsnoop.com-final-rbYBAgZIJH%201.png"
            alt="Food Safety Expert"
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
          {/* Gradient overlay - visible only on desktop */}
          <div className="hidden md:block absolute top-0 right-0 h-full w-24 bg-gradient-to-r from-transparent to-white" />
        </div>

        {/* Right side - Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6 bg-white rounded-b-2xl md:rounded-r-2xl">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
            Are You Looking for ISO Consultants, Food Safety & Training Experts?
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Partner with our dedicated team to elevate your quality management, enhance food safety standards, and achieve global compliance.
          </p>
          <div>
            <a 
              href="https://cal.com/shuchita-r/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full md:w-auto group"
            >
              <button className="w-full md:w-auto relative overflow-hidden bg-gradient-to-r from-[#00425F] to-[#005c85] text-white px-8 py-4 rounded-xl 
                shadow-[0_4px_20px_-4px_rgba(0,66,95,0.4)] hover:shadow-[0_8px_25px_-5px_rgba(0,66,95,0.5)] 
                transition-all duration-300 ease-out transform hover:-translate-y-1 group-hover:scale-[1.02]
                before:absolute before:top-0 before:left-0 before:w-full before:h-full 
                before:bg-gradient-to-r before:from-white/20 before:to-transparent before:translate-x-[-100%]
                before:transition-transform before:duration-500 hover:before:translate-x-[100%]
                font-semibold text-lg flex items-center justify-center gap-2"
              >
                Book Free Consultation
                <svg 
                  className="w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultationBanner 