// Call Logs Dashboard Page
// Displays a list of all calls with filtering and search

'use client'

import { useState, useEffect } from 'react'

interface Call {
  id: string
  callSid: string | null
  status: string
  duration: number | null
  recordingUrl: string | null
  transcript: string | null
  callerNumber: string | null
  direction: string | null
  outcome: string | null
  startedAt: string
  endedAt: string | null
  agent: {
    id: string
    name: string
  }
  phoneNumber: {
    id: string
    number: string
  }
}

interface Pagination {
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

export default function CallLogsPage() {
  const [calls, setCalls] = useState<Call[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  // Fetch calls from API
  const fetchCalls = async (offset = 0, statusFilter = 'all') => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        limit: '20',
        offset: offset.toString()
      })
      
      if (statusFilter !== 'all') {
        params.set('status', statusFilter)
      }

      const response = await fetch(`/api/calls?${params}`)
      const data = await response.json()
      
      if (data.calls) {
        setCalls(data.calls)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Failed to fetch calls:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchCalls(0, filter)
  }, [filter])

  // Format phone number for display
  const formatPhoneNumber = (number: string | null) => {
    if (!number) return 'Unknown'
    // Format UK numbers: +447700900000 -> 07700 900000
    if (number.startsWith('+44')) {
      return '0' + number.slice(3)
    }
    return number
  }

  // Format duration
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '-'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Format date/time
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Get status badge class
  const getStatusBadge = (status: string) => {
    const classes: Record<string, string> = {
      completed: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
      ringing: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      voicemail: 'bg-purple-100 text-purple-800'
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
  }

  // Get outcome badge class
  const getOutcomeBadge = (outcome: string | null) => {
    if (!outcome) return 'bg-gray-100 text-gray-600'
    const classes: Record<string, string> = {
      booked: 'bg-green-100 text-green-800',
      qualified: 'bg-blue-100 text-blue-800',
      voicemail: 'bg-purple-100 text-purple-800',
      callback: 'bg-yellow-100 text-yellow-800',
      lost: 'bg-red-100 text-red-800'
    }
    return classes[outcome] || 'bg-gray-100 text-gray-600'
  }

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  const loadMore = () => {
    if (pagination?.hasMore) {
      fetchCalls(pagination.offset + 20, filter)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-gray-500 hover:text-gray-700">
              ← Back
            </a>
            <h1 className="text-xl font-bold">Call Logs</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">demo@business.co.uk</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl border p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Calls
            </button>
            <button
              onClick={() => handleFilterChange('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => handleFilterChange('voicemail')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'voicemail'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Voicemails
            </button>
            <button
              onClick={() => handleFilterChange('failed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'failed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Failed
            </button>
          </div>
        </div>

        {/* Call List */}
        <div className="bg-white rounded-xl border overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading calls...</p>
            </div>
          ) : calls.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No calls yet</h3>
              <p className="text-gray-500">Your AI agents haven't received any calls yet.</p>
            </div>
          ) : (
            <>
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Caller
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agent
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Outcome
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {calls.map((call) => (
                    <tr key={call.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDateTime(call.startedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPhoneNumber(call.callerNumber)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {call.direction || 'Unknown direction'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{call.agent.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatPhoneNumber(call.phoneNumber.number)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(call.status)}`}>
                          {call.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {call.outcome ? (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getOutcomeBadge(call.outcome)}`}>
                            {call.outcome}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDuration(call.duration)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          {call.recordingUrl && (
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              Listen
                            </button>
                          )}
                          {call.transcript && (
                            <button className="text-gray-600 hover:text-gray-800 text-sm">
                              Transcript
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Load More */}
              {pagination?.hasMore && (
                <div className="p-4 border-t text-center">
                  <button
                    onClick={loadMore}
                    className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}

              {/* Total count */}
              {pagination && (
                <div className="p-4 border-t bg-gray-50 text-sm text-gray-500">
                  Showing {calls.length} of {pagination.total} calls
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
