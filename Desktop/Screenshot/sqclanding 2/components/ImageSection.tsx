"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const ImageSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  }

  const imageAnimation = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -2,
      y: 60 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        duration: 1.2
      }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  return (
    <motion.section 
      className="w-full py-8 md:py-12 lg:py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <motion.div 
            className="w-full md:translate-x-[2%]"
            variants={imageAnimation}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <Image
              src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/Frame%207.png"
              alt="Featured illustration"
              width={1200}
              height={600}
              className="mix-blend-multiply w-full hover:scale-[1.03] transition-all duration-700 hover:rotate-1"
              priority
              style={{ objectFit: 'contain' }}
            />
          </motion.div>
          
          <motion.div 
            className="max-w-5xl text-center mt-12 md:mt-24 mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-[2.5rem] font-normal mb-6 md:mb-12 text-gray-800 px-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
              variants={fadeInUp}
            >
              Our services for the food and beverage sector
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed px-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
              variants={fadeInUp}
            >
              At SQC, we empower food and beverage businesses with expert food safety consultancy,
              tailored training, and quality management solutions that meet global standards. In hospitality,
              quality management is key—it ensures safety, consistency, and exceptional guest experiences
              that build trust and loyalty.
            </motion.p>
            <motion.a 
              href="https://share.hsforms.com/2LZikFI__SI-dw2xt_dqcuAt7nm2"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 md:mt-24 relative group overflow-hidden bg-[#003554] text-white px-8 md:px-10 py-3 md:py-4 rounded-lg font-medium inline-block
                before:absolute before:inset-0 before:bg-[#002a43] before:translate-y-full hover:before:translate-y-0 before:transition before:duration-300
                hover:shadow-[0_15px_30px_rgba(0,53,84,0.25)] transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.02,
                y: -3
              }}
              whileTap={{ 
                scale: 0.98,
                y: 0
              }}
            >
              <motion.span 
                className="relative z-10 inline-flex items-center"
                whileHover={{ 
                  x: [0, 5, 0],
                  transition: { repeat: Infinity, duration: 1.5 }
                }}
              >
                Book your assessment
                <svg 
                  className="ml-2 w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default ImageSection 