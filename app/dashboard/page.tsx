import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Voice AI UK</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">demo@business.co.uk</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Nav */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link href="/dashboard/phone-numbers" className="bg-white p-6 rounded-xl border hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Phone Numbers</div>
                <div className="text-sm text-gray-500">+44 numbers</div>
              </div>
            </div>
          </Link>
          
          <Link href="/dashboard/calls" className="bg-white p-6 rounded-xl border hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Call Logs</div>
                <div className="text-sm text-gray-500">View all calls</div>
              </div>
            </div>
          </Link>
          
          <Link href="/dashboard/analytics" className="bg-white p-6 rounded-xl border hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Analytics</div>
                <div className="text-sm text-gray-500">View reports</div>
              </div>
            </div>
          </Link>
          
          <Link href="/dashboard/settings" className="bg-white p-6 rounded-xl border hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Settings</div>
                <div className="text-sm text-gray-500">Account & billing</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border">
            <div className="text-3xl font-bold">1,247</div>
            <div className="text-gray-500">Calls This Month</div>
          </div>
          <div className="bg-white p-6 rounded-xl border">
            <div className="text-3xl font-bold">89%</div>
            <div className="text-gray-500">Answer Rate</div>
          </div>
          <div className="bg-white p-6 rounded-xl border">
            <div className="text-3xl font-bold">234</div>
            <div className="text-gray-500">Bookings</div>
          </div>
          <div className="bg-white p-6 rounded-xl border">
            <div className="text-3xl font-bold">£2.4k</div>
            <div className="text-gray-500">Cost Saved</div>
          </div>
        </div>

        {/* Agents */}
        <div className="bg-white rounded-xl border">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Agents</h2>
            <Link href="/dashboard/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + New Agent
            </Link>
          </div>
          <div className="p-6">
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">No agents yet</p>
              <Link href="/dashboard/new" className="text-blue-600 hover:underline">
                Create your first AI receptionist
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
