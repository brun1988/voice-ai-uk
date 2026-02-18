'use client'

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "£0",
      period: "/mo",
      description: "Perfect for testing",
      features: ["1 AI Agent", "50 calls/mo", "UK number", "Calendar"],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Professional",
      price: "£49",
      period: "/mo",
      description: "For growing businesses",
      features: ["5 AI Agents", "1,000 calls/mo", "UK number", "Lead qualification", "Analytics", "Priority support"],
      cta: "Start Free Trial",
      highlighted: true,
      badge: "Most Popular"
    },
    {
      name: "Enterprise",
      price: "£199",
      period: "/mo",
      description: "For large teams",
      features: ["Unlimited agents", "Unlimited calls", "Multiple numbers", "CRM integrations", "Advanced analytics", "Dedicated support"],
      cta: "Contact Sales",
      highlighted: false
    }
  ]

  return (
    <section id="pricing" className="py-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-slate-600">No hidden fees.</p>
        </div>
        <div className="flex justify-center items-stretch gap-8 max-w-5xl mx-auto flex-wrap">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl p-8 w-80 relative ${plan.highlighted ? 'border-2 border-[#1877F2] shadow-xl' : 'border border-slate-200'}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 gradient-bg text-white text-sm font-medium rounded-full">
                  {plan.badge}
                </div>
              )}
              <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-slate-500">{plan.period}</span>
              </div>
              <p className="text-slate-500 text-sm mb-6">{plan.description}</p>
              <ul className="space-y-3 text-sm text-slate-600 mb-8">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx}>✓ {feature}</li>
                ))}
              </ul>
              <a 
                href="/dashboard" 
                className={`block w-full py-3 text-center font-semibold rounded-xl ${plan.highlighted ? 'gradient-bg text-white' : 'border-2 border-slate-200 hover:bg-slate-50'}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
