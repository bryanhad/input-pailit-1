import { auth } from '@/auth'
import db from '@/lib/db'
import { formatCurrency, formatDateToLocale } from '@/lib/utils'
import XLSX from 'xlsx'

type FetchedCreditor = {
    Nomor: number
    'Nama Kreditor': string
    'NIK atau Nomor Akta Pendirian': string | null
    'Alamat Kreditor': string | null
    'Nomor Telepon Kreditor': string | null
    'Email Kreditor': string | null
    'Kuasa / Kuasa Hukum': string | null
    'Nomor Telepon Kuasa / Kuasa Hukum': string | null
    'Alamat Korespondensi': string | null
    'Tagihan Pokok': string
    'Bunga Tagihan': string | null
    'Denda Tagihan': string | null
    'Sifat Tagihan': string
    'Total Tagihan': string
    'Jumlah Lampiran': string
    'Tanggal Input': Date
}

export async function GET(req: Request) {
    const session = await auth()

    if (!session) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    try {
        const creditors = await db.creditor.findMany({
            include: { _count: { select: { attachments: true } } },
            orderBy: {number: 'asc'}
        })

        const processedData = creditors.map((c) => {
            const tagihanPokok = Number(c.tagihanPokok)
            const bungaTagihan = Number(c.bungaTagihan || '0')
            const dendaTagihan = Number(c.dendaTagihan || '0')

            const totalTagihan = tagihanPokok + bungaTagihan + dendaTagihan

            return {
                No: c.number,
                'Nama Kreditor': c.nama,
                'NIK atau Nomor Akta Pendirian': c.NIKAtauNomorAktaPendirian,
                'Alamat Kreditor': c.alamat,
                'Nomor Telepon Kreditor': c.nomorTelepon,
                'Email Kreditor': c.email,
                'Kuasa / Kuasa Hukum': c.namaKuasaHukum,
                'Nomor Telepon Kuasa / Kuasa Hukum': c.nomorTeleponKuasaHukum,
                'Email Kuasa / Kuasa Hukum': c.emailKuasaHukum,
                'Alamat Korespondensi': c.alamatKorespondensi,
                'Tagihan Pokok': formatCurrency(tagihanPokok, 'IDR'), // Remove IDR for numeric values
                'Bunga Tagihan': formatCurrency(bungaTagihan, 'IDR'),
                'Denda Tagihan': formatCurrency(dendaTagihan, 'IDR'),
                'Total Tagihan': formatCurrency(totalTagihan, 'IDR'),
                'Sifat Tagihan': c.sifatTagihan,
                'Jumlah Lampiran': c._count.attachments
                    ? c._count.attachments
                    : null,
                'Tanggal Input': c.createdAt,
            }
        })

        const worksheet = XLSX.utils.json_to_sheet(processedData)
        const workbook = XLSX.utils.book_new()

        const currentDate = formatDateToLocale(new Date())
        const worksheetName = `${currentDate}`
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName)

        const columnWidths = [
            { wch: 4 }, // Default width for column A (Name)
            { wch: 20 }, // Default width for column B (Nama Kreditor)
            { wch: 22 }, // Default width for column B (NIK / Nomor Akta Pendirian)
            { wch: 20 }, // Default width for column B (Alamat Kreditor)
            { wch: 20 }, // Default width for column B (Nomor Telepon Kreditor)
            { wch: 15 }, // Default width for column B (Email Kreditor)
            { wch: 25 }, // Default width for column B (Kuasa / Kuasa Hukum)
            { wch: 25 }, // Default width for column B (Nomor Telepon Kuasa / Kuasa Hukum)
            { wch: 25 }, // Default width for column B (Email Kuasa / Kuasa Hukum)
            { wch: 25 }, // Default width for column B (Alamat Korespondensi)
            { wch: 12 }, // Default width for column B (Tagihan Pokok)
            { wch: 15 }, // Default width for column B (Bunga Tagihan)
            { wch: 15 }, // Default width for column B (Denda Tagihan)
            { wch: 15 }, // Default width for column B (Total Tagihan)
            { wch: 15 }, // Default width for column B (Sifat Tagihan)
            { wch: 15 }, // Default width for column B (Jumlah Lampiran)
            { wch: 15 }, // Default width for column B (Tanggal Input)
        ]

        worksheet['!cols'] = columnWidths

        const buff = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

        return new Response(buff, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="dataaaa.xlsx"`,
                'Content-Type': 'application/vnd.ms-excel',
            },
        })
    } catch (err) {
        console.log(err)
        return new Response('Failed to generate XLSX file', {
            status: 500,
        })
    }
}
