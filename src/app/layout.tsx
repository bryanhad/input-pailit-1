import type { Metadata } from 'next'
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import Navbar from './_components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import BreadCrumbsLink from '@/components/BreadCrumbsLink'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        default: 'Si PT Pailit',
        template: '%s | Si PT Pailit',
    },
    description: 'Tempat input data Si PT Pailit.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen min-w-[280px] bg-background font-sans antialiased flex flex-col items-center bg-slate-100">
                    <Navbar />
                    <main className="mt-6 flex-1 w-full max-w-[1400px] px-4 pb-2">
                        <BreadCrumbsLink />
                        {children}
                    </main>
                </div>
                <Toaster/>
            </body>
        </html>
    )
}
