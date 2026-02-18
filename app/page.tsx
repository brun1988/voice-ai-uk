import Link from 'next/link'
import { Phone, Bot, Calendar, Shield, BarChart3, Globe, ArrowRight, Star } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Voice AI UK</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#templates" className="text-gray-600 hover:text-gray-900">Templates</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <Link href="/dashboard" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
              <Star className="h-4 w-4" fill="currentColor" />
              Trusted by UK businesses
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6">
              Never Miss a Call Again
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your AI Receptionist works 24/7 to answer calls, qualify leads, and book appointments — so you can focus on running your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all">
                Book Demo
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>

          {/* Hero Image/Phone Mockup */}
          <div className="mt-16 relative">
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-32 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">AI</div>
                      <div className="flex-1 bg-gray-50 rounded-2xl p-4">
                        <p className="text-gray-700">Hello, thank you for calling Acme Properties. How can I help you today?</p>
                      </div>
                    </div>
                    <div className="flex gap-4 flex-row-reverse">
                      <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
                      <div className="flex-1 bg-blue-600 rounded-2xl p-4">
                        <p className="text-white">Hi, I'd like to book a property viewing please.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">AI</div>
                      <div className="flex-1 bg-gray-50 rounded-2xl p-4">
                        <p className="text-gray-700">I'd be happy to help with that. What date works best for you?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Calls Handled', value: '50K+' },
              { label: 'Time Saved', value: '500hrs' },
              { label: 'Businesses', value: '200+' },
              { label: 'Satisfaction', value: '4.9/5' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete solution for automating your business phone lines
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: 'Smart AI Receptionist',
                description: 'Natural conversations that understand context, accent variations, and complex queries.',
                color: 'blue',
              },
              {
                icon: Calendar,
                title: 'Instant Booking',
                description: 'Automatically check availability and book appointments directly into your calendar.',
                color: 'green',
              },
              {
                icon: Shield,
                title: 'GDPR Compliant',
                description: 'Full UK data protection compliance with secure storage and consent management.',
                color: 'purple',
              },
              {
                icon: BarChart3,
                title: 'Analytics Dashboard',
                description: 'Track call volumes, conversion rates, and identify your busiest times.',
                color: 'orange',
              },
              {
                icon: Globe,
                title: 'UK Phone Numbers',
                description: 'Get a professional +44 number or port your existing business line.',
                color: 'indigo',
              },
              {
                icon: Phone,
                title: 'Multi-Language',
                description: 'Support for multiple languages to serve diverse customer bases.',
                color: 'pink',
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`h-12 w-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-5`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in minutes, not days</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Create Your Agent',
                description: 'Choose from ready-made templates or build your own. Set your business hours, greeting, and responses.',
              },
              {
                step: '02',
                title: 'Get a UK Number',
                description: 'We provide a professional +44 number, or port your existing business line at no extra cost.',
              },
              {
                step: '03',
                title: 'Go Live',
                description: 'Forward your calls to our AI or use our number. Start capturing every lead instantly.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-7xl font-bold text-gray-100 absolute -top-4 -left-2">{item.step}</div>
                <div className="relative pt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-24 px-4 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Industry Templates</h2>
            <p className="text-xl text-blue-100">Pre-built solutions for every business type</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Real Estate', icon: '🏠', color: 'bg-green-500', features: ['Property inquiries', 'Viewing bookings', 'Lead qualification'] },
              { name: 'Restaurant', icon: '🍽️', color: 'bg-orange-500', features: ['Table reservations', 'Takeaway orders', 'Opening hours'] },
              { name: 'Healthcare', icon: '🏥', color: 'bg-blue-500', features: ['Appointment scheduling', 'NHS compatibility', 'Triage queries'] },
              { name: 'Professional Services', icon: '💼', color: 'bg-purple-500', features: ['Consultation booking', 'Quote requests', 'Client intake'] },
              { name: 'Home Services', icon: '🔧', color: 'bg-yellow-500', features: ['Booking jobs', 'Emergency calls', 'Service inquiries'] },
              { name: 'Retail', icon: '🛒', color: 'bg-pink-500', features: ['Stock queries', 'Order status', 'Store locator'] },
              { name: 'Hospitality', icon: '🏨', color: 'bg-teal-500', features: ['Room bookings', 'Concierge', 'Amenity info'] },
              { name: 'Custom', icon: '✨', color: 'bg-gray-500', features: ['Build from scratch', 'Any industry', 'Full flexibility'] },
            ].map((template) => (
              <div key={template.name} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                <div className="text-4xl mb-4">{template.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{template.name}</h3>
                <ul className="space-y-2">
                  {template.features.map((f) => (
                    <li key={f} className="text-blue-100 text-sm flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-blue-200 rounded-full"></div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Start free, scale as you grow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">£0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for testing</p>
              <ul className="space-y-3 mb-8">
                {['50 calls/month', '1 AI Agent', 'Basic templates', 'Email support']}
              </ul>
              <Link href="/register" className="block w-full py-3 text-center border-2 border-gray-200 rounded-xl font-medium hover:border-gray-300 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-2xl p-8 border-2 border-blue-500 relative shadow-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">£29</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mb-6">For growing businesses</p>
              <ul className="space-y-3 mb-8">
                {['Unlimited calls', '5 AI Agents', 'All templates', 'Calendar integration', 'Priority support', 'Analytics dashboard']}
              </ul>
              <Link href="/register" className="block w-full py-3 text-center bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">£79</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mb-6">For large organisations</p>
              <ul className="space-y-3 mb-8">
                {['Everything in Pro', 'Unlimited agents', 'Custom integrations', 'Dedicated support', 'SLA guarantee', 'White-label']}
              </ul>
              <Link href="/register" className="block w-full py-3 text-center border-2 border-gray-200 rounded-xl font-medium hover:border-gray-300 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
         ="max-w- <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Never Miss a Call?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join 200+ UK businesses already using Voice AI UK
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="inline-flex items-center justify-center px-8 py-4 text-white border border-gray-600 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold text-white">Voice AI UK</span>
            </div>
            <div className="flex gap-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2026 Voice AI UK. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
