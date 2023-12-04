

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from '@/context/Provider'
import ModalProvider from '@/components/modal-provider'
import 'regenerator-runtime/runtime'
import ToastProvider from '@/context/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | VoiceFusion',
    default: 'VoiceFusion',
  },
  description: 'AI Generated voices for your videos', 
  alternates: {
    canonical: 'https://www.voicefusion.io',
  }
}


export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
     <Provider session={session}>
      <body className={inter.className}>
        <ToastProvider />
        <ModalProvider />
        {children}
        </body>
      </Provider>
    </html>
  )
}
