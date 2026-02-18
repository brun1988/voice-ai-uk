import Link from 'next/link'
import { Phone, Bot, Calendar, Shield, BarChart3, Globe, ArrowRight, Star } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-white">Voice AI UK</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#templates" className="text-slate-400 hover:text-white transition-colors">Templates</a>
              <a href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</a>
              <Link href="/dashboard" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-8 border border-blue-500/20">
              <Star className="h-4 w-4" fill="currentColor" />
              Trusted by UK businesses
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Never Miss a Call Again
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your AI Receptionist works 24/7 to answer calls, qualify leads, and book appointments — so you can focus on running your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-700 text-white rounded-xl font-semibold text-lg hover:border-slate-600 hover:bg-slate-800/50 transition-all">
                Book Demo
              </button>
            </div>
            <p className="text-slate-500 mt-6 text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>

          {/* Demo Conversation */}
          <div className="mt-16 max-w-md mx-auto bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-2xl">
            <div className="text-xs text-slate-500 mb-4 uppercase tracking-wider">AI Assistant Demo</div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AI</div>
                <div className="bg-slate-700 rounded-2xl rounded-tl-none p-4 text-white text-sm">
                  Hello! I'm the AI receptionist for Premier Properties. How can I help you today?
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">You</div>
                <div className="bg-blue-600 rounded-2xl rounded-tr-none p-4 text-white text-sm">
                  Hi, I'm interested in viewing a property in London
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AI</div>
                <div className="bg-slate-700 rounded-2xl rounded-tl-none p-4 text-white text-sm">
                  That's great! I can help you schedule a viewing. What type of property are you looking for?
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 flex justify-center gap-12 text-center">
            <div>
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-slate-500 text-sm">Calls Handled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">500hrs</div>
              <div className="text-slate-500 text-sm">Time Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Everything you need to automate your phone lines
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Bot, title: 'AI Voice Agents', desc: 'Natural-sounding AI that understands context and handles conversations intelligently.' },
              { icon: Calendar, title: 'Smart Scheduling', desc: 'Automatically check availability and book appointments in your calendar.' },
              { icon: Shield, title: 'UK Phone Numbers', desc: 'Get a dedicated +44 number that works 24/7, even when you\'re closed.' },
              { icon: BarChart3, title: 'Analytics', desc: 'Track call volume, conversion rates, and agent performance.' },
              { icon: Globe, title: 'Multi-Language', desc: 'Support for English, Welsh, and other languages.' },
              { icon: Phone, title: 'Easy Setup', desc: 'Set up in minutes with our guided wizard. No coding required.' },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                <feature.icon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-400 text-center mb-12">Start free, upgrade when you're ready</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
              <div className="text-4xl font-bold text-white mb-4">£0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <p className="text-slate-400 text-sm mb-6">Perfect for testing</p>
              <ul className="space-y-3 text-slate-300 text-sm mb-8">
                <li>✅ 1 AI Agent</li>
                <li>✅ 50 calls/month</li>
                <li>✅ Community support</li>
              </ul>
              <Link href="/dashboard" className="block text-center py-3 border border-slate-600 text-white rounded-lg hover:bg-slate-800 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-slate-900 p-8 rounded-2xl border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">Most Popular</div>
              <h3 className="text-xl font-semibold text-white mb-2">Professional</h3>
              <div className="text-4xl font-bold text-white mb-4">£49<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <p className="text-slate-400 text-sm mb-6">For growing businesses</p>
              <ul className="space-y-3 text-slate-300 text-sm mb-8">
                <li>✅ 5 AI Agents</li>
                <li>✅ 1,000 calls/month</li>
                <li>✅ UK phone number</li>
                <li>✅ Analytics dashboard</li>
                <li>✅ Priority support</li>
              </ul>
              <Link href="/dashboard" className="block text-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-4">£199<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <p className="text-slate-400 text-sm mb-6">For large teams</p>
              <ul className="space-y-3 text-slate-300 text-sm mb-8">
                <li>✅ Unlimited agents</li>
                <li>✅ Unlimited calls</li>
                <li>✅ Multiple numbers</li>
                <li>✅ Advanced analytics</li>
                <li>✅ Dedicated support</li>
              </ul>
              <Link href="/dashboard" className="block text-center py-3 border border-slate-600 text-white rounded-lg hover:bg-slate-800 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to automate your phone lines?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join hundreds of UK businesses already using Voice AI UK.
          </p>
          <Link 
            href="/dashboard"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>© 2026 Voice AI UK. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
