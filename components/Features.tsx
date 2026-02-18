'use client'

export default function Features() {
  const features = [
    { title: "Natural Conversations", description: "AI that sounds human. Handles objections professionally." },
    { title: "Smart Scheduling", description: "Books appointments into Google Calendar, Outlook." },
    { title: "UK Phone Numbers", description: "Get a +44 number or port your existing." },
    { title: "Live Analytics", description: "Track calls, conversions, revenue in real-time." },
    { title: "Lead Qualification", description: "AI asks the right questions to qualify leads." },
    { title: "GDPR Compliant", description: "UK data storage. Full GDPR compliance." }
  ]

  return (
    <section id="features" className="py-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Everything You Need</h2>
          <p className="text-lg text-slate-600">Powerful features for UK small businesses.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 card-hover">
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
