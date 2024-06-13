import Image from "next/image"
import BankruptcyVerdict from "./_components/BankruptcyVerdict"
import RootPageTitle from "./_components/RootPageTitle"

export default function Home() {
    return (
        <div className="flex flex-col items-center gap-6 flex-1 pt-[6vh]">
            <div className="flex flex-col items-center ">
                <Image
                    className="rounded-md"
                    alt="company logo"
                    src={"/company-logo.webp"}
                    width={100}
                    height={100}
                />
                <RootPageTitle />
            </div>
            <div className="w-full max-w-[95%] border p-4 ">
                <BankruptcyVerdict verdictNumber="47 / Pdt.Sus / Pailit / 2015 / PN.NIAGA.JKT.PST" />
            </div>
        </div>
    )
}
