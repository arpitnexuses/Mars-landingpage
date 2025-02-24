'use client';

import React from 'react';
import { motion } from 'framer-motion';
import image1 from './TE.png';

const TalkToExpert = () => {
  return (
    <div className="relative w-full">
      <img 
        src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/TE.png"
        alt="Background"
        className="w-full h-[300px] md:h-auto object-cover"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            type: "spring",
            bounce: 0.4
          }}
        >
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-[77px] font-bold mb-1"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.2
            }}
          >
            Talk to our Expert
          </motion.h1>
        </motion.div>

        <motion.p 
          className="text-base md:text-xl mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: "easeOut"
          }}
        >
          Get ready to elevate your standards
        </motion.p>

        <a href="https://share.hsforms.com/2LZikFI__SI-dw2xt_dqcuAt7nm2" target="_blank" rel="noopener noreferrer">
          <motion.button 
            className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-600 
              text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-base md:text-lg 
              font-medium transition-all duration-500 bg-[length:200%_100%]
              shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]
              border border-red-400/30"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 1,
              type: "spring",
              bounce: 0.4
            }}
            whileHover={{ 
              scale: 1.02,
              backgroundPosition: "100% 0",
            }}
            whileTap={{ 
              scale: 0.98,
              backgroundPosition: "0 0",
            }}
            animate={{
              boxShadow: [
                "0 0 15px rgba(220,38,38,0.3)",
                "0 0 20px rgba(220,38,38,0.4)",
                "0 0 15px rgba(220,38,38,0.3)"
              ],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            Fill the Form
          </motion.button>
        </a>
      </div>
    </div>
  );
};

export default TalkToExpert; 