// 'use server'

// import { Attachment, Creditor } from '@prisma/client'
// import puppeteer from 'puppeteer'
// import hb from 'handlebars'

// type ConvertHTMLToPDF = {
//     htmlContent: string
//     pdfFilePath: string
//     margins: {
//         top: string
//         right: string
//         bottom: string
//         left: string
//     }
// }

// export async function generatePDFFromHTML(
//     htmlContent: string,
//     pdfFilePath: string,
//     margins = {
//         top: '10mm',
//         right: '10mm',
//         bottom: '10mm',
//         left: '10mm',
//     }
// ) {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()

//     // Set page content
//     await page.setContent(htmlContent)
//     // Generate PDF
//     await page.pdf({ path: pdfFilePath, format: 'A4', margin: margins })

//     // Open the generated PDF file in the default PDF viewer
//     const open = await import('open')
//     await open.default(pdfFilePath)
//     // close the browser
//     await browser.close()
// }

// async function generatePdf(pdfFileAsString:string) {
//     const data = {}
//     const template = hb.compile(pdfFileAsString, {strict:true})
//     const html = template(data)

//     const browser = await puppeteer.connect({
//         browserWSEndpoint: ''
//     })
// }




// export async function downloadPDFData(
//     creditor: Creditor & { attachments: Attachment[] }
// ) {
//     const {
//         nama,
//         NIKAtauNomorAktaPendirian,
//         jenis,
//         sifatTagihan,
//         alamat,
//         email,
//         nomorTelepon,
//         korespondensi,
//         totalTagihan,
//         namaKuasaHukum,
//         alamatKuasaHukum,
//         emailKuasaHukum,
//         nomorTeleponKuasaHukum,
//         attachments,
//     } = creditor

//     let html = `
//         <style>
//             .container {
//                 font-family: Arial, sans-serif;
//                 max-width: 600px;
//                 margin: 0 auto;
//             }
//             h2 {
//                 padding-top: 15px;
//                 margin-top: 15px;
//             }
//             table {
//                 width: 100%;
//                 border-collapse: collapse;
//                 margin-top: 20px;
//             }
//             th, td {
//                 border: 1px solid #ddd;
//                 padding: 8px;
//                 text-align: left;
//             }
//             th {
//                 background-color: #FF0000;
//             }
//             no-attachments {
//                 text-align: center;
//             }
//         </style>
//         <div class="container">
//             <h2>Data Kreditor</h2>
//             <p><strong>Nama Kreditor:</strong> ${nama}</p>
//             <p><strong>NIK atau Nomor Akta Pendirian:</strong> ${NIKAtauNomorAktaPendirian}</p>
//             <p><strong>Jenis:</strong> ${jenis}</p>
//             <p><strong>Sifat Tagihan:</strong> ${sifatTagihan}</p>
//             <p><strong>Alamat:</strong> ${alamat}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Nomor Telepon:</strong> ${nomorTelepon}</p>
//             <p><strong>Korespondensi:</strong> ${korespondensi}</p>
//             <p><strong>Total Tagihan:</strong> ${totalTagihan}</p>
//             <h2 style="margin-top: 15px;">Kuasa Hukum</h2>
//             <p><strong>Nama Kuasa Hukum:</strong> ${namaKuasaHukum}</p>
//             <p><strong>Alamat Kuasa Hukum:</strong> ${alamatKuasaHukum}</p>
//             <p><strong>Email Kuasa Hukum:</strong> ${emailKuasaHukum}</p>
//             <p><strong>Nomor Telepon Kuasa Hukum:</strong> ${nomorTeleponKuasaHukum}</p>
//             <h2 style="margin-top: 15px;">Lampiran</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Nomor</th>
//                         <th>Nama Lampiran</th>
//                         <th>Ready</th>
//                         <th>Deskripsi</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//     `

//     if (attachments.length < 1) {
//         html += `
//             <tr>
//                 <td colspan="4" style="text-align: center;">
//                 ( TIDAK ADA LAMPIRAN )
//                 </td>
//             </tr>
//         `
//     } else {
//         attachments.forEach((attachment, index) => {
//             html += `
//             <tr>
//                 <td>${index + 1}</td>
//                 <td>${attachment.nama}</td>
//                 <td>${attachment.ready ? 'Ya' : 'Tidak'}</td>
//                 <td>${attachment.deskripsi}</td>
//             </tr>
//         `
//         })
//     }

//     html += `
//                 </tbody>
//             </table>
//         </div>
//     `
//     const pdf = await generatePDFFromHTML(html, `${creditor.slug}.pdf`)

//     // create blob from the arrayBuffer
//     const blob = new Blob([pdf], {type: 'application/pdf'})

//     const file = new File([blob], `${creditor.slug}.pdf`, {
//         type: 'application/pdf'
//     })


// }
