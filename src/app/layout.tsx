import '@/app/globals.css'
import BreadCrumbsLink from '@/components/BreadCrumbsLink'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Open_Sans  } from 'next/font/google'
import NewNavbar from './_components/NewNavbar'

const openSans = Open_Sans({ subsets: ['latin'] })

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
            <body className={openSans.className}>
                <div className="min-h-screen min-w-[280px] bg-background font-sans antialiased flex flex-col bg-slate-100">
                    <NewNavbar/>
                    {/* <Navbar /> */}
                    <main className="mt-6 flex-1 w-full max-w-[1400px] mx-auto px-4 pb-2 flex flex-col overflow-hidden">
                        <BreadCrumbsLink />
                        {children}
                    </main>
                </div>
                <Toaster/>
            </body>
        </html>
    )
}
