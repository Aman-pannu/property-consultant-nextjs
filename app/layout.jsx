import './globals.css'
export const metadata = {
  title: '@Reality | Property Consultant',
  description: 'Independent property consultant helping buyers and sellers across Melbourne.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}
      </body>
    </html>
  )
}
