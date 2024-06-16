import Link from "next/link"
import { Ghost } from "lucide-react"
import { auth } from "@/auth"
import { Button } from "@/components/ui/button"

export default async function NotFound() {
    const session = await auth()

    return (
        <div className="flex justify-center mt-[7vh]">
            <div className="flex lg:flex-row flex-col gap-6 lg:gap-10 items-center">
                <Ghost size={200} className="shrink-0" />
                <div className="flex flex-col gap-6 justify-center text-center lg:text-start">
                    <h1 className="text-4xl font-bold">Uh-Oh,<br />Page Not Found</h1>
                    <p>
                        We looked everywhere for this page.
                        <br />
                        Are you sure the website URL is correct?
                    </p>
                    <Button asChild>
                        <Link href={session ? "/dashboard" : "/"}>Return to Home</Link>
                    </Button>

                </div>
            </div>
        </div>
    )
}
