import './globals.css'
import { Inter } from 'next/font/google'
import { Roboto } from 'next/font/google'

import { StoreProvider } from '@/redux/StoreProvider'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'

// const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={roboto.className}>

      <body id={'root'} className='rt'>
        <StoreProvider>
          <Header />
          <main>
            {children}
          </main>
        </StoreProvider>

        <Footer />
      </body>

    </html >
  )
}

{/* <footer>Footer</footer> */ }
{/* <body className={inter.className}>{children}</body> */ } 