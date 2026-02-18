import Link from 'next/link'
import { Phone, Bot, Calendar, Shield, BarChart3, Globe, ArrowRight, Star, Check, Play, Zap, MessageCircle, Clock, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-md opacity-50" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="ml-3 text-lg font-semibold text-white">Voice AI UK</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {['Features', 'Pricing'].map((item) => (
                <a key={item} href={item === 'Features' ? '#features' : '#pricing'} className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                  {item}
                </a>
              ))}
              <Link href="/dashboard" className="ml-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-slate-200 transition-all hover:scale-105">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-4 z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Now with GPT-4 integration
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <span className="text-white">Never Miss a </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Call Again
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your AI Receptionist works 24/7 to answer calls, qualify leads, and book appointments — so you can focus on running your business.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/dashboard"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-xl font-semibold text-lg hover:bg-slate-200 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/5 transition-all backdrop-blur-sm">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </button>
          </div>
          
          {/* Trust */}
          <p className="text-sm text-slate-500">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>

        {/* Demo Card */}
        <div className="mt-16 max-w-lg mx-auto relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-cyan-500/30 rounded-3xl blur-xl" />
          <div className="relative bg-[#111118] rounded-2xl border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-slate-500 uppercase tracking-wider">Live Demo</span>
              </div>
              <MessageCircle className="w-4 h-4 text-slate-600" />
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">AI</div>
                <div className="bg-white/10 rounded-2xl rounded-tl-none p-4 text-sm text-slate-200">
                  Hello! I'm the AI receptionist for Premier Properties. How can I help you today?
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs font-bold">You</div>
                <div className="bg-white text-black rounded-2xl rounded-tr-none p-4 text-sm">
                  Hi, I'm interested in viewing a property in London
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">AI</div>
                <div className="bg-white/10 rounded-2xl rounded-tl-none p-4 text-sm text-slate-200">
                  That's great! I have a beautiful 3-bedroom flat available. Would you like to schedule a viewing?
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: '50K+', label: 'Calls Handled', icon: Phone },
            { value: '500hrs', label: 'Time Saved', icon: Clock },
            { value: '99.9%', label: 'Uptime', icon: Zap },
            { value: '500+', label: 'UK Businesses', icon: TrendingUp },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="flex items-center justify-center gap-2 mb-1">
                <stat.icon className="w-4 h-4 text-blue-400" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features - Bento Grid Style */}
      <section id="features" className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Everything you need to </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">scale</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">Powerful features to automate your phone lines and never miss a lead.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Large card */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#15151F] to-[#1A1A25] border border-white/10 rounded-3xl p-8 hover:border-blue-500/30 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Voice Agents</h3>
              <p className="text-slate-400">Natural-sounding AI that understands context and handles conversations intelligently. Powered by GPT-4.</p>
              <div className="mt-6 flex gap-2">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">Real-time</span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full">24/7</span>
              </div>
            </div>

            {/* Small card */}
            <div className="bg-gradient-to-br from-[#15151F] to-[#1A1A25] border border-white/10 rounded-3xl p-8 hover:border-purple-500/30 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Scheduling</h3>
              <p className="text-slate-400 text-sm">Auto-check availability and book appointments.</p>
            </div>

            {/* Small card */}
            <div className="bg-gradient-to-br from-[#15151F] to-[#1A1A25] border border-white/10 rounded-3xl p-8 hover:border-green-500/30 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">UK Numbers</h3>
              <p className="text-slate-400 text-sm">Get a +44 number that works 24/7.</p>
            </div>

            {/* Large card */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#15151F] to-[#1A1A25] border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Analytics Dashboard</h3>
              <p className="text-slate-400">Track call volume, conversion rates, and agent performance with real-time analytics.</p>
              <div className="mt-6 h-24 flex items-end gap-2">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-blue-500/50 to-blue-500/20 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            {/* Small card */}
            <div className="bg-gradient-to-br from-[#15151F] to-[#1A1A25] border border-white/10 rounded-3xl p-8 hover:border-orange-500/30 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Multi-Language</h3>
              <p className="text-slate-400 text-sm">English, Welsh & more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Simple pricing</h2>
            <p className="text-slate-400">Start free, upgrade when you're ready</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="bg-[#111118] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
              <h3 className="text-lg font-semibold text-white mb-2">Starter</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-white">£0</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <p className="text-slate-400 text-sm mb-6">Perfect for testing</p>
              <ul className="space-y-3 text-slate-300 text-sm mb-8">
                {['1 AI Agent', '50 calls/month', 'Community support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="block w-full py-3 text-center border border-white/20 text-white rounded-xl hover:bg-white/5 transition-all">
                Get Started
              </Link>
            </div>

            {/* Pro - Featured */}
            <div className="bg-gradient-to-b from-[#15151F] to-[#111118] border-2 border-blue-500/30 rounded-3xl p-8 relative transform md:-translate-y-4 shadow-2xl shadow-blue-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Professional</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-white">£49</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <p className="text-slate-400 text-sm mb-6">For growing businesses</p>
              <ul className="space-y-3 text-slate-300 text-sm mb-8">
                {['5 AI Agents', '1,000 calls/month', 'UK phone number', 'Analytics dashboard', 'Priority support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-400" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="block w-full py-3 text-center bg-white text-black rounded-xl font-semibold hover:bg-slate-200 transition-all">
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-[#111118] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
              <h3 className="text-lg font-semibold text-white mb-2">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-white">£199</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <p className="text-slate-400 text-sm mb-6">For large teams</p>
              <ul className="space-y-3 text-slate-300 text-sm mb-8">
                {['Unlimited agents', 'Unlimited calls', 'Multiple numbers', 'Advanced analytics', 'Dedicated support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="block w-full py-3 text-center border border-white/20 text-white rounded-xl hover:bg-white/5 transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
          <div className="relative bg-[#111118] border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to automate your phone lines?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Join hundreds of UK businesses already using Voice AI UK.
            </p>
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-xl font-semibold text-lg hover:scale-105 transition-transform"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm">© 2026 Voice AI UK. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
