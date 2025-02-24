import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="relative bg-white pt-6 sm:pt-8 md:pt-12 pb-20 sm:pb-24 md:pb-32 min-h-[300px] md:min-h-[400px]">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-x-4 gap-y-8 md:gap-8">
          {/* Logo Column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center md:justify-start mb-2 md:mb-0 pl-0 sm:pl-8 md:pl-16 transform hover:scale-105 transition-transform duration-300">
            <Image 
              src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/Group%201.png"
              alt="SQC Logo"
              width={200}
              height={100}
              className="w-[180px] h-[90px] md:w-[240px] md:h-[120px]"
              quality={100}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          {/* Learn More Column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-black mb-2 sm:mb-3 md:mb-6 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-12 after:h-0.5 after:bg-blue-500">
              Learn More
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 text-sm md:text-base">
              <li>
                <Link href="/about-lift" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group">
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">About Lift</span>
                </Link>
              </li>
              <li><Link href="/press-releases" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group">
                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">Press Releases</span>
              </Link></li>
              <li><Link href="/environment" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group">
                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">Environment</span>
              </Link></li>
              <li><Link href="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group">
                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">Jobs</span>
              </Link></li>
              <li><Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group">
                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">Privacy Policy</span>
              </Link></li>
              <li><Link href="/contact-us" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group">
                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">Contact Us</span>
              </Link></li>
            </ul>
          </div>

          {/* Tickets & Booking Column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-black mb-2 sm:mb-3 md:mb-6 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-12 after:h-0.5 after:bg-blue-500">
              Tickets & Booking
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 text-sm md:text-base">
              <li>
                <Link href="/lift-tickets" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group">
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">Lift Tickets</span>
                </Link>
              </li>
              <li><Link href="/season-passes" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group">
                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">Season Passes</span>
              </Link></li>
              <li><Link href="/vacation-packages" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group">
                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">Vacation Packages</span>
              </Link></li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-black mb-2 sm:mb-3 md:mb-6 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-12 after:h-0.5 after:bg-blue-500">
              Contact Us
            </h3>
            <div className="space-y-2 sm:space-y-3 md:space-y-4 text-sm md:text-base">
              <div className="transform hover:-translate-y-1 transition-transform duration-300">
                <p>
                  <span className="text-gray-900 font-medium">Email:</span><br />
                  <span className="text-gray-600 break-all hover:text-blue-600 transition-colors duration-300">info@sanbookconsult.com</span>
                </p>
              </div>
              <div className="transform hover:-translate-y-1 transition-transform duration-300">
                <p>
                  <span className="text-gray-900 font-medium">Address:</span><br />
                  <span className="text-gray-600 text-sm sm:text-base">Office # 1408, DAMAC Smart Heights Tower, Plot #9 Community, Al Thanyah First, Tecom, Dubai, UAE</span>
                </p>
              </div>
            </div>
          </div>

          {/* Social Column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-black mb-2 sm:mb-3 md:mb-6 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-12 after:h-0.5 after:bg-blue-500">
              Social
            </h3>
            <div className="flex space-x-4 md:space-x-6">
              <Link href="#" className="text-gray-600 hover:text-blue-600 transform hover:scale-125 transition-all duration-300">
                <i className="fab fa-facebook-f text-xl md:text-2xl"></i>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-pink-600 transform hover:scale-125 transition-all duration-300">
                <i className="fab fa-instagram text-xl md:text-2xl"></i>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-400 transform hover:scale-125 transition-all duration-300">
                <i className="fab fa-twitter text-xl md:text-2xl"></i>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-red-600 transform hover:scale-125 transition-all duration-300">
                <i className="fab fa-youtube text-xl md:text-2xl"></i>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-800 transform hover:scale-125 transition-all duration-300">
                <i className="fab fa-linkedin-in text-xl md:text-2xl"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4 sm:my-6 md:my-8"></div>
      </div>

      {/* Bottom Wave Image */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <Image 
          src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/MT.png"
          alt="Bottom Wave"
          width={1440}
          height={200}
          className="w-full object-cover h-[60px] sm:h-[70px] md:h-auto"
          priority
        />
      </div>
    </footer>
  )
}

export default Footer 