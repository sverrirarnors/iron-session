import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vélin nemendafélag',
  description: 'Hagsmunafélag nemenda í iðnaðar-, véla- og efnaverkfræði við Háskóla Íslands.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="is">
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/iconified/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href="/iconified/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="57x57" href="/iconified/apple-touch-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/iconified/apple-touch-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/iconified/apple-touch-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/iconified/apple-touch-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/iconified/apple-touch-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/iconified/apple-touch-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/iconified/apple-touch-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/iconified/apple-touch-icon-180x180.png" />
      {/* <ThemeProvider attribute="class" defaultTheme="dark"> */}
      <body className="dark">
        <div className="flex flex-col min-h-screen bg-gray-800">
          {/* <Header activePage={active} /> */}
          <Toaster />
          <main className="flex-grow">
            <div className="container mx-auto text-gray-100 md:px-10 px-3 scrollbar-overlay w-11/12 lg:w-9/12">
              <>{children}</>
            </div>
          </main>
          {/* <Footer /> */}
        </div>
      </body>
      {/* </ThemeProvider> */}
    </html>
  )
}
