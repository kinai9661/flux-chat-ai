import './globals.css'

export const metadata = {
  title: 'Flux Chat AI',
  description: 'AI Chat + Image Generator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}