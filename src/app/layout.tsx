'use client'

import React from 'react'
import { StoreProvider } from '@/redux/StoreProvider'

import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import styles from './layout.module.css'
import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})


//используем контекст для управления отображением sideBar на странице
interface ISideBarVisibilityState {
  isPageWithSideBar: boolean,
  setPageWithSideBar: Function,
  isSideBarStateVisible: boolean,
  showSideBar: Function,
  hideSideBar: Function,
  toggleSideBar: Function,
  isMobile: boolean
}

export const LayoutContext = React.createContext<ISideBarVisibilityState>({
  isPageWithSideBar: false,
  setPageWithSideBar: () => { },
  isSideBarStateVisible: false,
  showSideBar: () => { },
  hideSideBar: () => { },
  toggleSideBar: () => { },
  isMobile: false,
})


export default function RootLayout({ children }: { children: React.ReactNode }) {

  const isMobile = useMediaQuery();

  const [isPageWithSideBar, setPageWithSideBar] = React.useState(false);
  const [isSideBarStateVisible, setSideBarStateVisible] = React.useState(false);

  const showSideBar = React.useCallback(() => {
    setSideBarStateVisible(true);
  }, []);

  const hideSideBar = React.useCallback(() => {
    setSideBarStateVisible(false);
  }, []);

  const toggleSideBar = React.useCallback(() => {
    setSideBarStateVisible(state => !state);
  }, []);


  return (
    <html lang="ru" className={roboto.className}>
      <head>
        <title>Билетопоиск</title>
        <meta name='Учебный проект "Билетопоиск' content='First project with Next.js. Yandex summer School 2023 homework to React lessons' />
      </head>
      <body id={'root'}>
      <div id={'modalRoot'} className={styles.modalRoot}></div>
        <StoreProvider>
          <LayoutContext.Provider value={{ isPageWithSideBar, setPageWithSideBar, isSideBarStateVisible, showSideBar, hideSideBar, toggleSideBar, isMobile }}>
            <Header />
            <main className={styles.section}>
              {children}
            </main>
            <Footer />
          </LayoutContext.Provider>
        </StoreProvider>
      </body>
    </html >
  )
}
