'use client'

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-[#0F172A] text-slate-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.941 21 3 14.059 3 10V3a2 2 0 012-2z"></path>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">VoiceFlow AI</span>
            </div>
            <p className="text-sm">AI-powered receptionist for UK businesses.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-white">Features</a>
              <a href="#" className="block hover:text-white">Pricing</a>
              <a href="#" className="block hover:text-white">Demo</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-white">About</a>
              <a href="#" className="block hover:text-white">Blog</a>
              <a href="#" className="block hover:text-white">Contact</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-white">Privacy</a>
              <a href="#" className="block hover:text-white">Terms</a>
              <a href="#" className="block hover:text-white">GDPR</a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-sm flex flex-wrap justify-center gap-4">
          <span>© 2026 VoiceFlow AI. All rights reserved.</span>
          <span>🔒 GDPR Compliant</span>
          <span>✓ UK Data Hosting</span>
        </div>
      </div>
    </footer>
  )
}
