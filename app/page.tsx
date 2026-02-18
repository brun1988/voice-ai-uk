import Link from 'next/link'
import { Phone, Bot, Calendar, Shield, BarChart3, Globe, ArrowRight, Star, Check, Play } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-9 h-9 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-lg font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Voice AI UK</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {['Features', 'Pricing', 'Templates'].map((item) => (
                <a key={item} href={item === 'Features' ? '#features' : item === 'Pricing' ? '#pricing' : '#templates'} className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                  {item}
                </a>
              ))}
              <Link href="/dashboard" className="ml-2 px-4 py-2.5 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5">
                Get Started
              </Link>
            </div>
            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-slate-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0F172A] to-[#0F172A]" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 mb-8 backdrop-blur-sm">
              <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
              Trusted by 500+ UK businesses
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Never Miss a Call Again
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your AI Receptionist works 24/7 to answer calls, qualify leads, and book appointments — so you can focus on running your business.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                href="/dashboard"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:-translate-y-1"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/5 transition-all backdrop-blur-sm">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
            
            <p className="text-sm text-slate-500">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>

          {/* Demo Conversation Card */}
          <div className="mt-16 max-w-md mx-auto relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-[#1E293B] rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-slate-500 uppercase tracking-wider">AI Assistant Demo</span>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg">AI</div>
                  <div className="bg-white/10 rounded-2xl rounded-tl-none p-4 text-sm text-slate-200">
                    Hello! I'm the AI receptionist for Premier Properties. How can I help you today?
                  </div>
                </div>
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">You</div>
                  <div className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] rounded-2xl rounded-tr-none p-4 text-sm text-white">
                    Hi, I'm interested in viewing a property in London
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg">AI</div>
                  <div className="bg-white/10 rounded-2xl rounded-tl-none p-4 text-sm text-slate-200">
                    That's great! I can help you schedule a viewing. What type of property are you looking for?
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 flex justify-center gap-16 text-center">
            {[
              { value: '50K+', label: 'Calls Handled' },
              { value: '500hrs', label: 'Time Saved' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Everything you need
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Powerful features to automate your phone lines and never miss a lead.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Bot, title: 'AI Voice Agents', desc: 'Natural-sounding AI that understands context and handles conversations intelligently.', color: 'blue' },
              { icon: Calendar, title: 'Smart Scheduling', desc: 'Automatically check availability and book appointments in your calendar.', color: 'purple' },
              { icon: Shield, title: 'UK Phone Numbers', desc: 'Get a dedicated +44 number that works 24/7, even when you\'re closed.', color: 'green' },
              { icon: BarChart3, title: 'Analytics', desc: 'Track call volume, conversion rates, and agent performance.', color: 'orange' },
              { icon: Globe, title: 'Multi-Language', desc: 'Support for English, Welsh, and other languages.', color: 'pink' },
              { icon: Phone, title: 'Easy Setup', desc: 'Set up in minutes with our guided wizard. No coding required.', color: 'cyan' },
            ].map((feature, i) => (
              <div key={i} className="group bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 hover:bg-[#1E293B] hover:border-white/10 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 border border-${feature.color}-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-400`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Simple pricing
              </span>
            </h2>
            <p className="text-slate-400">Start free, upgrade when you're ready</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all">
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

            {/* Pro */}
            <div className="bg-gradient-to-b from-[#1E293B] to-[#1E293B]/50 border-2 border-[#3B82F6]/50 rounded-2xl p-8 relative transform scale-105 shadow-2xl shadow-blue-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white text-xs font-medium rounded-full">
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
              <Link href="/dashboard" className="block w-full py-3 text-center bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all font-medium">
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all">
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
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Ready to automate your phone lines?
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join hundreds of UK businesses already using Voice AI UK.
          </p>
          <Link 
            href="/dashboard"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:-translate-y-1"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm">© 2026 Voice AI UK. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
