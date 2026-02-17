import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI Voice Receptionist for UK Businesses
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Never miss a call. Our AI Receptionist answers, qualifies, and books appointments 24/7.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Get Started
            </Link>
            <button className="px-8 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
              Book Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">1. Create Agent</h3>
              <p className="text-gray-600">Choose a template or build your own AI receptionist in minutes.</p>
            </div>
            <div className="p-6 border rounded-xl">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">2. Get Number</h3>
              <p className="text-gray-600">We provide a UK phone number (+44) for your business.</p>
            </div>
            <div className="p-6 border rounded-xl">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">3. AI Answers</h3>
              <p className="text-gray-600">AI handles calls, qualifies leads, and books appointments automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Ready-Made Templates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-green-50 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Real Estate</h3>
              <p className="text-gray-600">Qualify property leads, book viewings</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Restaurant</h3>
              <p className="text-gray-600">Table reservations, takeaways</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Healthcare</h3>
              <p className="text-gray-600">Appointment scheduling, NHS-compatible</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to automate your phone lines?</h2>
        <p className="text-blue-100 mb-8">Start free, scale as you grow.</p>
        <Link href="/dashboard" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50">
          Start Free Trial
        </Link>
      </section>
    </main>
  )
}
