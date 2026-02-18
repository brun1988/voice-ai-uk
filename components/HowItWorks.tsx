'use client'

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Choose Your Template",
      description: "Pick from pre-built agents for estate agents, clinics, restaurants."
    },
    {
      number: 2,
      title: "Connect Your Phone",
      description: "Get a UK +44 number or port your existing. Calls forward to AI."
    },
    {
      number: 3,
      title: "Start Capturing Leads",
      description: "AI answers 24/7, qualifies leads, books appointments automatically."
    }
  ]

  return (
    <section id="how-it-works" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">How VoiceFlow AI Works</h2>
          <p className="text-lg text-slate-600">Get started in minutes. No technical setup required.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-slate-50 rounded-3xl p-8 card-hover text-center">
              <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center text-2xl font-black text-white mb-6 mx-auto">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
