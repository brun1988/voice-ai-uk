'use client'

export default function Testimonials() {
  const testimonials = [
    { 
      quote: "Captured 40% more leads. AI books appointments while we sleep!", 
      name: "Sarah M.", 
      role: "Estate Agent, London",
      rating: 5
    },
    { 
      quote: "Front desk never misses a call. Brilliant for out-of-hours.", 
      name: "Dr. James H.", 
      role: "GP Practice, Manchester",
      rating: 5
    },
    { 
      quote: "Saved 20 hours per week on phone inquiries.", 
      name: "Mike T.", 
      role: "Restaurant Owner, Birmingham",
      rating: 5
    }
  ]

  return (
    <section id="testimonials" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Trusted by 500+ UK Businesses</h2>
          <p className="text-lg text-slate-600">See what business owners say.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-6">
              <div className="flex gap-1 mb-4 text-[#9333EA]">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-slate-600 mb-4">"{testimonial.quote}"</p>
              <div className="font-bold">{testimonial.name}</div>
              <div className="text-sm text-slate-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
