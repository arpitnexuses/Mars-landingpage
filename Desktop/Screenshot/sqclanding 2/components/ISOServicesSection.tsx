'use client';

import Image from 'next/image';

const ISOServicesSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-16 md:py-24 gap-6 md:gap-12 relative">
        {/* Left side - Content */}
        <div className="w-full md:w-1/2 space-y-8">
          {/* Title */}
          <h2 className="text-[22px] md:text-[28.42px] text-[#1E1E1E] font-semibold opacity-0 animate-fadeIn">
            Why Choose Our ISO 22000:2018 Services?
          </h2>

          {/* Subheading */}
          <h3 className="text-[24px] md:text-[30.35px] font-bold text-[#1E1E1E] leading-tight">
            Join hundreds of successful UAE businesses
          </h3>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Stat 1 */}
            <div className="group hover:bg-white hover:shadow-xl transition-all duration-300 p-6 rounded-xl space-y-3">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1B365D] to-blue-500 bg-clip-text text-transparent">82%</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                of ISO 22000:2018 certified establishments report enhanced consumer trust and a stronger brand reputation.
              </p>
              <div className="w-full h-[1px] bg-gradient-to-r from-[#C3BBBB] to-transparent"></div>
            </div>

            {/* Stat 2 */}
            <div className="group hover:bg-white hover:shadow-xl transition-all duration-300 p-6 rounded-xl space-y-3">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1B365D] to-blue-500 bg-clip-text text-transparent">68%</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                experience fewer food safety incidents, resulting in improved operational efficiency and cost savings.
              </p>
              <div className="w-full h-[1px] bg-gradient-to-r from-[#C3BBBB] to-transparent"></div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 md:mt-[100px]">
            <a 
              href="https://cal.com/shuchita-r/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full md:w-auto"
            >
              <button className="w-full relative inline-flex items-center justify-center px-8 py-4 font-bold overflow-hidden group rounded-xl bg-gradient-to-r from-[#1B365D] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1B365D] transition-all duration-300 ease-out">
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-96 ease"></span>
                <div className="flex items-center gap-2">
                  <span className="relative text-white text-lg">Book Your Assessment</span>
                  <svg 
                    className="w-5 h-5 text-white transition-transform duration-300 ease-out group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    ></path>
                  </svg>
                </div>
              </button>
            </a>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-full md:w-[110%] aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/dl.beatsnoop.com-final-AHWoMDCq8G%201.png"
              alt="ISO Services"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ISOServicesSection; 