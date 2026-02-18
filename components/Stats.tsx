'use client'

import { useEffect, useState, useRef } from 'react'

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: 50000, suffix: '+', label: 'Calls Handled' },
    { value: 40, suffix: '%', label: 'More Leads' },
    { value: 10000, suffix: '', label: 'Hours Saved' },
    { value: 2500000, prefix: '£', suffix: '+', label: 'Revenue Generated' }
  ]

  return (
    <section ref={ref} className="py-16 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-4xl font-black text-white">
                {isVisible ? (
                  <AnimatedCounter 
                    target={stat.value} 
                    prefix={stat.prefix || ''} 
                    suffix={stat.suffix} 
                  />
                ) : (
                  <span>0</span>
                )}
              </div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let current = 0
    const increment = target / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 30)
    return () => clearInterval(timer)
  }, [target])

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}
