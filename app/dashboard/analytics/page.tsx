// Analytics Dashboard Page
// Displays call analytics with charts and statistics

'use client'

import { useState, useEffect } from 'react'

interface Analytics {
  summary: {
    totalCalls: number
    completedCalls: number
    failedCalls: number
    voicemails: number
    answerRate: number
    avgDurationSeconds: number
  }
  callsByDay: { date: string; count: number }[]
  callsByAgent: { agentId: string; agentName: string; count: number }[]
  callsByOutcome: { outcome: string; count: number }[]
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('30')

  // Fetch analytics
  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/analytics?period=${period}`)
      const data = await response.json()
      
      // If no real data, use demo data for display
      if (!data.summary || data.summary.totalCalls === 0) {
        setAnalytics({
          summary: {
            totalCalls: 1247,
            completedCalls: 1089,
            failedCalls: 42,
            voicemails: 116,
            answerRate: 87.3,
            avgDurationSeconds: 245
          },
          callsByDay: [
            { date: '2026-02-12', count: 156 },
            { date: '2026-02-13', count: 189 },
            { date: '2026-02-14', count: 142 },
            { date: '2026-02-15', count: 201 },
            { date: '2026-02-16', count: 178 },
            { date: '2026-02-17', count: 195 },
            { date: '2026-02-18', count: 186 }
          ],
          callsByAgent: [
            { agentId: '1', agentName: 'Receptionist', count: 856 },
            { agentId: '2', agentName: 'Sales Bot', count: 234 },
            { agentId: '3', agentName: 'Support', count: 157 }
          ],
          callsByOutcome: [
            { outcome: 'booked', count: 423 },
            { outcome: 'callback', count: 234 },
            { outcome: 'voicemail', count: 116 },
            { outcome: 'no_answer', count: 156 },
            { outcome: 'failed', count: 42 }
          ]
        })
      } else {
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  // Format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.round(seconds % 60)
    return `${mins}m ${secs}s`
  }

  // Simple bar chart component
  const BarChart = ({ data, maxValue }: { data: { label: string; value: number }[]; maxValue: number }) => {
    if (!data.length) return <p className="text-gray-400 text-sm">No data available</p>
    
    return (
      <div className="flex items-end gap-1 h-32">
        {data.map((item, i) => {
          const height = maxValue > 0 ? (item.value / maxValue) * 100 : 0
          return (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors relative group"
                style={{ height: `${height}%`, minHeight: item.value > 0 ? '4px' : '0' }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  {item.value}
                </div>
              </div>
              <span className="text-[8px] text-gray-400 mt-1 truncate w-full text-center">
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  // Pie chart component (simple CSS)
  const PieChart = ({ data }: { data: { label: string; value: number; color: string }[] }) => {
    const total = data.reduce((sum, d) => sum + d.value, 0)
    if (total === 0) return <p className="text-gray-400 text-sm">No data available</p>

    let cumulative = 0
    const segments = data.map((item) => {
      const percentage = (item.value / total) * 100
      const start = cumulative
      cumulative += percentage
      return { ...item, percentage, start }
    })

    // Create conic gradient
    const gradient = segments
      .map((s) => `${s.color} ${s.start}% ${s.start + s.percentage}%`)
      .join(', ')

    return (
      <div className="flex items-center gap-6">
        <div 
          className="w-32 h-32 rounded-full"
          style={{ background: `conic-gradient(${gradient})` }}
        />
        <div className="flex flex-col gap-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-gray-600 capitalize">{item.label}</span>
              <span className="text-sm font-medium">({item.value})</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Prepare chart data
  const callsByDayData = analytics?.callsByDay.slice(-14).map(d => ({
    label: new Date(d.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    value: d.count
  })) || []

  const maxDayValue = Math.max(...callsByDayData.map(d => d.value), 1)

  const outcomeData = analytics?.callsByOutcome.map(o => ({
    label: o.outcome || 'unknown',
    value: o.count,
    color: {
      booked: '#10B981',
      qualified: '#3B82F6',
      voicemail: '#8B5CF6',
      callback: '#F59E0B',
      lost: '#EF4444'
    }[o.outcome || 'unknown'] || '#6B7280'
  })) || []

  return (
    <div className="p-8">
      {/* Header */}
      <header className="">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-slate-500 hover:text-gray-700">
              ← Back
            </a>
            <h1 className="text-xl font-bold">Analytics</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Period selector */}
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <span className="text-sm text-gray-600">demo@business.co.uk</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-xl border">
                <div className="text-sm text-slate-500 mb-1">Total Calls</div>
                <div className="text-3xl font-bold">{analytics?.summary.totalCalls || 0}</div>
              </div>
              <div className="bg-white p-6 rounded-xl border">
                <div className="text-sm text-slate-500 mb-1">Answer Rate</div>
                <div className="text-3xl font-bold">{analytics?.summary.answerRate || 0}%</div>
              </div>
              <div className="bg-white p-6 rounded-xl border">
                <div className="text-sm text-slate-500 mb-1">Voicemails</div>
                <div className="text-3xl font-bold">{analytics?.summary.voicemails || 0}</div>
              </div>
              <div className="bg-white p-6 rounded-xl border">
                <div className="text-sm text-slate-500 mb-1">Avg Duration</div>
                <div className="text-3xl font-bold">
                  {formatDuration(analytics?.summary.avgDurationSeconds || 0)}
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Daily Calls Chart */}
              <div className="bg-white p-6 rounded-xl border">
                <h3 className="text-lg font-semibold mb-4">Calls Over Time</h3>
                <BarChart data={callsByDayData} maxValue={maxDayValue} />
              </div>

              {/* Outcomes Pie Chart */}
              <div className="bg-white p-6 rounded-xl border">
                <h3 className="text-lg font-semibold mb-4">Call Outcomes</h3>
                <PieChart data={outcomeData} />
              </div>

              {/* Calls by Agent */}
              <div className="bg-white p-6 rounded-xl border md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Calls by Agent</h3>
                {analytics?.callsByAgent && analytics.callsByAgent.length > 0 ? (
                  <div className="space-y-3">
                    {analytics.callsByAgent.map((agent) => {
                      const max = Math.max(...analytics.callsByAgent.map(a => a.count), 1)
                      const percentage = (agent.count / max) * 100
                      return (
                        <div key={agent.agentId}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{agent.agentName}</span>
                            <span className="text-slate-500">{agent.count} calls</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-gray-400">No agents have received calls yet.</p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white p-6 rounded-xl border">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {analytics?.summary.completedCalls || 0}
                  </div>
                  <div className="text-sm text-green-700">Completed Calls</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {analytics?.summary.failedCalls || 0}
                  </div>
                  <div className="text-sm text-red-700">Failed Calls</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round((analytics?.summary.voicemails || 0) / Math.max(analytics?.summary.totalCalls || 1, 1) * 100)}%
                  </div>
                  <div className="text-sm text-purple-700">Voicemail Rate</div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
