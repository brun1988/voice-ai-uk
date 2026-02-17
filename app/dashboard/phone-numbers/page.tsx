'use client'

/**
 * Phone Numbers Management Page
 * 
 * Allows users to:
 * - View purchased phone numbers
 * - Search for available UK numbers
 * - Purchase new numbers
 * - Release existing numbers
 * 
 * @route /dashboard/phone-numbers
 */

import { useState, useEffect } from 'react'

interface PhoneNumber {
  sid: string
  phoneNumber: string
  voiceUrl?: string
  status?: string
}

interface AvailableNumber {
  phoneNumber: string
  locality: string
  region: string
  postalCode: string
  price: string
}

export default function PhoneNumbersPage() {
  const [purchasedNumbers, setPurchasedNumbers] = useState<PhoneNumber[]>([])
  const [availableNumbers, setAvailableNumbers] = useState<AvailableNumber[]>([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
  const [areaCode, setAreaCode] = useState('20')
  const [activeTab, setActiveTab] = useState<'owned' | 'search'>('owned')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Load purchased numbers on mount
  useEffect(() => {
    loadPurchasedNumbers()
  }, [])

  const loadPurchasedNumbers = async () => {
    try {
      const res = await fetch('/api/phone-numbers')
      const data = await res.json()
      if (data.numbers) {
        setPurchasedNumbers(data.numbers)
      }
    } catch (error) {
      console.error('Error loading numbers:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchNumbers = async () => {
    setSearching(true)
    setMessage(null)
    try {
      const res = await fetch(`/api/phone-numbers?action=search&areaCode=${areaCode}&limit=10`)
      const data = await res.json()
      if (data.numbers) {
        setAvailableNumbers(data.numbers)
      }
    } catch (error) {
      console.error('Error searching numbers:', error)
      setMessage({ type: 'error', text: 'Failed to search numbers' })
    } finally {
      setSearching(false)
    }
  }

  const purchaseNumber = async (phoneNumber: string) => {
    setPurchasing(true)
    setMessage(null)
    try {
      const res = await fetch('/api/phone-numbers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      })
      const data = await res.json()
      
      if (data.success) {
        setMessage({ type: 'success', text: `Purchased ${phoneNumber}!` })
        loadPurchasedNumbers()
        setActiveTab('owned')
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to purchase' })
      }
    } catch (error) {
      console.error('Error purchasing number:', error)
      setMessage({ type: 'error', text: 'Failed to purchase number' })
    } finally {
      setPurchasing(false)
    }
  }

  const releaseNumber = async (sid: string) => {
    if (!confirm('Are you sure you want to release this number?')) return
    
    setMessage(null)
    try {
      const res = await fetch(`/api/phone-numbers?sid=${sid}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Number released successfully' })
        loadPurchasedNumbers()
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to release' })
      }
    } catch (error) {
      console.error('Error releasing number:', error)
      setMessage({ type: 'error', text: 'Failed to release number' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Phone Numbers</h1>
          <p className="text-gray-600 mt-2">
            Manage your UK phone numbers for AI voice agents
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('owned')}
            className={`pb-3 px-1 ${
              activeTab === 'owned'
                ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Numbers ({purchasedNumbers.length})
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`pb-3 px-1 ${
              activeTab === 'search'
                ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Search & Buy
          </button>
        </div>

        {/* Owned Numbers Tab */}
        {activeTab === 'owned' && (
          <div className="bg-white rounded-lg shadow">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : purchasedNumbers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No phone numbers yet.</p>
                <button
                  onClick={() => setActiveTab('search')}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Search for numbers →
                </button>
              </div>
            ) : (
              <div className="divide-y">
                {purchasedNumbers.map((num) => (
                  <div key={num.sid} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xl font-semibold text-gray-900">{num.phoneNumber}</p>
                      <p className="text-sm text-gray-500">SID: {num.sid}</p>
                      {num.voiceUrl && (
                        <p className="text-xs text-gray-400">Voice: {num.voiceUrl}</p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => releaseNumber(num.sid)}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        Release
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search & Buy Tab */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            {/* Search Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Search UK Numbers</h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area Code
                  </label>
                  <select
                    value={areaCode}
                    onChange={(e) => setAreaCode(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="20">London (20)</option>
                    <option value="121">Birmingham (121)</option>
                    <option value="131">Edinburgh (131)</option>
                    <option value="151">Liverpool (151)</option>
                    <option value="161">Manchester (161)</option>
                    <option value="191">Newcastle (191)</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={searchNumbers}
                    disabled={searching}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {searching ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {availableNumbers.length > 0 && (
              <div className="bg-white rounded-lg shadow">
                <h2 className="text-lg font-semibold p-4 border-b">Available Numbers</h2>
                <div className="divide-y">
                  {availableNumbers.map((num) => (
                    <div key={num.phoneNumber} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xl font-semibold text-gray-900">{num.phoneNumber}</p>
                        <p className="text-sm text-gray-500">
                          {num.locality}, {num.region} {num.postalCode}
                        </p>
                        <p className="text-sm text-gray-400">£{num.price}/month</p>
                      </div>
                      <button
                        onClick={() => purchaseNumber(num.phoneNumber)}
                        disabled={purchasing}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        {purchasing ? 'Purchasing...' : 'Buy'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
