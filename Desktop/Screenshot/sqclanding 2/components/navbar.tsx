'use client'

import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#solutions", label: "Solutions" },
    { href: "#resources", label: "Resources" },
    { href: "#download", label: "Download" },
    { href: "#pricing", label: "Pricing" },
  ];

  const handleGetStarted = () => {
    window.location.href = "https://share.hsforms.com/2LZikFI__SI-dw2xt_dqcuAt7nm2";
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
    >
      <div className="container flex h-14 md:h-16 items-center justify-between px-0 md:px-2">
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="transition-all duration-300"
          >
            <Link href="/" className="flex items-center">
              <Image
                src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/Group%201.png"
                alt="Company Logo"
                width={140}
                height={40}
                className="object-contain h-8 md:h-10 transition-transform duration-300"
                priority
                quality={100}
                style={{
                  imageRendering: 'crisp-edges'
                }}
              />
            </Link>
          </motion.div>
          <nav className="hidden gap-8 md:flex">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="relative flex items-center text-sm font-bold text-[#111827] transition-all duration-300 hover:text-[#F21F1F] group"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute inset-x-0 bottom-[-4px] h-[2px] bg-[#F21F1F] transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    <span className="absolute inset-x-0 bottom-[-4px] h-[2px] bg-[#F21F1F] transform origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <motion.span
                    className="ml-1 opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 md:gap-4 absolute right-4 md:right-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Button 
              onClick={handleGetStarted}
              variant="outline" 
              className="hidden md:flex border-[#F21F1F] border-2 rounded-lg px-6 
              relative overflow-hidden group bg-transparent
              before:absolute before:inset-0 before:bg-[#F21F1F] before:origin-left
              before:scale-x-0 hover:before:scale-x-100 before:transition-transform
              before:duration-300 hover:text-white shadow-lg hover:shadow-[#F21F1F]/20
              transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Get Started Now</span>
                <motion.span
                  className="opacity-0 transform translate-x-[-10px] transition-all duration-300
                  group-hover:opacity-100 group-hover:translate-x-0"
                >
                  →
                </motion.span>
              </span>
            </Button>
          </motion.div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ 
              scale: 1.1,
              rotate: 180,
              transition: { duration: 0.3 }
            }}
            className="flex items-center justify-center p-1.5 md:hidden relative overflow-hidden
              bg-transparent hover:bg-[#F21F1F]/10 rounded-full transition-all duration-300
              hover:shadow-lg hover:shadow-[#F21F1F]/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 top-[56px] bg-background/98 border-b shadow-lg md:hidden overflow-hidden"
          >
            <nav className="container flex flex-col py-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="px-4 py-3 text-sm font-bold text-[#111827] hover:bg-[#F21F1F]/10
                    block transition-all duration-300 hover:pl-8 group flex items-center justify-between"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <motion.span
                      className="opacity-0 transform translate-x-[-10px] transition-all duration-300
                      group-hover:opacity-100 group-hover:translate-x-0"
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="px-4 py-4 border-t"
              >
                <Button 
                  onClick={handleGetStarted}
                  className="w-full border-[#F21F1F] border-2 rounded-lg px-6 
                  relative overflow-hidden group bg-transparent
                  before:absolute before:inset-0 before:bg-[#F21F1F] 
                  before:translate-y-[101%] hover:before:translate-y-0
                  before:transition-transform before:duration-300 
                  hover:text-white shadow-lg hover:shadow-[#F21F1F]/20
                  transition-all duration-300"
                  variant="outline"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started Now
                    <motion.span
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

