import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="p-4 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back! Here's what's happening with your AI receptionists.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="text-2xl lg:text-3xl font-bold text-white">1,247</div>
          <div className="text-slate-400 text-sm">Calls This Month</div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="text-2xl lg:text-3xl font-bold text-green-400">89%</div>
          <div className="text-slate-400 text-sm">Answer Rate</div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="text-2xl lg:text-3xl font-bold text-blue-400">234</div>
          <div className="text-slate-400 text-sm">Bookings</div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="text-2xl lg:text-3xl font-bold text-purple-400">£2.4k</div>
          <div className="text-slate-400 text-sm">Cost Saved</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/dashboard/new" className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl text-white hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-600/25 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-semibold">Create Agent</span>
            </div>
            <div className="text-blue-200 text-sm">Build a new AI receptionist</div>
          </Link>
          
          <Link href="/dashboard/phone-numbers" className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-700 transition-all hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="font-semibold text-white">Phone Numbers</span>
            </div>
            <div className="text-slate-400 text-sm">Get a +44 UK number</div>
          </Link>
          
          <Link href="/dashboard/calls" className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-700 transition-all hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="font-semibold text-white">View Calls</span>
            </div>
            <div className="text-slate-400 text-sm">Listen to recordings</div>
          </Link>
          
          <Link href="/dashboard/analytics" className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-700 transition-all hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="font-semibold text-white">Analytics</span>
            </div>
            <div className="text-slate-400 text-sm">View reports</div>
          </Link>
        </div>
      </div>

      {/* Agents */}
      <div className="bg-slate-800 rounded-xl border border-slate-700">
        <div className="p-6 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-white">Your Agents</h2>
          <Link href="/dashboard/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap">
            + New Agent
          </Link>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-slate-400 mb-4">No agents yet</p>
            <Link href="/dashboard/new" className="text-blue-400 hover:text-blue-300 font-medium">
              Create your first AI receptionist →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
