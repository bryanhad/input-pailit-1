import Image from "next/image"
import BankruptcyVerdict from "./_components/BankruptcyVerdict"
import RootPageTitle from "./_components/RootPageTitle"

export default function Home() {
    return (
        <div className=" pt-[2vh] lg:pt-[5vh] xl:pt-[8vh] lg:flex lg:justify-center">
            <div className="flex flex-col lg:flex-row max-lg:items-center gap-4">
                <div className="flex flex-col items-center gap-2 lg:items-end">
                    <Image
                        className="rounded-md"
                        alt="company logo"
                        src={"/company-logo.webp"}
                        width={300}
                        height={300}
                    />
                    <RootPageTitle />
                </div>
                <div className="w-full max-w-[95%] rounded-lg shadow-sm border p-6 bg-white lg:max-w-[400px]">
                    <BankruptcyVerdict verdictNumber="47 / Pdt.Sus / Pailit / 2015 / PN.NIAGA.JKT.PST" />
                </div>
            </div>
        </div>
    )
}
