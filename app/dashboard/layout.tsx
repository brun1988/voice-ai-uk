import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-900">
      <Sidebar />
      <main className="lg:ml-0">
        {children}
      </main>
    </div>
  )
}
