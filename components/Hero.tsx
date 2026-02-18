'use client'

import { useState, useEffect } from 'react'

const demos = {
  realestate: { 
    agent: "Paul", 
    company: "Premier Properties", 
    messages: [
      { from: 'agent', text: "Hi! Paul here from Premier Properties. How can I help?" },
      { from: 'user', text: "I'm looking to rent a flat in central London" },
      { from: 'agent', text: "Great! What's your budget and when do you want to move in?" }
    ]
  },
  restaurant: { 
    agent: "Sarah", 
    company: "The Ivy", 
    messages: [
      { from: 'agent', text: "Good evening! You've reached The Ivy. How can I help?" },
      { from: 'user', text: "I'd like to book a table for 4 this Saturday" },
      { from: 'agent', text: "Wonderful! What time works for you?" }
    ]
  },
  clinic: { 
    agent: "Emma", 
    company: "City Medical", 
    messages: [
      { from: 'agent', text: "Good morning, City Medical. How can I assist?" },
      { from: 'user', text: "I need to see Dr. Smith please" },
      { from: 'agent', text: "Let me check Dr. Smith's availability for you." }
    ]
  }
}

export default function Hero() {
  const [activeDemo, setActiveDemo] = useState('realestate')
  const demo = demos[activeDemo as keyof typeof demos]

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient pt-20">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob w-96 h-96 bg-[#1877F2] top-1/4 left-1/4 wave-element"></div>
        <div className="blob w-96 h-96 bg-[#9333EA] bottom-1/4 right-1/4 wave-element" style={{ animationDelay: '-3s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm text-white mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Trusted by 500+ UK businesses
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Never Miss a<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1877F2] to-[#9333EA]">Call Again</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Your AI receptionist works 24/7 to answer calls, qualify leads, and book appointments — so you can focus on running your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a href="/dashboard" className="glowing-btn inline-flex items-center justify-center px-8 py-4 gradient-bg text-white rounded-xl font-bold text-lg">
                Start Free Trial
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
              <a href="#demo" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10">
                Watch Demo
              </a>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400 justify-center lg:justify-start">
              <span className="flex items-center gap-2">✓ No credit card required</span>
              <span className="flex items-center gap-2">✓ 14-day free trial</span>
            </div>
          </div>

          {/* Right: Interactive Demo Card */}
          <div id="demo" className="relative">
            <div className="absolute -inset-6 bg-gradient-to-r from-[#1877F2]/20 to-[#9333EA]/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-slate-50 px-5 py-3 border-b flex gap-2">
                <button 
                  onClick={() => setActiveDemo('realestate')} 
                  id="tab-realestate" 
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeDemo === 'realestate' ? 'scenario-btn active' : 'text-slate-500'}`}
                >
                  Real Estate
                </button>
                <button 
                  onClick={() => setActiveDemo('restaurant')} 
                  id="tab-restaurant" 
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeDemo === 'restaurant' ? 'scenario-btn active' : 'text-slate-500'}`}
                >
                  Restaurant
                </button>
                <button 
                  onClick={() => setActiveDemo('clinic')} 
                  id="tab-clinic" 
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeDemo === 'clinic' ? 'scenario-btn active' : 'text-slate-500'}`}
                >
                  Clinic
                </button>
              </div>
              <div className="p-5 min-h-[250px]" id="chat-container">
                {demo.messages.map((msg, idx) => {
                  const isUser = msg.from === 'user'
                  return (
                    <div key={idx} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} mb-4`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${isUser ? 'bg-slate-300 text-slate-600' : 'gradient-bg'}`}>
                        {isUser ? 'You' : demo.agent[0]}
                      </div>
                      <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${isUser ? 'bg-[#1877F2] text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'}`}>
                        {msg.text}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="p-4 border-t flex items-center justify-center gap-3">
                <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.941 21 3 14.059 3 10V3a2 2 0 012-2z"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold" id="demo-agent">{demo.agent}</div>
                  <div className="text-xs text-slate-500" id="demo-company">{demo.company}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
