'use client'

import { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
    <div className="bg-red-600 text-white text-center p-2 text-xl font-bold">DEPLOY TEST - IF YOU SEE RED, BUILD WORKS</div>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg gradient-bg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.941 21 3 14.059 3 10V3a2 2 0 012-2z"></path>
              </svg>
            </div>
            <span className="text-xl font-bold">VoiceFlow AI</span>
          </div>
          <div className="hidden lg:flex items-center gap-1">
            <a href="#how-it-works" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#1877F2]">How it Works</a>
            <a href="#features" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#1877F2]">Features</a>
            <a href="#demo" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#1877F2]">Demo</a>
            <a href="#pricing" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#1877F2]">Pricing</a>
            <a href="#testimonials" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#1877F2]">Reviews</a>
            <a href="/dashboard" className="ml-2 px-5 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl">Start Free Trial</a>
          </div>
          <button 
            className="lg:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:hidden bg-white border-t p-4 space-y-2`}>
        <a href="#how-it-works" className="block px-4 py-2">How it Works</a>
        <a href="#features" className="block px-4 py-2">Features</a>
        <a href="#demo" className="block px-4 py-2">Demo</a>
        <a href="#pricing" className="block px-4 py-2">Pricing</a>
        <a href="/dashboard" className="block w-full mt-2 px-4 py-3 text-center gradient-bg text-white rounded-xl">Start Free Trial</a>
      </div>
    </nav>
    </>
  )
}
