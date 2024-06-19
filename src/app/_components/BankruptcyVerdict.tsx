import React from 'react'

type BankruptcyVerdictProps = {
    verdictNumber: string
}

function BankruptcyVerdict({ verdictNumber }: BankruptcyVerdictProps) {
    return (
        <div className='space-y-4'>
            <h2 className='font-semibold tracking-tighter text-center'>{verdictNumber}</h2>
            <p className='italic font-thin'>
                PT. Bakso Jaya Mantab adalah sebuah Perusahaan Perseroan Terbatas lingkup usaha dalam bidang Perdagangan besar, berlokasi di jalan Sukahati III, Sukasari, Tangerang - Provinsi Banten, dinyatakan dalam keadaan pailit dengan segala akibat hukumnya berdasarkan Putusan Pengadilan Niaga pada Pengadilan Negeri Jakarta Pusat Nomor : 47 / Pdt.Sus / Pailit / 2015 / PN.NIAGA.JKT.PST tanggal 03 Februari 2016.
            </p>
        </div>
    )
}

export default BankruptcyVerdict
