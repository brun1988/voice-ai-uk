import './globals.css'

export const metadata = {
  title: 'Voice AI UK - AI Receptionist Service',
  description: 'AI-powered voice receptionists for UK businesses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
