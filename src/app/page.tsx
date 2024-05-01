'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
    return (
        <div>
            <Button asChild>
                <Link href="/dashboard">GO TO DASHBOARD</Link>
            </Button>
        </div>
    )
}
