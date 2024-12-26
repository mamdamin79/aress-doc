import '../global.css';


export const metadata = {
  title: 'reports page',
  description: 'here you can find reports',
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
