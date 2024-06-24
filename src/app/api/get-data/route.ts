import { auth } from "@/auth"
import XLSX from "xlsx"
import db from "@/lib/db"

export async function GET(req: Request) {
    const session = await auth()

    if (!session) {
        return Response.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        const data: unknown[] = await db.$queryRaw`
        SELECT 
            "number" as "Nomor",
            "nama" as "Nama Kreditor",
            "NIKAtauNomorAktaPendirian" as "NIK atau Nomor Akta Pendirian",
            "alamat" as "Alamat Kreditor",
            "namaKuasaHukum" as "Kuasa atau Kuasa Hukum",
            "korespondensi" as "Alamat Korespondensi",
            "nomorTelepon" as "Contact Person"
        FROM creditors
    `
        const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, "My sheet")

        const buff = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

        return new Response(buff, {
            status: 200,
            headers: {
                "Content-Disposition": `attachment; filename="dataaaa.xlsx"`,
                "Content-Type": "application/vnd.ms-excel",
            },
        })
    } catch (err) {
        console.log(err)
    }
}
