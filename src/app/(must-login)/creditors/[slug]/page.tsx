import { Button } from "@/components/ui/button"
import Link from "next/link"

type CreditorDetailPageProps = { params: { slug: string } }

function CreditorDetailPage({ params: { slug } }: CreditorDetailPageProps) {
    return (
        <div>
            <p>{JSON.stringify(slug)}</p>
            <Button asChild>
                <Link href={`/creditors/${slug}/edit`}>Edit Creditor</Link>
            </Button>
        </div>
    )
}

export default CreditorDetailPage
